import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';

export const NavBarContainer: FC<{ children: React.ReactNode }> = ({
  children,
  ...props
}) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      {...props}
    >
      {children}
      <Box display={{ base: 'none', md: 'block' }}>
      </Box>
    </Flex>
  );
};
