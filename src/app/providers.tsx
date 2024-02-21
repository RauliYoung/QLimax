import {customTheme as theme} from '../../themes/theme';
import {ChakraProvider} from '@chakra-ui/react';
import React from 'react';
import UserProvider from './providers/userProvider';
import {EditorProvider} from './contexts/editorContext';

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <EditorProvider
      content={''}
      setContent={function (value: React.SetStateAction<string>): void {
        throw new Error('Function not implemented.');
      }}
      tags={[]}
      setTags={function (
        value: React.SetStateAction<{tag: string; color: string}[]>
      ): void {
        throw new Error('Function not implemented.');
      }}
      title={''}
      setTitle={function (value: React.SetStateAction<string>): void {
        throw new Error('Function not implemented.');
      }}
      postId={null}
      setPostId={function (value: React.SetStateAction<string | null>): void {
        throw new Error('Function not implemented.');
      }}
      setDraft={function (value: any): void {
        throw new Error('Function not implemented.');
      }}
      saveAsDraft={function (draft: any): void {
        throw new Error('Function not implemented.');
      }}
      draft={undefined}
      deleteDraft={function (): void {
        throw new Error('Function not implemented.');
      }}
    >
      <ChakraProvider theme={theme}>
        <UserProvider>{children}</UserProvider>
      </ChakraProvider>
    </EditorProvider>
  );
}
