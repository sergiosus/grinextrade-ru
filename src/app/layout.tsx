import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Grinex Trade — поставщик промышленной и текстильной продукции | B2B',
  description: 'Grinex Trade — поставщик текстильной и промышленной продукции для B2B клиентов в России и странах СНГ. Оптовые поставки и коммерческие предложения по запросу.',
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
