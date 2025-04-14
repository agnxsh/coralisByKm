
import { Montserrat, Playfair_Display } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-playfair',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'Coralis',
  description: 'Explore the Magnificent',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${playfair.variable} ${montserrat.variable} font-sans bg-background`}>
        {children}
      </body>
    </html>
  );
}
