import { afterEach, describe, expect, it, vi } from 'vitest';
import { submitContactForm } from './contactService';

describe('submitContactForm', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('posts the supplied payload to the contact endpoint', async () => {
    const payload = {
      type: 'contact' as const,
      name: 'Jane Doe',
      email: 'jane@example.com',
      subject: 'Hello',
      message: 'I would like to help.',
    };
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );
    vi.stubGlobal('fetch', fetchMock);

    await expect(submitContactForm(payload)).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  });

  it('throws the API error message for an unsuccessful response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ error: 'Server misconfigured' }), { status: 500 })
      )
    );

    await expect(
      submitContactForm({
        type: 'contact',
        name: 'Jane Doe',
        email: 'jane@example.com',
        subject: 'Hello',
        message: 'I would like to help.',
      })
    ).rejects.toThrow('Server misconfigured');
  });
});
