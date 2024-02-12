<<<<<<< HEAD
"use client";
=======
>>>>>>> 750069c (Development (#3))
import React, { useState, useEffect } from 'react';
import './toggle.scss';
import SunIcon from '@/app/components/ui/icons/sunicon';
import MoonIcon from '@/app/components/ui/icons/moonicon';
<<<<<<< HEAD
import { useColorMode } from '@chakra-ui/react';

type ToggleProps = {
=======

type SwitchProps = {
>>>>>>> 750069c (Development (#3))
  id: string;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

<<<<<<< HEAD
const Toggle: React.FC<ToggleProps> = ({ id, defaultChecked = false, onChange, className }) => {
  const { colorMode , toggleColorMode } = useColorMode();
  const [isChecked, setIsChecked] = useState(defaultChecked);

  useEffect(() => {
    setIsChecked(colorMode === 'dark');
  }, [colorMode]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    toggleColorMode();
=======
const Switch: React.FC<SwitchProps> = ({ id, defaultChecked = false, onChange, className }) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  useEffect(() => {
    setIsChecked(defaultChecked);
  }, [defaultChecked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
>>>>>>> 750069c (Development (#3))
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
export default Toggle;
=======
export default Switch;
>>>>>>> 750069c (Development (#3))

