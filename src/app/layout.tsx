import type { Metadata } from 'next';
import { Expletus_Sans, Overpass_Mono } from 'next/font/google';
import { Providers } from './providers';
import './styles/globals.scss';
import NavBar from './components/navbar/navbar';

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
    <html lang='en'>
      <body className={`${Overpass.variable} ${expletus.variable}`}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
