import { FC } from 'react';
import { Flex, Stack } from '@chakra-ui/react';
import Toggle from '../ui/theme-toggle/toggle';
import { DrawerToggle } from './drawerToggle';

export const NavButtons: FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <Flex
      display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
      flexBasis={{ base: '100%', md: 'auto' }}
      justifyContent="flex-end"
      alignItems="center"
      flexGrow={1}
    >
      <Stack
        spacing={8}
        align="center"
        justify="flex-end"
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <DrawerToggle />
        <Toggle id="theme-toggle" />
      </Stack>
    </Flex>
  );
};

