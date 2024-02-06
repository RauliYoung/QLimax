import * as Chakra from '@chakra-ui/react';
import { BsFillBookmarkFill, BsFillPersonFill } from 'react-icons/bs';
import React from 'react';
import './drawerToggle.scss';
import * as ChakraUi from "@chakra-ui/icons";

export function DrawerToggle() {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = Chakra.useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = Chakra.useDisclosure();

  const accountname = 'foobar';

  // TODO: implement logout 

  const handleLogout = () => {
    console.log('logout');
  };

  return (
    <>
      <Chakra.IconButton
        aria-label="open sidebar"
        variant="solid"
        className="drawer-toggle"
        icon={<ChakraUi.PlusSquareIcon />}
        onClick={onDrawerOpen}
      />

      <Chakra.Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose}>
        <Chakra.DrawerOverlay className="drawer-overlay" />
        <Chakra.DrawerContent className="drawer-content">
          <Chakra.DrawerCloseButton className="drawer-close-button" />
          <Chakra.DrawerHeader className="drawer-header">
            Hello ! {accountname}
          </Chakra.DrawerHeader>
          <Chakra.DrawerBody className="drawer-body">
            <Chakra.Menu>
              <Chakra.MenuButton as={Chakra.Button} leftIcon={<ChakraUi.EditIcon />}>
                Blogs
              </Chakra.MenuButton>
              <Chakra.MenuList>
                <Chakra.MenuItem>fizz</Chakra.MenuItem>
                <Chakra.MenuItem>buzz</Chakra.MenuItem>
                <Chakra.MenuItem>fizzbuzz</Chakra.MenuItem>
              </Chakra.MenuList>
            </Chakra.Menu>
            <Chakra.Menu>
              <Chakra.MenuButton as={Chakra.Button} leftIcon={<BsFillPersonFill />}>
                Profile
              </Chakra.MenuButton>
              <Chakra.MenuList>
                <Chakra.MenuItem icon={<ChakraUi.SettingsIcon />}>Settings</Chakra.MenuItem>
                <Chakra.MenuItem icon={<ChakraUi.ArrowForwardIcon />} onClick={onModalOpen}>
                  Logout
                </Chakra.MenuItem>
              </Chakra.MenuList>
            </Chakra.Menu>

            <Chakra.Button
              leftIcon={<BsFillBookmarkFill />}
              className="drawer-button"
              variant="outline"
            >
              Bookmarks
            </Chakra.Button>
          </Chakra.DrawerBody>

          <Chakra.DrawerFooter className="drawer-footer"></Chakra.DrawerFooter>
        </Chakra.DrawerContent>
      </Chakra.Drawer>
      <Chakra.Modal
        closeOnOverlayClick={false}
        isOpen={isModalOpen}
        onClose={onModalClose}
      >
        <Chakra.ModalOverlay />
        <Chakra.ModalContent>
          <Chakra.ModalHeader>Are you sure you want to log out</Chakra.ModalHeader>
          <Chakra.ModalCloseButton />
          <Chakra.ModalBody pb={6}></Chakra.ModalBody>

          <Chakra.ModalFooter>
            <Chakra.Button colorScheme="red" mr={3} onClick={handleLogout}>
              Logout
            </Chakra.Button>
            <Chakra.Button onClick={onModalClose}>Cancel</Chakra.Button>
          </Chakra.ModalFooter>
        </Chakra.ModalContent>
      </Chakra.Modal>
    </>
  );
}

