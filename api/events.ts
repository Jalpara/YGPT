import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import {
  buildEventsResponse,
  monthBounds,
  parseMonthParam,
  todayUtcDateString,
  type PublicEventRow,
} from '../lib/public-events';

const PUBLIC_STATUSES = ['funded', 'completed', 'report_submitted'] as const;

const SELECT =
  'id, title, description, goal, event_date, event_end_date, start_time, end_time, location, venue_gmaps_link, region, event_pillar, status';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  const month = parseMonthParam(
    typeof req.query.month === 'string' ? req.query.month : undefined
  );
  const { start, end } = monthBounds(month);
  const today = todayUtcDateString();

  const { data: monthData, error: monthError } = await supabase
    .from('events')
    .select(SELECT)
    .in('status', [...PUBLIC_STATUSES])
    .lte('event_date', end)
    .or(
      `event_end_date.gte.${start},and(event_end_date.is.null,event_date.gte.${start})`
    )
    .order('event_date', { ascending: true });

  const { data: upcomingData, error: upcomingError } = await supabase
    .from('events')
    .select(SELECT)
    .in('status', [...PUBLIC_STATUSES])
    .gte('event_date', today)
    .order('event_date', { ascending: true })
    .limit(50);

  if (monthError || upcomingError) {
    console.error('events query failed', monthError || upcomingError);
    return res.status(500).json({ error: 'Failed to fetch events' });
  }

  const rows = [...(monthData ?? []), ...(upcomingData ?? [])] as PublicEventRow[];
  const uniqueRows = [...new Map(rows.map((row) => [row.id, row])).values()];
  return res.status(200).json(buildEventsResponse(uniqueRows, month));
}
