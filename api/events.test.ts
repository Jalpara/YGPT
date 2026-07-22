import { beforeEach, describe, expect, it, vi } from 'vitest';

const { createClient } = vi.hoisted(() => ({ createClient: vi.fn() }));

vi.mock('@supabase/supabase-js', () => ({ createClient }));

import handler from './events';

function response() {
  const res = {
    setHeader: vi.fn(),
    status: vi.fn(),
    json: vi.fn(),
  };
  res.status.mockReturnValue(res);
  return res;
}

describe('GET /api/events', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role-key';
  });

  it('rejects non-GET requests and advertises GET', async () => {
    const res = response();

    await handler({ method: 'POST', query: {} } as never, res as never);

    expect(res.setHeader).toHaveBeenCalledWith('Allow', 'GET');
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: 'Method not allowed' });
    expect(createClient).not.toHaveBeenCalled();
  });

  it('returns a configuration error without server credentials', async () => {
    const res = response();
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;

    await handler({ method: 'GET', query: {} } as never, res as never);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Server misconfigured' });
  });

  it('fetches events spanning the requested month with overlap bounds', async () => {
    const spanningEvent = {
      id: 'spanning',
      title: 'Summer program',
      description: null,
      goal: null,
      event_date: '2026-06-01',
      event_end_date: '2026-08-01',
      start_time: null,
      end_time: null,
      location: null,
      venue_gmaps_link: null,
      region: null,
      event_pillar: null,
      status: 'funded',
    };
    const monthQuery = {
      select: vi.fn(),
      in: vi.fn(),
      lte: vi.fn(),
      or: vi.fn(),
      order: vi.fn(),
    };
    monthQuery.select.mockReturnValue(monthQuery);
    monthQuery.in.mockReturnValue(monthQuery);
    monthQuery.lte.mockReturnValue(monthQuery);
    monthQuery.or.mockReturnValue(monthQuery);
    monthQuery.order.mockResolvedValue({ data: [spanningEvent], error: null });

    const upcomingQuery = {
      select: vi.fn(),
      in: vi.fn(),
      gte: vi.fn(),
      order: vi.fn(),
      limit: vi.fn(),
    };
    upcomingQuery.select.mockReturnValue(upcomingQuery);
    upcomingQuery.in.mockReturnValue(upcomingQuery);
    upcomingQuery.gte.mockReturnValue(upcomingQuery);
    upcomingQuery.order.mockReturnValue(upcomingQuery);
    upcomingQuery.limit.mockResolvedValue({ data: [], error: null });

    const from = vi.fn().mockReturnValueOnce(monthQuery).mockReturnValueOnce(upcomingQuery);
    createClient.mockReturnValue({ from } as never);
    const res = response();

    await handler({ method: 'GET', query: { month: '2026-07' } } as never, res as never);

    expect(monthQuery.lte).toHaveBeenCalledWith('event_date', '2026-07-31');
    expect(monthQuery.or).toHaveBeenCalledWith(
      'event_end_date.gte.2026-07-01,and(event_end_date.is.null,event_date.gte.2026-07-01)'
    );
    expect(upcomingQuery.gte).toHaveBeenCalledWith('event_date', expect.any(String));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        month: '2026-07',
        monthEvents: [expect.objectContaining({ id: 'spanning' })],
      })
    );
  });
});
