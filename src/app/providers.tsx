import {customTheme as theme} from '../../themes/theme';
import {ChakraProvider} from '@chakra-ui/react';
import React from 'react';
import UserProvider from './providers/userProvider';
import { EditorProvider } from './contexts/editorContext';

export function Providers({children}: {children: React.ReactNode}) {
  console.log(theme);
  return (
    <EditorProvider>
    <ChakraProvider theme={theme}>
      <UserProvider>{children}</UserProvider>
    </ChakraProvider>
    </EditorProvider>
  );
}
