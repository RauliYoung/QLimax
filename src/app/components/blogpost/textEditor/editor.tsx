import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useColorMode } from '@chakra-ui/react';
import 'react-quill/dist/quill.bubble.css';
import './editor.scss';
import EditorToolbar, { modules, formats } from './editorToolbar';

type Match = {
  offset: number;
  length: number;
};

interface SpellCheckResponse {
  matches: Match[];
}

export default function Editor() {
  const [code, setCode] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { colorMode } = useColorMode();
  const [matches, setMatches] = useState<Match[]>([]);
  const quillRef = useRef<ReactQuill>(null);

  const highlightErrors = (newMatches: Match[]) => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      quill.formatText(0, quill.getLength(), 'underline', false);
      newMatches.forEach((match) => {
        quill.formatText(match.offset, match.length, 'underline', true);
      });
    }
  };

  const checkSpelling = () => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const plainText = quill.getText();
      fetch('/api/spellCheck', {
        method: 'POST',
        body: JSON.stringify({ text: plainText, language: 'en-US' }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data: SpellCheckResponse) => {
          if (data.matches.length === 0) {
            quill.formatText(0, plainText.length, 'underline', false);
          } else {
            setMatches(data.matches);
            highlightErrors(data.matches);
          }
        });
    }
  };

  useEffect(() => {
    highlightErrors(matches);
  }, [matches]);

  const handleProcedureContentChange = (content: string) => {
    setCode(content);
  };

  useEffect(() => {
    setTheme(colorMode === 'dark' ? 'dark' : 'light');
  }, [colorMode]);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const toolbar = quill.getModule('toolbar');
      toolbar.addHandler('spellcheck', checkSpelling);
      const button = document.querySelector('.ql-spellcheck');
      if (button) {
        button.addEventListener('click', () => {
          checkSpelling();
        });
      }
    }
  }, []);

  return (
    <div className="editorContainer">
      <EditorToolbar />
      <ReactQuill
        ref={quillRef}
        className={`editor ${theme}`}
        theme="bubble"
        modules={modules}
        formats={formats}
        value={code}
        placeholder="Write something amazing..."
        onChange={handleProcedureContentChange}
      />
    </div>
  );
}
