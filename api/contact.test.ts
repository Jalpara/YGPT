import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../lib/contact-submit', () => ({
  validateContactPayload: vi.fn(),
  submitContactToSheet: vi.fn(),
}));

import handler from './contact';
import { submitContactToSheet, validateContactPayload } from '../lib/contact-submit';

function response() {
  const res = {
    setHeader: vi.fn(),
    status: vi.fn(),
    json: vi.fn(),
  };
  res.status.mockReturnValue(res);
  return res;
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('rejects non-POST requests and advertises POST', async () => {
    const res = response();

    await handler({ method: 'GET', body: {} } as never, res as never);

    expect(res.setHeader).toHaveBeenCalledWith('Allow', 'POST');
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: 'Method not allowed' });
    expect(validateContactPayload).not.toHaveBeenCalled();
  });

  it('returns 400 on an invalid payload', async () => {
    vi.mocked(validateContactPayload).mockReturnValue({ ok: false, error: 'Invalid form type' });
    const res = response();

    await handler({ method: 'POST', body: { type: 'nope' } } as never, res as never);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid form type' });
    expect(submitContactToSheet).not.toHaveBeenCalled();
  });

  it('submits a valid payload and returns success', async () => {
    const data = {
      type: 'contact' as const,
      name: 'A',
      email: 'a@b.com',
      subject: 'S',
      message: 'M',
    };
    vi.mocked(validateContactPayload).mockReturnValue({ ok: true, data });
    vi.mocked(submitContactToSheet).mockResolvedValue({ ok: true, status: 200 });
    const res = response();

    await handler({ method: 'POST', body: data } as never, res as never);

    expect(submitContactToSheet).toHaveBeenCalledWith(data);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });

  it('forwards a sheet submission failure', async () => {
    const data = {
      type: 'contact' as const,
      name: 'A',
      email: 'a@b.com',
      subject: 'S',
      message: 'M',
    };
    vi.mocked(validateContactPayload).mockReturnValue({ ok: true, data });
    vi.mocked(submitContactToSheet).mockResolvedValue({
      ok: false,
      status: 502,
      error: 'Failed to save submission',
    });
    const res = response();

    await handler({ method: 'POST', body: data } as never, res as never);

    expect(res.status).toHaveBeenCalledWith(502);
    expect(res.json).toHaveBeenCalledWith({ error: 'Failed to save submission' });
  });
});
