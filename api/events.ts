import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchPublicEvents } from '../lib/fetch-public-events';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const result = await fetchPublicEvents(
    typeof req.query.month === 'string' ? req.query.month : undefined
  );
  return res.status(result.status).json(result.body);
}
