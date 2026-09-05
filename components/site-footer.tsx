export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[rgb(var(--line))] py-8 text-sm text-[rgb(var(--ink-muted))]">
      <div className="page-shell flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>Still Figuring is a home for lives in progress.</p>
        <a href="/" className="hover:text-[rgb(var(--ink))]">stillfiguring.in</a>
      </div>
    </footer>
  );
}
