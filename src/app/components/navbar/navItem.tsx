import React, { FC } from 'react';
import { Link, Text } from '@chakra-ui/react';

interface NavLinkItemProps {
  children: React.ReactNode;
  isLast?: boolean;
  to?: string;
  rest?: any;
}

export const NavLinkItem: FC<NavLinkItemProps> = ({
  children,
  isLast,
  to = '/',
  ...rest
}) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};
