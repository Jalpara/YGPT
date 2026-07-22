import type { Event } from '../types';

export type PublicEventRow = {
  id: string;
  title: string;
  description: string | null;
  goal: string | null;
  event_date: string;
  event_end_date: string | null;
  start_time: string | null;
  end_time: string | null;
  location: string | null;
  venue_gmaps_link: string | null;
  region: string | null;
  event_pillar: string | null;
  status: string;
};

const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/;

export function parseMonthParam(month: string | null | undefined, now: Date = new Date()): string {
  if (month && MONTH_RE.test(month)) return month;
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

export function monthBounds(month: string): { start: string; end: string } {
  const [ys, ms] = month.split('-');
  const y = Number(ys);
  const m = Number(ms);
  const start = `${month}-01`;
  const lastDay = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const end = `${month}-${String(lastDay).padStart(2, '0')}`;
  return { start, end };
}

export function todayUtcDateString(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

function trimTime(t: string): string {
  return t.slice(0, 5);
}

export function formatEventTime(start: string | null, end: string | null): string {
  if (start && end) return `${trimTime(start)} – ${trimTime(end)}`;
  if (start) return trimTime(start);
  return '';
}

export function inferEventType(
  location: string | null,
  _venueGmapsLink: string | null
): 'Online' | 'Offline' {
  const hay = (location ?? '').toLowerCase();
  if (/(zoom|google meet|meet\.google|teams|online|youtube|webinar|virtual)/.test(hay)) {
    return 'Online';
  }
  return 'Offline';
}

export function mapRowToEvent(row: PublicEventRow): Event {
  return {
    id: row.id,
    title: row.title,
    date: row.event_date,
    time: formatEventTime(row.start_time, row.end_time),
    location: row.location ?? '',
    type: inferEventType(row.location, row.venue_gmaps_link),
    description: row.description ?? row.goal ?? '',
  };
}

export function eventOverlapsMonth(row: PublicEventRow, month: string): boolean {
  const { start, end } = monthBounds(month);
  const eventStart = row.event_date;
  const eventEnd = row.event_end_date ?? row.event_date;
  return eventStart <= end && eventEnd >= start;
}

export function buildEventsResponse(
  rows: PublicEventRow[],
  month: string,
  now: Date = new Date()
): { month: string; monthEvents: Event[]; upcomingEvents: Event[] } {
  const today = todayUtcDateString(now);
  const monthEvents = rows.filter((r) => eventOverlapsMonth(r, month)).map(mapRowToEvent);
  const upcomingEvents = rows
    .filter((r) => r.event_date >= today)
    .sort((a, b) => a.event_date.localeCompare(b.event_date))
    .slice(0, 20)
    .map(mapRowToEvent);
  return { month, monthEvents, upcomingEvents };
}
