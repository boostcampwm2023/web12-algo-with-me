import { useEffect, useState } from 'react';

import mokData from '../mokData.json';
import Editor from './Editor';
import ProblemContent from './problemContent';
import { css } from '@style/css';

const style = css({
  display: 'flex',
});

const ContestPage = () => {
  const [targetId, setTargetId] = useState(6);
  const targetProblem = mokData.problems.find((problem) => problem.id === targetId);
  const [code, onChangeCode] = useState(
    localStorage.getItem('myValue') || targetProblem?.solutionCode,
  );

  return (
    <div className={style}>
      <ProblemContent content={targetProblem}></ProblemContent>
      <div>
        <Editor code={code} setCode={onChangeCode}></Editor>
      </div>
    </div>
  );
};

export default ContestPage;
