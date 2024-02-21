import dynamic from 'next/dynamic';
import Menubar from './menubar/menubar';

const Editor = dynamic(() => import('./textEditor/editor'), { ssr: false });

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

