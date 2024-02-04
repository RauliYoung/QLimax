import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';

export function DrawerToggle() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const accountname = 'foobar';

  return (
    <>
      <IconButton
        aria-label="open sidebar"
        variant="solid"
        className="drawer-toggle"
        icon={<PlusSquareIcon />}
        onClick={onOpen}
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Hello ! {accountname}</DrawerHeader>

          <DrawerBody></DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
