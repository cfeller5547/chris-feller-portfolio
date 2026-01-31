import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Chris Feller | Applied AI Engineer & Full-Stack Developer',
  description:
    'Applied AI Engineer building products with GenAI at the core. Full-stack developer with 3+ years of experience shipping reliable, scalable applications.',
  keywords: [
    'AI Engineer',
    'LLM Applications',
    'Full-Stack Developer',
    'GenAI',
    'React',
    'TypeScript',
    'Node.js',
    'Next.js',
    'Software Engineer',
    'San Diego',
  ],
  authors: [{ name: 'Chris Feller' }],
  creator: 'Chris Feller',
  metadataBase: new URL('https://christopherfeller.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://christopherfeller.com',
    siteName: 'Chris Feller Portfolio',
    title: 'Chris Feller | Applied AI Engineer & Full-Stack Developer',
    description:
      'Applied AI Engineer building products with GenAI at the core. Full-stack developer shipping reliable, scalable applications.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Chris Feller - Applied AI Engineer & Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chris Feller | Applied AI Engineer & Full-Stack Developer',
    description:
      'Applied AI Engineer building products with GenAI at the core.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-[var(--bg-primary)] text-[var(--text-primary)]`}
      >
        {children}
      </body>
    </html>
  );
}
