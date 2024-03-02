import {FC} from 'react';
import {Box, Stack, Image} from '@chakra-ui/react';
import {NavLinkItem} from './navItem';
import logo from '../../../../public/qlimax2.svg';
import {useRouter} from 'next/navigation';


export const NavLinks: FC<{isOpen: boolean}> = ({isOpen}) => {
  const router = useRouter();
  return (
    <Box
      display={{base: isOpen ? 'block' : 'none', md: 'block'}}
      flexBasis={{base: '100%', md: 'auto'}}
    >
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'column', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <button onClick={() => router.push('/')}>
        <Image src={logo.src} width="300px" h="auto" objectFit="contain" />
        </button>
      </Stack>
    </Box>
  );
};
