import { useState } from 'react';

import Editor from './Editor';

const TempMainPage = () => {
  const [code, setCode] = useState(localStorage.getItem('myValue') || 'function solution() {\n\n}');

  const getCode = () => {
    return code;
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('myValue', code);
    console.log(code);
    console.log('Code saved to localStorage');
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('myValue');
    console.log('Local Storage Cleared');
    setCode('function solution() {\n\n}');
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <Editor code={code} setCode={setCode} />
    </div>
  );
};

export default TempMainPage;
