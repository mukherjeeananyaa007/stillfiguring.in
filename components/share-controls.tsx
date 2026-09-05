'use client';

import { useState } from 'react';
import { Instagram, Link2, Linkedin, MessageCircle } from 'lucide-react';

type ShareControlsProps = {
  title: string;
  url: string;
};

function openAppFirst(appUrl: string, webUrl: string) {
  let appOpened = false;
  const handleVisibilityChange = () => {
    appOpened = document.hidden;
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.location.href = appUrl;

  window.setTimeout(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    if (!appOpened) {
      window.open(webUrl, '_blank', 'noopener,noreferrer');
    }
  }, 900);
}

export function ShareControls({ title, url }: ShareControlsProps) {
  const [status, setStatus] = useState('');
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`${title} ${url}`);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus('Link copied');
    } catch {
      setStatus('Copy failed');
    }
  }

  async function shareToInstagram() {
    await copyLink();
    openAppFirst('instagram://app', 'https://www.instagram.com/');
  }

  return (
    <div className="py-6" aria-label="Share this article">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-2 text-sm text-[rgb(var(--ink-muted))]">Share</span>
        <button
          type="button"
          onClick={() => openAppFirst(`whatsapp://send?text=${encodedText}`, `https://wa.me/?text=${encodedText}`)}
          className="share-button"
          aria-label="Share on WhatsApp"
          title="Share on WhatsApp"
        >
          <MessageCircle size={16} aria-hidden="true" />
          <span>WhatsApp</span>
        </button>
        <button
          type="button"
          onClick={() => openAppFirst(`linkedin://shareArticle?url=${encodedUrl}`, `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`)}
          className="share-button"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <Linkedin size={16} aria-hidden="true" />
          <span>LinkedIn</span>
        </button>
        <button
          type="button"
          onClick={shareToInstagram}
          className="share-button"
          aria-label="Share on Instagram"
          title="Share on Instagram"
        >
          <Instagram size={16} aria-hidden="true" />
          <span>Instagram</span>
        </button>
        <button type="button" onClick={copyLink} className="share-button" aria-label="Copy article link" title="Copy article link">
          <Link2 size={16} aria-hidden="true" />
          <span>Copy link</span>
        </button>
        <span className="sr-only" aria-live="polite">{status}</span>
      </div>
    </div>
  );
}