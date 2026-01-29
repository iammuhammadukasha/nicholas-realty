import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSupabaseAdmin } from '../../../lib/supabase-server';

const VALID_ESTATE_TYPES = [
  'Probate Sale',
  'Trust Administration',
  'Conservatorship',
  'General Listing',
];

function sendNotificationEmail(params: {
  name: string;
  email: string;
  estateType: string;
  submittedAt: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFY_EMAIL;
  if (!apiKey || !to) return Promise.resolve();

  const from = process.env.RESEND_FROM || 'Nicholas Realty <onboarding@resend.dev>';
  const resend = new Resend(apiKey);

  return resend.emails.send({
    from,
    to: [to],
    subject: `New contact: ${params.name} – ${params.estateType}`,
    html: `
      <p><strong>New contact form submission</strong></p>
      <ul>
        <li><strong>Name:</strong> ${params.name}</li>
        <li><strong>Email:</strong> ${params.email}</li>
        <li><strong>Estate type:</strong> ${params.estateType}</li>
        <li><strong>Submitted:</strong> ${params.submittedAt}</li>
      </ul>
      <p>Reply to: <a href="mailto:${params.email}">${params.email}</a></p>
    `,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, estateType } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Full name is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    if (
      !estateType ||
      typeof estateType !== 'string' ||
      !VALID_ESTATE_TYPES.includes(estateType)
    ) {
      return NextResponse.json(
        { error: 'Valid estate type is required' },
        { status: 400 }
      );
    }

    const submission = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      estate_type: estateType.trim(),
      submitted_at: new Date().toISOString(),
    };

    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from('contact_submissions')
      .insert(submission);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        {
          error: error.message || 'Failed to save submission. Please try again.',
        },
        { status: 500 }
      );
    }

    // Optional: send notification to your Gmail/email (set RESEND_API_KEY + CONTACT_NOTIFY_EMAIL)
    try {
      await sendNotificationEmail({
        name: submission.name,
        email: submission.email,
        estateType: submission.estate_type,
        submittedAt: submission.submitted_at,
      });
    } catch (emailErr) {
      console.error('Notification email error:', emailErr);
      // Don't fail the request; submission is already saved
    }

    return NextResponse.json(
      { success: true, message: 'Thank you! We will contact you soon.' },
      { status: 200 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
