import type { Metadata } from 'next';
import { Inter, Source_Serif_4 } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.stillfiguring.in'),
  title: {
    default: 'Still Figuring',
    template: '%s | Still Figuring',
  },
  description: 'Thoughtful writing for lives still in progress.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'Still Figuring',
    description: 'Thoughtful writing for lives still in progress.',
    url: 'https://www.stillfiguring.in',
    siteName: 'Still Figuring',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 1200,
        alt: 'Still Figuring logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Still Figuring',
    description: 'Thoughtful writing for lives still in progress.',
    images: ['/icon.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-RRYDP8R03H" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-RRYDP8R03H');`,
          }}
        />
      </head>
      <body className={`${sourceSerif.variable} ${inter.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
