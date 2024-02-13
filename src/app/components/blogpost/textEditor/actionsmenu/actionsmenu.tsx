import {AddIcon, EditIcon, ExternalLinkIcon} from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import PlusIcon from '../../../ui/icons/plusicon';
import {BsSave, BsTag} from 'react-icons/bs';
import { PublishModal } from './publishModal';
import { TagModal } from './tagModal';



export const ActionsMenu = () => {
  const publishModal = useDisclosure();
  const tagModal = useDisclosure();

  const handleSave = () => {
    console.log('Save');
  }

  const handleSaveAsDraft = () => {
   console.log('Save as draft'); 
  }

 return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<PlusIcon />}
          size="lg"
          variant="outline"
          rounded="full"
          margin="1rem"
        />
        <MenuList>
          <MenuItem icon={<AddIcon />}>New</MenuItem>
          <MenuItem onClick={handleSaveAsDraft} icon={<ExternalLinkIcon />}>Save as draft</MenuItem>
          <MenuItem icon={<BsSave />} onClick={handleSave}>Save</MenuItem>
          <MenuItem icon={<BsTag />} onClick={tagModal.onOpen}>Add Tag</MenuItem>
          <MenuItem icon={<EditIcon />} onClick={publishModal.onOpen}>Publish</MenuItem>
        </MenuList>
      </Menu>
      <PublishModal isOpen={publishModal.isOpen} onClose={publishModal.onClose} />
      <TagModal isOpen={tagModal.isOpen} onClose={tagModal.onClose} />
    </>
  );
};
