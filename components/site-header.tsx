'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function SiteHeader() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="border-b border-[rgb(var(--line))]">
      <div className="page-shell flex h-20 items-center justify-between gap-6">
        <Link href="/" aria-label="Still Figuring home" className="flex items-center gap-3 font-serif text-2xl font-medium tracking-tight">
          <span className="grid size-14 shrink-0 place-items-center overflow-hidden bg-[rgb(var(--paper))]">
            <Image
              src={resolvedTheme === 'dark' ? '/images/editorial-minimal-symbol-mark-dark.png' : '/images/editorial-minimal-symbol-mark.png'}
              alt=""
              width={56}
              height={56}
              priority
              className="size-14 object-contain"
            />
          </span>
          <span>Still Figuring<span className="text-accent">.</span></span>
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-3 text-sm text-[rgb(var(--ink-muted))] sm:gap-8">
          <div id="mobile-navigation" className={`${menuOpen ? 'absolute inset-x-4 top-24 z-10 flex' : 'hidden'} flex-col gap-1 border border-[rgb(var(--line))] bg-[rgb(var(--paper))] p-3 shadow-lg sm:static sm:flex sm:flex-row sm:items-center sm:gap-8 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none`}>
            <Link className="px-3 py-2 transition-colors hover:text-[rgb(var(--ink))] sm:px-0 sm:py-0" href="/articles" onClick={() => setMenuOpen(false)}>Articles</Link>
            <Link className="px-3 py-2 transition-colors hover:text-[rgb(var(--ink))] sm:px-0 sm:py-0" href="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link className="px-3 py-2 transition-colors hover:text-[rgb(var(--ink))] sm:px-0 sm:py-0" href="/submit" onClick={() => setMenuOpen(false)}>Submit</Link>
          </div>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            title={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="grid size-9 place-items-center border border-[rgb(var(--line))] text-[rgb(var(--ink))] transition-colors hover:border-accent hover:text-accent sm:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={17} strokeWidth={1.75} /> : <Menu size={17} strokeWidth={1.75} />}
          </button>
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
