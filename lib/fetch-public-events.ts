import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import {
  buildEventsResponse,
  monthBounds,
  parseMonthParam,
  todayUtcDateString,
  type PublicEventRow,
} from './public-events';
import type { Event } from '../types';

const PUBLIC_STATUSES = ['funded', 'completed', 'report_submitted'] as const;

const SELECT =
  'id, title, description, goal, event_date, event_end_date, start_time, end_time, location, venue_gmaps_link, region, event_pillar, status';

export type EventsApiBody = {
  month: string;
  monthEvents: Event[];
  upcomingEvents: Event[];
};

export type FetchPublicEventsResult =
  | { ok: true; status: 200; body: EventsApiBody }
  | { ok: false; status: 500; body: { error: string } };

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    // Node < 22 has no global WebSocket; REST queries still need a constructor.
    realtime: { transport: ws as unknown as typeof WebSocket },
  });
}

export async function fetchPublicEvents(
  monthParam?: string | null
): Promise<FetchPublicEventsResult> {
  const supabase = getSupabase();
  if (!supabase) {
    return { ok: false, status: 500, body: { error: 'Server misconfigured' } };
  }

  const month = parseMonthParam(monthParam ?? undefined);
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
    // Over-fetch; buildEventsResponse slices to 20 upcoming.
    .limit(50);

  if (monthError || upcomingError) {
    console.error('events query failed', monthError || upcomingError);
    return { ok: false, status: 500, body: { error: 'Failed to fetch events' } };
  }

  const rows = [...(monthData ?? []), ...(upcomingData ?? [])] as PublicEventRow[];
  const uniqueRows = [...new Map(rows.map((row) => [row.id, row])).values()];
  return {
    ok: true,
    status: 200,
    body: buildEventsResponse(uniqueRows, month),
  };
}
