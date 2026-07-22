import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchEventsForMonth, toMonthKey } from './eventsService';

describe('toMonthKey', () => {
  it('formats a local calendar month with a zero-padded month', () => {
    expect(toMonthKey(new Date(2026, 0, 15))).toBe('2026-01');
  });
});

describe('fetchEventsForMonth', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('requests the encoded month and returns the response body', async () => {
        const response = {
            month: '2026-01',
            monthEvents: [],
            upcomingEvents: [],
        };
        const fetchMock = vi.fn().mockResolvedValue(
            new Response(JSON.stringify(response), { status: 200 })
        );
        vi.stubGlobal('fetch', fetchMock);

        await expect(fetchEventsForMonth('2026-01')).resolves.toEqual(response);
        expect(fetchMock).toHaveBeenCalledWith('/api/events?month=2026-01');
    });
});
