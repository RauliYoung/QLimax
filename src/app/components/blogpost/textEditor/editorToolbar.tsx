"use client"; 
import React from 'react';
import {Quill} from 'react-quill';
import {UndoIcon} from '@/app/components/ui/icons/undoicon';
import {RedoIcon} from '../../ui/icons/redoicon';
import {AiIcon} from '../../ui/icons/aiicon';
import './editorToolbar.scss';

function undoChange(this: any) {
  this.quill.history.undo();
}
function redoChange(this: any) {
  this.quill.history.redo();
}

const Size = Quill.import('formats/size');
Size.whitelist = ['extra-small', 'small', 'medium', 'large'];
Quill.register(Size, true);

export const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
};

export const formats = [
  'header',
  'size',
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'script',
  'blockquote',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'code-block',
];

export const QuillToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
      <select className="ql-header" defaultValue="3">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">Normal</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>
    <span className="ql-formats">
      <button className="ql-blockquote" />
    </span>
    <span className="ql-formats">
      <select className="ql-align" />
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
    </span>
    <span className="ql-formats">
      <button className="ql-formula" />
      <button className="ql-code-block" />
    </span>
    <span className="ql-formats">
      <button className="ql-undo">
        <UndoIcon />
      </button>
      <button className="ql-redo">
        <RedoIcon />
      </button>
    </span>
    <span className="ql-formats">
      <button className="ql-spellcheck">
        <AiIcon />
      </button>
    </span>
  </div>
);

export default QuillToolbar;
