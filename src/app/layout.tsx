'use client';
import {Expletus_Sans, Overpass_Mono} from 'next/font/google';
import {Providers} from './providers';
import './styles/globals.scss';
import NavBar from './components/navbar/navbar';
import client from './apolloClient';
import {ApolloProvider} from '@apollo/client';
import logo from '../../public/qlimax2.svg';
import {Image, Flex} from '@chakra-ui/react';

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
          <Image
            src={logo.src}
            position="fixed"
            width={{base: '90%', lg: '70vw'}}
            h="auto"
            left={{base: 'center', lg: 200}}
            top={{base: '500', lg: '30vh'}}
            zIndex={-1}
            transform="rotate(-25deg)"
          />
          <Flex direction="column" m={{base: '2rem', lg: '1rem'}}>
            <ApolloProvider client={client}>{children}</ApolloProvider>
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
