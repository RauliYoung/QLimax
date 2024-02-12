import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from '@chakra-ui/react';

type PublishModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const PublishModal = ({ isOpen, onClose }: PublishModalProps) => {

 const handlePublish = () => {
    onClose();
    console.log('Publish');
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Publish Content</ModalHeader>
          <ModalBody>
            Are you sure you want to publish this content?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button   onClick={handlePublish}>Publish</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

