import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
} from '@chakra-ui/react';
import { useState } from 'react';
import { randomColor } from './randomColors';

type TagModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const TagModal = ({ isOpen, onClose }: TagModalProps) => {
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<{tag: string, color: string}[]>([]);

  const handleAddTag = () => {
    setTag(''); 
    setTags([...tags, {tag, color: randomColor()}]);
  }
  const handleRemoveTag = (tagRevove: string) => {
    setTags(tags.filter((tag) => tag.tag !== tagRevove));
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a Tag</ModalHeader>
        <ModalBody>
          <Input placeholder="Type your tag" value={tag} onChange={(e) => setTag(e.target.value)} />
          <Stack spacing={4}  mt={4} direction="row" flexWrap="wrap" width="100">
            {tags.map((tag, index) => (
              <Tag key={index} size="lg" borderRadius="full" variant="solid" bg={tag.color} color="black">
                <TagLabel>{tag.tag}</TagLabel>
                <TagCloseButton onClick={() => handleRemoveTag(tag.tag)} />
              </Tag>
            ))}
          </Stack>
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

