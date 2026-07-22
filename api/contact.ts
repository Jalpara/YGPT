import type { VercelRequest, VercelResponse } from '@vercel/node';
import { submitContactToSheet, validateContactPayload } from '../lib/contact-submit';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const parsed = validateContactPayload(req.body);
  if (!parsed.ok) {
    return res.status(400).json({ error: parsed.error });
  }

  const result = await submitContactToSheet(parsed.data);
  if (!result.ok) {
    return res.status(result.status).json({ error: result.error });
  }

  return res.status(200).json({ ok: true });
}
