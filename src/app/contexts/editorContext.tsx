import React, {createContext, useState, useContext} from 'react';

interface EditorContextProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  tags: {tag: string; color: string}[];
  setTags: React.Dispatch<React.SetStateAction<{tag: string; color: string}[]>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  postId: string | null;
  setPostId: React.Dispatch<React.SetStateAction<string | null>>;
  setDraft: React.Dispatch<React.SetStateAction<any>>;
  saveAsDraft: (draft: any) => void;
  draft: any;
  deleteDraft: () => void;
  children?: React.ReactNode;
}

const EditorContext = createContext<EditorContextProps | undefined>(undefined);

export const EditorProvider: React.FC<EditorContextProps> = ({children}) => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<{tag: string; color: string}[]>([]);
  const [title, setTitle] = useState('Title');
  const [postId, setPostId] = useState<string | null>(null);
  const [draft, setDraft] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedDraft = localStorage.getItem('draft');
      return savedDraft ? JSON.parse(savedDraft) : null;
    }
  });

  const saveAsDraft = (post: any) => {
    setDraft(post);
    localStorage.setItem('draft', JSON.stringify(post));
  };
  const deleteDraft = () => {
    setDraft(null);
    localStorage.removeItem('draft');
  };

  return (
    <EditorContext.Provider
      value={{
        content,
        setContent,
        tags,
        setTags,
        title,
        setTitle,
        postId,
        setPostId,
        draft,
        setDraft,
        saveAsDraft,
        deleteDraft,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditorContext must be used within a EditorProvider');
  }
  return context;
};
