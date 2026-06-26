import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lexicon | English Dictionary & Word Explorer',
  description:
    'Search english words, view phonetics, definitions, examples, and keep a personal search history and list of favorite entries.',
  keywords: ['dictionary', 'english', 'vocabulary', 'lexicon', 'learning'],
  authors: [{ name: 'Lexicon Team' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased min-h-screen text-foreground bg-bg-deep font-sans selection:bg-brand-violet/30 selection:text-white`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
