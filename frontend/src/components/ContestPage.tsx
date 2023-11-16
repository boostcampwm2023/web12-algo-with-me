import { css } from '@style/css';

import { useState } from 'react';

import mockData from '../mockData.json';
import Editor from './Editor';
import ProblemContent from './ProblemContent';
import Tester from './Tester';

const notFoundProblem = {
  title: 'Problem Not Found',
  timeLimit: 0,
  memoryLimit: 0,
  content: 'The requested problem could not be found.',
  solutionCode: '',
  testcases: [],
  createdAt: new Date().toISOString(),
};

const INITIAL_PROBLEM_ID = 6;

export default function ContestPage() {
  const [currentProblemId, setcurrentProblemId] = useState(INITIAL_PROBLEM_ID);
  const targetProblem =
    mockData.problems.find((problem) => problem.id === currentProblemId) || notFoundProblem;
  const [code, setCode] = useState<string>(targetProblem.solutionCode);

  const handleChangeCode = (newCode: string) => {
    setCode(newCode);
  };

  return (
    <div className={layout}>
      <ProblemContent content={targetProblem}></ProblemContent>
      <div>
        <Editor code={code} onChangeCode={handleChangeCode} />
        <Tester code={code}></Tester>
      </div>
    </div>
  );
}

const layout = css({
  display: 'flex',
});
