// TODO: reformat as import * as Chakra from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { BsFillBookmarkFill, BsFillPersonFill } from 'react-icons/bs';
import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import {
  EditIcon,
  PlusSquareIcon,
  SettingsIcon,
  ArrowForwardIcon,
} from '@chakra-ui/icons';
import './drawerToggle.scss';

export function DrawerToggle() {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const accountname = 'foobar';

  // TODO: implement logout 

  const handleLogout = () => {
    console.log('logout');
  };

  return (
    <>
      <IconButton
        aria-label="open sidebar"
        variant="solid"
        className="drawer-toggle"
        icon={<PlusSquareIcon />}
        onClick={onDrawerOpen}
      />

      <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose}>
        <DrawerOverlay className="drawer-overlay" />
        <DrawerContent className="drawer-content">
          <DrawerCloseButton className="drawer-close-button" />
          <DrawerHeader className="drawer-header">
            Hello ! {accountname}
          </DrawerHeader>
          <DrawerBody className="drawer-body">
            <Menu>
              <MenuButton as={Button} leftIcon={<EditIcon />}>
                Blogs
              </MenuButton>
              <MenuList>
                <MenuItem>fizz</MenuItem>
                <MenuItem>buzz</MenuItem>
                <MenuItem>fizzbuzz</MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton as={Button} leftIcon={<BsFillPersonFill />}>
                Profile
              </MenuButton>
              <MenuList>
                <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
                <MenuItem icon={<ArrowForwardIcon />} onClick={onModalOpen}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>

            <Button
              leftIcon={<BsFillBookmarkFill />}
              className="drawer-button"
              variant="outline"
            >
              Bookmarks
            </Button>
          </DrawerBody>

          <DrawerFooter className="drawer-footer"></DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isModalOpen}
        onClose={onModalClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to log out</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}></ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleLogout}>
              Logout
            </Button>
            <Button onClick={onModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
