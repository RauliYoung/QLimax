# Documentation

---

# Styling!

Fonts are currentyl managed from globals.css with the important tag. from layout you can download more fonts.
example of adding fonts.
layout.tsx

```
import type { Metadata } from 'next';
import { Expletus_Sans, Overpass_Mono } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';
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
    <html lang='en'>
    //Here you pass variables to body. can be defined from globals.css but for now need !important so it overrides chakra theme.
      <body className={`${Overpass.variable} ${expletus.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

```

---

### Links to Chakra Documentation

---

https://chakra-ui.com/getting-started/nextjs-app-guide

https://chakra-ui.com/docs/styled-system/customize-theme

### "Override component props" give original inline css styling

https://chakra-ui.com/docs/styled-system/the-sx-prop
