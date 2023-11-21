import { css } from '@style/css';

import { useState } from 'react';

import ProblemViewer from '@/components/Problem/ProblemViewer';
import mockData from '@/mockData.json';

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

function ProblemPage() {
  const [currentProblemId] = useState(INITIAL_PROBLEM_ID);
  const targetProblem =
    mockData.problems.find((problem) => problem.id === currentProblemId) || notFoundProblem;

  return (
    <main className={style}>
      <span className={problemTitleStyle}>{targetProblem.title}</span>
      <ProblemViewer content={targetProblem.content} />
    </main>
  );
}

export default ProblemPage;

const style = css({
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
});

const problemTitleStyle = css({
  display: 'inline-block',
  height: '50px',
  padding: '10px',
  borderBottom: '2px solid white',
});
