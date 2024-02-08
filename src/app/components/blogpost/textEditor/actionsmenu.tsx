import {AddIcon, EditIcon, ExternalLinkIcon} from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import PlusIcon from '../../ui/icons/plusicon';
import {BsSave, BsTag} from 'react-icons/bs';

export const ActionsMenu = () => (
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
      <MenuItem icon={<ExternalLinkIcon />}>Save as draft</MenuItem>
      <MenuItem icon={<BsSave />}>Save</MenuItem>
      <MenuItem icon={<BsTag />}>Add Tag</MenuItem>
      <MenuItem icon={<EditIcon />}>Publish</MenuItem>
    </MenuList>
  </Menu>
);
