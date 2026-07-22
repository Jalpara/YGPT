import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { validateContactPayload, submitContactToSheet } from './contact-submit';

describe('validateContactPayload', () => {
  it('rejects invalid type', () => {
    expect(validateContactPayload({ type: 'other' }).ok).toBe(false);
  });

  it('accepts volunteer with required fields', () => {
    const result = validateContactPayload({
      type: 'volunteer',
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      interests: ['Teaching'],
      whyJoin: 'Impact',
    });
    expect(result.ok).toBe(true);
  });

  it('rejects volunteer missing email', () => {
    const result = validateContactPayload({
      type: 'volunteer',
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: '',
      interests: [],
      whyJoin: 'x',
    });
    expect(result.ok).toBe(false);
  });

  it('accepts partner required fields', () => {
    const result = validateContactPayload({
      type: 'partner',
      organization: 'Acme',
      contactPerson: 'Bob',
      role: 'CSR',
      partnershipType: 'Corporate CSR',
      proposal: 'Plant trees',
    });
    expect(result.ok).toBe(true);
  });

  it('accepts contact required fields', () => {
    const result = validateContactPayload({
      type: 'contact',
      name: 'Casey',
      email: 'c@example.com',
      subject: 'Hello',
      message: 'Hi there',
    });
    expect(result.ok).toBe(true);
  });
});

describe('submitContactToSheet', () => {
  const payload = {
    type: 'contact' as const,
    name: 'Casey',
    email: 'c@example.com',
    subject: 'Hello',
    message: 'Hi',
  };

  beforeEach(() => {
    process.env.GOOGLE_SHEETS_WEBAPP_URL = 'https://script.google.com/macros/s/test/exec';
    process.env.GOOGLE_SHEETS_SECRET = 'test-secret';
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns misconfigured without env', async () => {
    delete process.env.GOOGLE_SHEETS_SECRET;
    const result = await submitContactToSheet(payload);
    expect(result).toEqual({ ok: false, status: 500, error: 'Server misconfigured' });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('forwards secret + payload to Apps Script', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );
    const result = await submitContactToSheet(payload);
    expect(result).toEqual({ ok: true, status: 200 });
    expect(fetch).toHaveBeenCalledWith(
      'https://script.google.com/macros/s/test/exec',
      expect.objectContaining({
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: 'test-secret', ...payload }),
      })
    );
  });

  it('returns 502 when Apps Script reports failure', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), { status: 200 })
    );
    const result = await submitContactToSheet(payload);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.status).toBe(502);
      expect(result.error).toBe('Failed to save submission');
    }
  });
});
