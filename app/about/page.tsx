export const metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <main className="page-shell py-16 sm:py-24">
      <div className="reading-width">
        <p className="eyebrow">A small manifesto</p>
        <h1 className="mt-4 text-5xl leading-none sm:text-6xl">There is no finished version of you.</h1>
        <div className="article-body prose prose-lg mt-12">
          <p>Still Figuring is an editorial space for the honest middle: the years after the easy answers and before the answers you can live with.</p>
          <p>We publish thoughtful essays, personal stories, and clear-eyed opinions about becoming an adult without turning into a brand.</p>
          <p>This is placeholder copy for now. The fuller story of Still Figuring is still being written, too.</p>
        </div>
      </div>
    </main>
  );
}
