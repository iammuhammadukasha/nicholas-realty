import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../lib/supabase-server';

const VALID_ESTATE_TYPES = [
  'Probate Sale',
  'Trust Administration',
  'Conservatorship',
  'General Listing',
];

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
