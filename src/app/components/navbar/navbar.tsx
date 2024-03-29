'use client';
import React, {FC, useContext, useState} from 'react';
import {NavToggle} from './navToggle';
import {NavLinks} from './navLinks';
import {NavBarContainer} from './navContainer';
import { NavButtons } from './navButtons';
import { UserContext } from '@/app/contexts/usercontext';



const NavBar: FC = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <NavToggle toggle={toggle} isOpen={isOpen} />
      <NavLinks isOpen={isOpen} />
      <NavButtons isOpen={isOpen} isLoggedIn={!!user} />
    </NavBarContainer>
  );
};

export default NavBar;
