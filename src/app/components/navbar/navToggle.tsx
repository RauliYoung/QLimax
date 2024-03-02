import { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon  } from '@chakra-ui/icons';

interface NavToggleProps {
  toggle: () => void;
  isOpen: boolean;
}

export const NavToggle: FC<NavToggleProps> = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: 'block', md: 'none'}} onClick={toggle}>
      {isOpen ? <CloseIcon boxSize={5}/> : <HamburgerIcon boxSize={6} />}
    </Box>
  );

};
