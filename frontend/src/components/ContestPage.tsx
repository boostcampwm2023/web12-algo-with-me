import { useState } from 'react';

import Editor from './Editor';
import Tester from './Tester';

const ContestPage = () => {
  const [code, setCode] = useState<string>(
    localStorage.getItem('myValue') || 'function solution() {\n\n}',
  );

  const handleChangeCode = (newCode: string) => {
    setCode(newCode);
  };

  return (
    <div>
      <Editor code={code} onChangeCode={handleChangeCode} />
      <Tester code={code}></Tester>
    </div>
  );
};

export default ContestPage;
