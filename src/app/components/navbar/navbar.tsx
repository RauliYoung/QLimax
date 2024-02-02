'use client';
import React, { FC, useState } from 'react';
import { NavToggle} from './navToggle';
import { NavLinks } from './navLinks';
import { NavBarContainer } from './navContainer';



const NavBar: FC = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <NavToggle toggle={toggle} isOpen={isOpen} />
      <NavLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};


export default NavBar;
