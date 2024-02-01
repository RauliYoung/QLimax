import React from 'react';
import './switch.scss'; 

type SwitchProps = {
  id: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Switch: React.FC<SwitchProps> = ({ id, checked = false, onChange, className }) => {
  return (
    <label htmlFor={id} className={`switch ${className}`}>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <span className="slider round"></span>
    </label>
  );
};

export default Switch;

