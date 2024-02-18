import React, { createContext, useState, useContext } from 'react';

interface EditorContextProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  tags: { tag: string; color: string }[];
  setTags: React.Dispatch<React.SetStateAction<{ tag: string; color: string }[]>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  postId: string | null;  
  setPostId: React.Dispatch<React.SetStateAction<string | null>>;  
}

const EditorContext = createContext<EditorContextProps | undefined>(undefined);

export const EditorProvider: React.FC = ({ children }) => {
  const [code, setCode] = useState('');
  const [tags, setTags] = useState<{ tag: string; color: string }[]>([]);
  const [title, setTitle] = useState('Title');
  const [postId, setPostId] = useState<string | null>(null);  

  return (
    <EditorContext.Provider value={{ code, setCode, tags, setTags, title, setTitle, postId, setPostId }}> 
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

