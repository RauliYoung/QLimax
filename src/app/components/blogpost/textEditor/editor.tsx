'use client';
import {useState, useRef, useEffect} from 'react';
import ReactQuill from 'react-quill';
import {useColorMode} from '@chakra-ui/react';
import 'react-quill/dist/quill.bubble.css';
import './editor.scss';
import EditorToolbar, {modules, formats} from './editorToolbar';
import {ActionsMenu} from './actionsmenu/actionsmenu';
import {useEditorContext} from '@/app/contexts/editorContext';

type Match = {
  offset: number;
  length: number;
};

interface SpellCheckResponse {
  matches: Match[];
}

const Editor: React.FC = () => {
  const {content, setContent, draft} = useEditorContext();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const {colorMode} = useColorMode();
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
    if (quill && typeof window !== 'undefined') {
      const plainText = quill.getText();
      console.log(plainText);
      fetch('/api/spellCheck', {
        method: 'POST',
        body: JSON.stringify({text: plainText, language: 'en-US'}),
        headers: {'Content-Type': 'application/json'},
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
    const loadDraft = async () => {
      if (draft && draft.content) {
        handleProcedureContentChange(draft.content);
      }
    };
    loadDraft();
  }, [draft, setContent]);

  useEffect(() => {
    highlightErrors(matches);
  }, [matches]);

  const handleProcedureContentChange = (content: string) => {
    setContent(content);
  };

  useEffect(() => {
    setTheme(colorMode === 'dark' ? 'dark' : 'light');
  }, [colorMode]);

  useEffect(() => {
    if (quillRef.current && typeof window !== 'undefined') {
      const quill = quillRef.current.getEditor();
      const toolbar = quill.getModule('toolbar');
      toolbar.addHandler('spellcheck', checkSpelling);
    }
  }, [quillRef]);

  return (
    <div className="editorContainer">
      <EditorToolbar />
      <ActionsMenu />
      <ReactQuill
        ref={quillRef}
        className={`editor ${theme}`}
        theme="bubble"
        modules={modules}
        formats={formats}
        value={content}
        placeholder="Write something amazing..."
        onChange={handleProcedureContentChange}
      />
    </div>
  );
};

export default Editor;
