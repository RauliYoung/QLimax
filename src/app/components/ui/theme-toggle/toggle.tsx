import React, {useState, useEffect} from 'react';
import './toggle.scss';
import SunIcon from '@/app/components/ui/icons/sunicon';
import MoonIcon from '@/app/components/ui/icons/moonicon';

type SwitchProps = {
  id: string;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Switch: React.FC<SwitchProps> = ({
  id,
  defaultChecked = false,
  onChange,
  className,
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  useEffect(() => {
    setIsChecked(defaultChecked);
  }, [defaultChecked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    if (onChange) {
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

export default Switch;
