import React, {useState} from 'react';
import {useEffect} from 'react';
import ReactQuill from 'react-quill';
import {useColorMode} from '@chakra-ui/react';

import 'react-quill/dist/quill.snow.css';
import './editor.scss';

export default function Editor() {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{header: 1}, {header: 2}],
      [{list: 'ordered'}, {list: 'bullet'}],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'link',
    'image',
  ];

  const [code, setCode] = useState();
  const [theme, setTheme] = useState('light');
  const {colorMode} = useColorMode();

  const handleProcedureContentChange = (content: any) => {
    setCode(content);
  };

  useEffect(() => {
    if (colorMode === 'dark') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [colorMode]);

  return (
    <div className="editorContainer">
      <ReactQuill
        className={`editor ${theme}`}
        theme="snow"
        modules={modules}
        formats={formats}
        value={code}
        onChange={handleProcedureContentChange}
      />
    </div>
  );
}
