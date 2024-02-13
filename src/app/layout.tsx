"use client";
import {Expletus_Sans, Overpass_Mono} from 'next/font/google';
import {Providers} from './providers';
import './styles/globals.scss';
import NavBar from './components/navbar/navbar';
import client from './apolloClient';
import {ApolloProvider} from '@apollo/client';

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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Overpass.variable} ${expletus.variable}`}>
        <Providers>
          <NavBar />
            <ApolloProvider client={client}>
            {children}
            </ApolloProvider>
        </Providers>
      </body>
    </html>
  );
}
