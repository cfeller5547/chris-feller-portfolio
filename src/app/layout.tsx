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
  title: 'Chris Anderson | Senior Full-Stack Engineer',
  description:
    'Senior Full-Stack Engineer specializing in building performant, scalable applications with React, TypeScript, and Node.js. 8+ years of experience shipping products that drive business impact.',
  keywords: [
    'Software Engineer',
    'Full-Stack Developer',
    'React',
    'TypeScript',
    'Node.js',
    'Next.js',
    'Frontend Developer',
    'Backend Developer',
    'Web Developer',
  ],
  authors: [{ name: 'Chris Anderson' }],
  creator: 'Chris Anderson',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chrisanderson.dev',
    siteName: 'Chris Anderson Portfolio',
    title: 'Chris Anderson | Senior Full-Stack Engineer',
    description:
      'Senior Full-Stack Engineer specializing in building performant, scalable applications with React, TypeScript, and Node.js.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Chris Anderson - Senior Full-Stack Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chris Anderson | Senior Full-Stack Engineer',
    description:
      'Senior Full-Stack Engineer specializing in building performant, scalable applications.',
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
