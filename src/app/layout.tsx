import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vivarta — Takshila Farewell 2026 | Techno India University',
  description:
    'An immersive cinematic farewell experience by Takshila, the Official Tech Club of Techno India University. Vivarta — Farewell 2026, dedicated to all 4th Year Seniors.',
  keywords: [
    'Takshila',
    'Farewell 2026',
    'Vivarta',
    'Techno India University',
    'college farewell',
    'cinematic invitation',
    'tech club',
    'senior farewell',
  ],
  openGraph: {
    title: 'Vivarta — Takshila Farewell 2026',
    description:
      'A cinematic farewell experience for all 4th Year Seniors. 31 May 2026, Seminar Hall, Techno India University.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="bg-black text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
