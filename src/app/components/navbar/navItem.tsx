import React, {FC} from 'react';
import {Link, Text, Image} from '@chakra-ui/react';

interface NavLinkItemProps {
  children: React.ReactNode;
  isLast?: boolean;
  to?: string;
  imgSrc?: string;
  rest?: any;
}

export const NavLinkItem: FC<NavLinkItemProps> = ({
  children,
  isLast,
  to = '/',
  imgSrc,
  ...rest
}) => {
  return (
    <Link href={to}>
      {imgSrc ? (
        <Image src={imgSrc} alt={children?.toString()} {...rest} />
      ) : (
        <Text display="block" {...rest}>
          {children}
        </Text>
      )}
    </Link>
  );
};
