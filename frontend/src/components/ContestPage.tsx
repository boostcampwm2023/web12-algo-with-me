import { useState } from 'react';

import Editor from './Editor';

const ContestPage = () => {
  const [code, setCode] = useState(localStorage.getItem('myValue') || 'function solution() {\n\n}');

  return (
    <div>
      <Editor code={code} setCode={setCode} />
    </div>
  );
};

export default ContestPage;
