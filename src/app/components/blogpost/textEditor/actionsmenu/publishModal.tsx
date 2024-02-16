import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

type PublishModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const PublishModal = ({isOpen, onClose}: PublishModalProps) => {

  const toast = useToast();
  const [isPublishing, setIsPublishing] = useState(false);

  const publishToast = () => {
    toast({
      title: 'Content Published',
      description: 'Your content has been published successfully',
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top-right',
    });
  }
  const errorToast = () => {
    toast({
      title: 'Error',
      description: 'An error occurred while publishing the content',
      status: 'error',
      duration: 9000,
      isClosable: true,
      position: 'top-right',
    });
  }
  const PublishContent = () => {
    // Simulate an API call
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      onClose();
      publishToast();
    }, 2000);
  }

  const handlePublish = () => {
   try {
      PublishContent();
    } catch (error) {
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Publish Content</ModalHeader>
          <ModalBody>Are you sure you want to publish this content?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handlePublish} isLoading={isPublishing} loadingText="Publishing..." spinnerPlacement='start'>
              Publish
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
