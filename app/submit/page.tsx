import type { Metadata } from 'next';
import { NewsletterForm } from '@/components/newsletter-form';

export const metadata: Metadata = {
  title: 'Submit',
  description: 'Share your essay with Still Figuring, a publication for thoughtful writing about lives still in progress.',
  alternates: { canonical: '/submit' },
};

export default function SubmitPage() {
  return (
    <main className="page-shell py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="eyebrow">Add your voice</p>
        <h1 className="mt-4 text-5xl leading-none sm:text-6xl">What are you still figuring out?</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-[rgb(var(--ink-muted))]">If this resonated with you, subscribe to our newsletter for thoughtful writing on lives still in progress. We&apos;ll be accepting submissions soon, and subscribers will be the first to know.</p>
      </div>
      <NewsletterForm />
    </main>
  );
}
