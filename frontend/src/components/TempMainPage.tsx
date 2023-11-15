import { useState } from 'react';

import Editor from './Editor';

const TempMainPage = () => {
  const [code, setCode] = useState(localStorage.getItem('myValue') || 'function solution() {\n\n}');

  const getCode = () => {
    // Editor에서 작성한 code를 return해줍니다.
    return code;
  };

  const saveToLocalStorage = () => {
    // Editor에서 작성한 code를 로컬스토리지에 저장합니다.
    localStorage.setItem('myValue', code);
    console.log(code);
    console.log('Code saved to localStorage');
  };

  const clearLocalStorage = () => {
    // 로컬스토리지에 저장된 code를 지우고, 초기 solution함수를 지정해줍니다.
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
