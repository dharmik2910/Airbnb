import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 · Airbnb Clone',
  description: 'Pixel-fidelity clone of an Airbnb listing page',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-circular text-hof antialiased">{children}</body>
    </html>
  );
}