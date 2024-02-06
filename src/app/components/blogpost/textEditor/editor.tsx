import React, { useState, useRef, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { useColorMode, Button } from '@chakra-ui/react';
import 'react-quill/dist/quill.bubble.css';
import './editor.scss';

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
      console.log('Checking spelling...');
      console.log(plainText);

      fetch('/api/spellCheck', {
        method: 'POST',
        body: JSON.stringify({ text: plainText, language: 'en-US' }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data: SpellCheckResponse) => {
          console.log(data);
          if (data.matches.length === 0) {
            console.log('No spelling errors');
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

  return (
    <div className="editorContainer">
      <ReactQuill
        ref={quillRef}
        className={`editor ${theme}`}
        theme="bubble"
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
            [{ color: [] }, { background: [] }, { align: [] }],
          ],
        }}
        formats={[
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
          'clean',
        ]}
        value={code}
        placeholder="Write something amazing..."
        onChange={handleProcedureContentChange}
      />
      <Button onClick={checkSpelling}>Check Spelling</Button>
    </div>
  );
}

