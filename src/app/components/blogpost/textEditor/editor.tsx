'use client';
import {useState, useRef, useEffect} from 'react';
import ReactQuill from 'react-quill';
import {useColorMode, Flex} from '@chakra-ui/react';
import 'react-quill/dist/quill.bubble.css';
import './editor.scss';
import EditorToolbar, {modules, formats} from './editorToolbar';
import {ActionsMenu} from './actionsmenu/actionsmenu';
import {useEditorContext} from '@/app/contexts/editorContext';
import {useToast} from '@chakra-ui/react';

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
  const toast = useToast();
  const toastShown = useRef(false);

  const highlightErrors = (newMatches: Match[]) => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      quill.formatText(0, quill.getLength(), 'underline', false);
      newMatches.forEach((match) => {
        quill.formatText(match.offset, match.length, 'underline', true);
      });
    }
  };

  useEffect(() => {
    if (draft && draft.content && !toastShown.current) {
      toast({
        title: `Draft Loaded: ${draft.title}`,
        description: 'Your draft been loaded successfully.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      toastShown.current = true;
    }
  }, [draft, toast]);

  const checkSpelling = () => {
    const quill = quillRef.current?.getEditor();
    if (quill && typeof window !== 'undefined') {
      const plainText = quill.getText();
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
          toast({
            title: 'Spell Check Completed',
            description: `Found ${data.matches.length} errors.`,
            status: 'info',
            duration: 3000,
            isClosable: true,
          });
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
    <Flex className="editorContainer" direction={{base: 'column', lg: 'row'}}>
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
    </Flex>
  );
};

export default Editor;
