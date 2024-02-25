import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import customTheme from '../../../../themes/theme';
import { handleLogout } from '@/app/lib/logoutHelper';
import { UserContext } from '@/app/contexts/usercontext';
import React from 'react';

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  isOpen: boolean;
  onClose: () => void;
}
export const ConfirmationModal = ({
  message,
  onConfirm,
}: ConfirmationModalProps) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const { setUser } = React.useContext(UserContext);

  const handleConfirm = () => {
    onConfirm();
    onClose();
    handleLogout(setUser);
  };
  const inputsBg = useColorModeValue('qlimax.bg-pink', 'qlimax.bg-yellow');

  return (
    <>
      <Button
        textAlign="center"
        color="black"
        _hover={{bg: '#677589'}}
        onClick={onOpen}
        bg={inputsBg}
        minW={'10rem'}
        border={`1px solid ${customTheme.colors.black}`}
        borderRadius="8px"
      >
        Delete User
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{message}</ModalBody>

          <ModalFooter>
            <Button  mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button  onClick={handleConfirm} colorScheme="red">
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
