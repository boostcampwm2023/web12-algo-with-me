import { css } from '@style/css';

import { useState } from 'react';

import Tester from './Tester';

import mokData from '../mokData.json';
import Editor from './Editor';
import ProblemContent from './problemContent';

const test = css({
  display: 'flex',
});

const ContestPage = () => {
  const [targetId, setTargetId] = useState(6);
  const targetProblem = mokData.problems.find((problem) => problem.id === targetId);
  const [code, setCode] = useState<string>(
    localStorage.getItem('myValue') || targetProblem?.solutionCode,
  );

  const handleChangeCode = (newCode: string) => {
    setCode(newCode);
  };

  return (
    <div className={test}>
      <ProblemContent content={targetProblem}></ProblemContent>
      <div>
        <Editor code={code} onChangeCode={handleChangeCode} />
        <Tester code={code}></Tester>
      </div>
    </div>
  );
};

export default ContestPage;
