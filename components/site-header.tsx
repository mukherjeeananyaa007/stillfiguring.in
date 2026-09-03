'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function SiteHeader() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="border-b border-[rgb(var(--line))]">
      <div className="page-shell flex h-20 items-center justify-between gap-6">
        <Link href="/" aria-label="Still Figuring home" className="flex items-center gap-3 font-serif text-2xl font-medium tracking-tight">
          <span className="grid size-14 shrink-0 place-items-center overflow-hidden bg-[rgb(var(--paper))]">
            <Image src="/images/editorial-minimal-symbol-mark.png" alt="" width={56} height={56} priority className="size-14 object-contain dark:hidden" />
            <Image src="/images/editorial-minimal-symbol-mark-dark.png" alt="" width={56} height={56} priority className="hidden size-14 object-contain dark:block" />
          </span>
          <span>Still Figuring<span className="text-accent">.</span></span>
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-5 text-sm text-[rgb(var(--ink-muted))] sm:gap-8">
          <Link className="transition-colors hover:text-[rgb(var(--ink))]" href="/articles">Articles</Link>
          <Link className="hidden transition-colors hover:text-[rgb(var(--ink))] sm:block" href="/about">About</Link>
          <Link className="hidden transition-colors hover:text-[rgb(var(--ink))] sm:block" href="/submit">Submit</Link>
          <button
            type="button"
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
            className="grid size-9 place-items-center border border-[rgb(var(--line))] text-[rgb(var(--ink))] transition-colors hover:border-accent hover:text-accent"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          >
            {mounted && resolvedTheme === 'dark' ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
          </button>
        </nav>
      </div>
    </header>
  );
}
