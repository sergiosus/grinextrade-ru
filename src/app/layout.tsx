import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import { COMPANY } from '@/lib/company';

export const metadata: Metadata = {
  title: `${COMPANY.brand} | B2B sourcing`,
  description: `${COMPANY.brand}: B2B sourcing, parts, wheels, and documents.`,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" dir="ltr" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
