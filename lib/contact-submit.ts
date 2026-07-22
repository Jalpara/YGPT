export type ContactFormType = 'volunteer' | 'partner' | 'contact';

export type VolunteerPayload = {
  type: 'volunteer';
  firstName: string;
  lastName: string;
  email: string;
  interests: string[];
  whyJoin: string;
};

export type PartnerPayload = {
  type: 'partner';
  organization: string;
  contactPerson: string;
  role: string;
  partnershipType: string;
  proposal: string;
};

export type GeneralContactPayload = {
  type: 'contact';
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactPayload = VolunteerPayload | PartnerPayload | GeneralContactPayload;

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

export function validateContactPayload(
  input: unknown
): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  if (!input || typeof input !== 'object') {
    return { ok: false, error: 'Invalid payload' };
  }
  const body = input as Record<string, unknown>;
  const type = body.type;

  if (type === 'volunteer') {
    if (!isNonEmptyString(body.firstName) || !isNonEmptyString(body.lastName) || !isNonEmptyString(body.email)) {
      return { ok: false, error: 'First name, last name, and email are required' };
    }
    const interests = Array.isArray(body.interests)
      ? body.interests.filter((i): i is string => typeof i === 'string')
      : [];
    return {
      ok: true,
      data: {
        type: 'volunteer',
        firstName: body.firstName.trim(),
        lastName: body.lastName.trim(),
        email: body.email.trim(),
        interests,
        whyJoin: typeof body.whyJoin === 'string' ? body.whyJoin.trim() : '',
      },
    };
  }

  if (type === 'partner') {
    if (
      !isNonEmptyString(body.organization) ||
      !isNonEmptyString(body.contactPerson) ||
      !isNonEmptyString(body.partnershipType) ||
      !isNonEmptyString(body.proposal)
    ) {
      return { ok: false, error: 'Organization, contact person, partnership type, and proposal are required' };
    }
    return {
      ok: true,
      data: {
        type: 'partner',
        organization: body.organization.trim(),
        contactPerson: body.contactPerson.trim(),
        role: typeof body.role === 'string' ? body.role.trim() : '',
        partnershipType: body.partnershipType.trim(),
        proposal: body.proposal.trim(),
      },
    };
  }

  if (type === 'contact') {
    if (
      !isNonEmptyString(body.name) ||
      !isNonEmptyString(body.email) ||
      !isNonEmptyString(body.subject) ||
      !isNonEmptyString(body.message)
    ) {
      return { ok: false, error: 'Name, email, subject, and message are required' };
    }
    return {
      ok: true,
      data: {
        type: 'contact',
        name: body.name.trim(),
        email: body.email.trim(),
        subject: body.subject.trim(),
        message: body.message.trim(),
      },
    };
  }

  return { ok: false, error: 'Invalid form type' };
}

export async function submitContactToSheet(
  payload: ContactPayload
): Promise<{ ok: true; status: 200 } | { ok: false; status: 500 | 502; error: string }> {
  const url = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  const secret = process.env.GOOGLE_SHEETS_SECRET;
  if (!url || !secret) {
    return { ok: false, status: 500, error: 'Server misconfigured' };
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, ...payload }),
    });

    if (!res.ok) {
      return { ok: false, status: 502, error: 'Failed to save submission' };
    }

    const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (!data || data.ok !== true) {
      return { ok: false, status: 502, error: 'Failed to save submission' };
    }

    return { ok: true, status: 200 };
  } catch {
    return { ok: false, status: 502, error: 'Failed to save submission' };
  }
}
