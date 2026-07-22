import type { ContactPayload } from '../lib/contact-submit';

export async function submitContactForm(payload: ContactPayload): Promise<void> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(typeof body.error === 'string' ? body.error : 'Failed to submit');
  }
}
