import type { Event } from '../types';

export type EventsApiResponse = {
    month: string;
    monthEvents: Event[];
    upcomingEvents: Event[];
};

export async function fetchEventsForMonth(month: string): Promise<EventsApiResponse> {
    const res = await fetch(`/api/events?month=${encodeURIComponent(month)}`);
    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
            typeof body.error === 'string'
                ? body.error
                : `Failed to load events (${res.status})`
        );
    }
    return res.json() as Promise<EventsApiResponse>;
}

export function toMonthKey(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    return `${y}-${m}`;
}
