import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';

type TagModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const TagModal = ({ isOpen, onClose }: TagModalProps) => {
  const [tag, setTag] = useState(''); 

  const handleAddTag = () => {
    console.log('Add Tag');
    console.log(`Tag Added: ${tag}`); 
    setTag(''); 
    onClose(); 
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a Tag</ModalHeader>
        <ModalBody>
          <Input placeholder="Type your tag" value={tag} onChange={(e) => setTag(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button  onClick={handleAddTag}>Add Tag</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

