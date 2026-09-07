'use client';

import { FormEvent, useState } from 'react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export function NewsletterForm() {
  const [status, setStatus] = useState<FormStatus>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');

    try {
      const form = event.currentTarget;
      const response = await fetch('https://formspree.io/f/myeydera', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });

      if (!response.ok) {
        throw new Error('Newsletter subscription failed');
      }

      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="mt-16 border-t border-[rgb(var(--line))] pt-10" aria-labelledby="newsletter-heading">
      <p className="eyebrow">Stay in the loop</p>
      <h2 id="newsletter-heading" className="mt-3 text-3xl sm:text-4xl">A note when there&apos;s something worth sharing.</h2>
      <p className="mt-4 max-w-xl text-[rgb(var(--ink-muted))]">Occasional essays and reflections for the parts of life that are still taking shape.</p>
      <form className="mt-8 max-w-2xl space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Name
            <input required name="name" type="text" autoComplete="name" className="mt-2 block w-full border border-[rgb(var(--line))] bg-[rgb(var(--paper-raised))] px-3 py-3 outline-none focus:border-accent" />
          </label>
          <label className="block text-sm font-medium">
            Email
            <input required name="email" type="email" autoComplete="email" className="mt-2 block w-full border border-[rgb(var(--line))] bg-[rgb(var(--paper-raised))] px-3 py-3 outline-none focus:border-accent" />
          </label>
        </div>
        <button disabled={status === 'sending'} type="submit" className="bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[rgb(151,70,42)] disabled:cursor-wait disabled:opacity-60">
          {status === 'sending' ? 'Subscribing...' : 'Subscribe'}
        </button>
        {status === 'success' && <p role="status" className="text-sm text-[rgb(var(--ink-muted))]">Thanks &mdash; you&apos;re on the list.</p>}
        {status === 'error' && <p role="alert" className="text-sm text-[rgb(var(--accent))]">Something went wrong. Please try again.</p>}
      </form>
    </section>
  );
}