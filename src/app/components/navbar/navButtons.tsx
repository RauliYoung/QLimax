import {FC} from 'react';
import {Flex, Stack} from '@chakra-ui/react';
import Toggle from '../ui/theme-toggle/toggle';
import {Drawer} from './drawer/drawer';

export const NavButtons: FC<{isOpen: boolean}> = ({isOpen}) => {
  return (
    <Flex
      display={{base: isOpen ? 'block' : 'none', md: 'flex'}}
      flexBasis={{base: '100%', md: 'auto'}}
      justifyContent={{base: 'center', md: 'flex-end'}}
      alignItems="center"
      flexGrow={1}
    >
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'column', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <Drawer />
        <Toggle id="theme-toggle" />
      </Stack>
    </Flex>
  );
};
