'use client';

import {customTheme as theme} from '../../themes/theme';
import {ChakraProvider} from '@chakra-ui/react';
import React from 'react';
import {UserProvider} from './providers/userProvider';

export function Providers({children}: {children: React.ReactNode}) {
  console.log(theme);
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>{children}</UserProvider>
    </ChakraProvider>
  );
}
