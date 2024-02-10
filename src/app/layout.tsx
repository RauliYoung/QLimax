import type {Metadata} from 'next';
import {Expletus_Sans, Overpass_Mono} from 'next/font/google';
import {Providers} from './providers';
import '../app/styles/globals.scss';
//Can be used as variables in globals.css --> check

const Overpass = Overpass_Mono({
  subsets: ['latin'],
  variable: '--font-overpass-mono',
  display: 'swap',
});

const expletus = Expletus_Sans({
  subsets: ['latin'],
  variable: '--font-expletus-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Qlimax',
  description: 'For better blogging',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Overpass.variable} ${expletus.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
