import * as Chakra from '@chakra-ui/react';
import {
  BsBookFill,
  BsCursorText,
  BsFillBookmarkFill,
  BsFillPersonFill,
  BsHeartFill,
  BsSearch,
} from 'react-icons/bs';
import {RiApps2Fill} from 'react-icons/ri';
import React from 'react';
import './drawer.scss';
import * as ChakraUi from '@chakra-ui/icons';
import {UserContext} from '@/app/contexts/usercontext';
import {useRouter} from 'next/navigation';

export function Drawer() {
  const router = useRouter();

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
  const {setUser} = React.useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('QLimaxUser');
    setUser(null);
    onModalClose();
    router.push('/');
  };

  return (
    <>
      <Chakra.IconButton
        aria-label="open sidebar"
        className="drawer-toggle"
        icon={<RiApps2Fill />}
        onClick={onDrawerOpen}
        variant="outline"
        size="lg"
      />

      <Chakra.Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={onDrawerClose}
      >
        <Chakra.DrawerOverlay className="drawer-overlay" />
        <Chakra.DrawerContent className="drawer-content">
          <Chakra.DrawerCloseButton className="drawer-close-button" />
          <Chakra.DrawerHeader className="drawer-header"></Chakra.DrawerHeader>
          <Chakra.DrawerBody className="drawer-body">
            <Chakra.Menu>
              <Chakra.MenuButton as={Chakra.Button} leftIcon={<BsBookFill />}>
                Blogs
              </Chakra.MenuButton>
              <Chakra.MenuList>
                <Chakra.MenuItem
                  as={Chakra.Button}
                  onClick={() => {
                    router.push('/blogpost');
                    onDrawerClose();
                  }}
                  icon={<BsCursorText />}
                >
                  Write
                </Chakra.MenuItem>
                <Chakra.MenuItem
                  as={Chakra.Button}
                  onClick={() => {
                    router.push('/search');
                    onDrawerClose();
                  }}
                  icon={<BsSearch />}
                >
                  Search
                </Chakra.MenuItem>
              </Chakra.MenuList>
            </Chakra.Menu>
            <Chakra.Menu>
              <Chakra.MenuButton
                as={Chakra.Button}
                leftIcon={<BsFillPersonFill />}
              >
                Profile
              </Chakra.MenuButton>
              <Chakra.MenuList>
                <Chakra.MenuItem
                  icon={<ChakraUi.SettingsIcon />}
                  onClick={() => {
                    router.push('/settings');
                    onDrawerClose();
                  }}
                >
                  Settings
                </Chakra.MenuItem>
                <Chakra.MenuItem
                  icon={<ChakraUi.ArrowForwardIcon />}
                  onClick={onModalOpen}
                >
                  Logout
                </Chakra.MenuItem>
              </Chakra.MenuList>
            </Chakra.Menu>
            <Chakra.Button
              leftIcon={<BsFillBookmarkFill />}
              className="drawer-button"
              variant="outline"
              onClick={() => {
                router.push('/bookmarks');
                onDrawerClose();
              }}
            >
              Bookmarks
            </Chakra.Button>
            <Chakra.Button
              leftIcon={<BsHeartFill />}
              className="drawer-button"
              variant="outline"
            >
              Favourites
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
          <Chakra.ModalHeader>
            Are you sure you want to log out
          </Chakra.ModalHeader>
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
