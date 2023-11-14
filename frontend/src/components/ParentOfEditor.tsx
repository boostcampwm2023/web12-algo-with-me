import React, { useRef } from 'react';
import EditorWithInitialState from './EditorWithInitialState';

const ParentComponent = () => {
  const initialValue = 'function solution() {\n\n}';
  const editorRef = useRef();

  const handleReturnCode = () => {
    const code = editorRef.current.returnCode();
    console.log('Return Code:', code);
  };

  const handleClearLocalStorage = () => {
    editorRef.current.clearLocalStorage();
    console.log('Local Storage Cleared');
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <EditorWithInitialState ref={editorRef} value={initialValue} />
      <button onClick={handleReturnCode}>Get Code</button>
      <button onClick={handleClearLocalStorage}>Clear Local Storage</button>
    </div>
  );
};

export default ParentComponent;
