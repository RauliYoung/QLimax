<<<<<<< HEAD
=======
"use client";
>>>>>>> origin/development
import React, { useState, useEffect } from 'react';
import './toggle.scss';
import SunIcon from '@/app/components/ui/icons/sunicon';
import MoonIcon from '@/app/components/ui/icons/moonicon';
<<<<<<< HEAD

type SwitchProps = {
=======
import { useColorMode } from '@chakra-ui/react';

type ToggleProps = {
>>>>>>> origin/development
  id: string;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

<<<<<<< HEAD
const Switch: React.FC<SwitchProps> = ({ id, defaultChecked = false, onChange, className }) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  useEffect(() => {
    setIsChecked(defaultChecked);
  }, [defaultChecked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
=======
const Toggle: React.FC<ToggleProps> = ({ id, defaultChecked = false, onChange, className }) => {
  const { colorMode , toggleColorMode } = useColorMode();
  const [isChecked, setIsChecked] = useState(defaultChecked);

  useEffect(() => {
    setIsChecked(colorMode === 'dark');
  }, [colorMode]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    toggleColorMode();
>>>>>>> origin/development
    if(onChange) {
      onChange(event);
    }
  };

  return (
    <label htmlFor={id} className={`switch ${className}`}>
      {!isChecked && <SunIcon className="icon sun-icon" />}
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={handleChange}
        aria-label="Toggle between themes"
      />
      <span className="slider round"></span>
      {isChecked && <MoonIcon className="icon moon-icon" />}
    </label>
  );
};

<<<<<<< HEAD
export default Switch;
=======
export default Toggle;
>>>>>>> origin/development

