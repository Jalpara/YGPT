import { describe, expect, it } from 'vitest';
import {
  parseMonthParam,
  monthBounds,
  formatEventTime,
  inferEventType,
  mapRowToEvent,
  eventOverlapsMonth,
  buildEventsResponse,
  type PublicEventRow,
} from './public-events';

const baseRow = (overrides: Partial<PublicEventRow> = {}): PublicEventRow => ({
  id: '11111111-1111-1111-1111-111111111111',
  title: 'Peace Walk',
  description: 'A walk for peace',
  goal: null,
  event_date: '2026-07-15',
  event_end_date: null,
  start_time: '10:00:00',
  end_time: '12:00:00',
  location: 'Mumbai',
  venue_gmaps_link: 'https://maps.google.com/?q=mumbai',
  region: 'West',
  event_pillar: null,
  status: 'funded',
  ...overrides,
});

describe('parseMonthParam', () => {
  it('returns valid YYYY-MM', () => {
    expect(parseMonthParam('2026-07')).toBe('2026-07');
  });
  it('defaults invalid to current UTC month', () => {
    expect(parseMonthParam('nope', new Date('2026-03-05T12:00:00Z'))).toBe('2026-03');
  });
  it('defaults missing to current UTC month', () => {
    expect(parseMonthParam(undefined, new Date('2026-03-05T12:00:00Z'))).toBe('2026-03');
  });
});

describe('monthBounds', () => {
  it('returns inclusive start and end', () => {
    expect(monthBounds('2026-07')).toEqual({ start: '2026-07-01', end: '2026-07-31' });
    expect(monthBounds('2026-02')).toEqual({ start: '2026-02-01', end: '2026-02-28' });
  });
});

describe('formatEventTime', () => {
  it('formats start-end', () => {
    expect(formatEventTime('10:00:00', '12:00:00')).toBe('10:00 – 12:00');
  });
  it('formats start only', () => {
    expect(formatEventTime('10:00:00', null)).toBe('10:00');
  });
  it('returns empty when no times', () => {
    expect(formatEventTime(null, null)).toBe('');
  });
});

describe('inferEventType', () => {
  it('detects online keywords', () => {
    expect(inferEventType('Zoom meeting', null)).toBe('Online');
    expect(inferEventType('Google Meet', null)).toBe('Online');
    expect(inferEventType('Online webinar', null)).toBe('Online');
  });
  it('defaults to Offline', () => {
    expect(inferEventType('Community Hall', 'https://maps.google.com')).toBe('Offline');
  });
});

describe('mapRowToEvent', () => {
  it('maps fields and falls back description to goal', () => {
    const event = mapRowToEvent(baseRow({ description: null, goal: 'Build unity' }));
    expect(event).toMatchObject({
      id: '11111111-1111-1111-1111-111111111111',
      title: 'Peace Walk',
      date: '2026-07-15',
      time: '10:00 – 12:00',
      location: 'Mumbai',
      type: 'Offline',
      description: 'Build unity',
    });
  });
});

describe('eventOverlapsMonth', () => {
  it('includes event_date inside month', () => {
    expect(eventOverlapsMonth(baseRow({ event_date: '2026-07-15' }), '2026-07')).toBe(true);
  });
  it('includes multi-day range overlapping month', () => {
    expect(
      eventOverlapsMonth(
        baseRow({ event_date: '2026-06-28', event_end_date: '2026-07-02' }),
        '2026-07'
      )
    ).toBe(true);
  });
  it('excludes outside month', () => {
    expect(eventOverlapsMonth(baseRow({ event_date: '2026-08-01' }), '2026-07')).toBe(false);
  });
});

describe('buildEventsResponse', () => {
  it('splits month and upcoming with limit 20', () => {
    const now = new Date('2026-07-10T00:00:00Z');
    const rows = [
      baseRow({ id: '1', event_date: '2026-07-05', title: 'Past in month' }),
      baseRow({ id: '2', event_date: '2026-07-20', title: 'Upcoming in month' }),
      baseRow({ id: '3', event_date: '2026-08-01', title: 'Next month' }),
      baseRow({ id: '4', event_date: '2026-06-01', title: 'Old' }),
    ];
    const result = buildEventsResponse(rows, '2026-07', now);
    expect(result.month).toBe('2026-07');
    expect(result.monthEvents.map((e) => e.id).sort()).toEqual(['1', '2']);
    expect(result.upcomingEvents.map((e) => e.id)).toEqual(['2', '3']);
  });
});
