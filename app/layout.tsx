
import { Metadata } from 'next';
import { Montserrat, Playfair_Display } from 'next/font/google';
import { siteConfig } from './_utils/siteConfig';
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

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: siteConfig().title,
    description: siteConfig().description,
    openGraph: {
      title: siteConfig().title,
      description: siteConfig().description,
      type: 'website',
      url: siteConfig().baseUrl,
      images: [
        {
          url: siteConfig().ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig().name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig().title,
      description: siteConfig().description,
      images: [siteConfig().ogImage],
      creator: siteConfig().twitter,
    },
  };
}

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
