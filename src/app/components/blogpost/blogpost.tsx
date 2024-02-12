'use client';
import React from 'react';
import './blogpost.scss';
import Editor from './textEditor/editor';
import Menubar from './menubar/menubar';

export function BlogPostComponent() {
  return (
    <>
      <div className="menubar">
        <Menubar />
      </div>
      <div className="editor">
        <Editor />
      </div>
    </>
  );
}
