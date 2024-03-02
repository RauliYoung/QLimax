import React from 'react';
import './menubar.scss';
import {EditableTitle} from './title';

const Menubar = () => {
  return (
    <>
      <div className="menubar">
        <div className="title">
          <EditableTitle />
        </div>
      </div>
    </>
  );
};
export default Menubar;
