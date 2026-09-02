'use client';

import { FormEvent, useState } from 'react';

export default function SubmitPage() {
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);
    setFeedback('');

    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(form.entries())),
    });
    const result = await response.json();
    setFeedback(result.message ?? result.error);
    setIsSending(false);

    if (response.ok) event.currentTarget.reset();
  }

  return (
    <main className="page-shell py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="eyebrow">Add your voice</p>
        <h1 className="mt-4 text-5xl leading-none sm:text-6xl">What are you still figuring out?</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-[rgb(var(--ink-muted))]">We&apos;re looking for thoughtful, specific writing about the questions that do not resolve neatly. Send us an essay, a strong idea, or a link to work you&apos;ve already published.</p>
      </div>
      <form className="mt-14 max-w-2xl space-y-8" onSubmit={handleSubmit}>
        <div className="grid gap-8 sm:grid-cols-2">
          <label className="block text-sm font-medium">Name<input required name="name" type="text" className="mt-2 block w-full border border-[rgb(var(--line))] bg-[rgb(var(--paper-raised))] px-3 py-3 outline-none focus:border-accent" /></label>
          <label className="block text-sm font-medium">Email<input required name="email" type="email" className="mt-2 block w-full border border-[rgb(var(--line))] bg-[rgb(var(--paper-raised))] px-3 py-3 outline-none focus:border-accent" /></label>
        </div>
        <label className="block text-sm font-medium">Article title<input required name="title" type="text" className="mt-2 block w-full border border-[rgb(var(--line))] bg-[rgb(var(--paper-raised))] px-3 py-3 outline-none focus:border-accent" /></label>
        <label className="block text-sm font-medium">Article body or link<textarea required name="article" rows={8} className="mt-2 block w-full resize-y border border-[rgb(var(--line))] bg-[rgb(var(--paper-raised))] px-3 py-3 outline-none focus:border-accent" /></label>
        <label className="block text-sm font-medium">Short bio<textarea required name="bio" rows={4} className="mt-2 block w-full resize-y border border-[rgb(var(--line))] bg-[rgb(var(--paper-raised))] px-3 py-3 outline-none focus:border-accent" /></label>
        <button disabled={isSending} type="submit" className="bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[rgb(151,70,42)] disabled:cursor-wait disabled:opacity-60">{isSending ? 'Sending...' : 'Send submission'}</button>
        {feedback && <p role="status" className="text-sm text-[rgb(var(--ink-muted))]">{feedback}</p>}
      </form>
    </main>
  );
}
