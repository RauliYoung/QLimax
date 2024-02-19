import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import {useEditorContext} from '@/app/contexts/editorContext';

interface ConfirmReloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmReloadModal({
  isOpen,
  onClose,
}: ConfirmReloadModalProps) {
  const {deleteDraft} = useEditorContext();

  const handleDeletedraft = () => {
    deleteDraft();
    window.location.reload();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm new Blog</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to empty the editor and clear saved draft?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDeletedraft}>
              Empty
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
