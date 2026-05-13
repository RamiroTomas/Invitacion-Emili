import type {Metadata} from 'next';
import { Cinzel, Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-display',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Invitación XV Emilia Tomas',
  description: 'Quiero que seas parte de mis XV por eso te llega esta invitación mágica',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" className={`${inter.variable} ${cinzel.variable} ${cormorant.variable}`}>
      <body suppressHydrationWarning className="font-serif bg-[#fdfaf1] text-[#2c1810]">
        {children}
      </body>
    </html>
  );
}
