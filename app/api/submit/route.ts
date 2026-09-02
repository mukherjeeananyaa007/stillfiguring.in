import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, title, article, bio } = body;

  if (![name, email, title, article, bio].every((value) => typeof value === 'string' && value.trim())) {
    return NextResponse.json({ error: 'Please complete every field.' }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.SUBMISSIONS_TO_EMAIL) {
    return NextResponse.json({ error: 'Email delivery is not configured yet.' }, { status: 503 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'Still Figuring <onboarding@resend.dev>',
    to: [process.env.SUBMISSIONS_TO_EMAIL],
    replyTo: email,
    subject: `New Still Figuring submission: ${title}`,
    text: [`From: ${name} <${email}>`, `Title: ${title}`, '', article, '', 'Short bio:', bio].join('\n'),
  });

  if (result.error) {
    return NextResponse.json({ error: 'The submission could not be sent. Please try again.' }, { status: 502 });
  }

  return NextResponse.json({ message: 'Thanks. Your submission is on its way.' });
}
