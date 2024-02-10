'use client';
import {customTheme as theme} from '../../themes/theme';
import {ChakraProvider} from '@chakra-ui/react';

export function Providers({children}: {children: React.ReactNode}) {
  // console.log(theme);
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
