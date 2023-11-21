import { css } from '@style/css';

import { useState } from 'react';

import ContestBreadCrumb from '@/components/Contest/ContestBreadCrumb';
import Editor from '@/components/Editor/Editor';
import ProblemViewer from '@/components/Problem/ProblemViewer';
import SimulatorList from '@/components/Simulation/SimulatorList';
import SubmissionResult from '@/components/SubmissionResult';
import { SITE } from '@/constants';
import { useSimulations } from '@/hooks/simulation/useSimulations';
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

export default function ContestPage() {
  const CONTEST_NAME = 'Test'; // api로 받을 정보
  const { testCases, runSimulation, changeParam } = useSimulations();
  const [currentProblemId] = useState(INITIAL_PROBLEM_ID);
  const targetProblem =
    mockData.problems.find((problem) => problem.id === currentProblemId) || notFoundProblem;
  const [code, setCode] = useState<string>(targetProblem.solutionCode);

  const handleChangeCode = (newCode: string) => {
    setCode(newCode);
  };

  const handleTestExec = () => {
    runSimulation(code);
  };

  const handleChangeParam = (index: number, newParam: string) => {
    changeParam(index, newParam);
  };

  const crumbs = [SITE.NAME, CONTEST_NAME, targetProblem.title];

  return (
    <main className={style}>
      <ContestBreadCrumb crumbs={crumbs} />
      <section>
        <span className={problemTitleStyle}>{targetProblem.title}</span>
      </section>
      <section className={rowListStyle}>
        <ProblemViewer content={targetProblem.content}></ProblemViewer>
        <div className={colListStyle}>
          <Editor code={code} onChangeCode={handleChangeCode}></Editor>
          <SimulatorList
            testCases={testCases}
            onChangeParam={handleChangeParam}
            onTestExec={handleTestExec}
          ></SimulatorList>
        </div>
      </section>
      <section>
        <SubmissionResult></SubmissionResult>
      </section>
    </main>
  );
}

const style = css({
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
});

const rowListStyle = css({
  display: 'flex',
});

const colListStyle = css({
  display: 'flex',
  flexDirection: 'column',
});

const problemTitleStyle = css({
  display: 'inline-block',
  height: '50px',
  padding: '10px',
  borderBottom: '2px solid white',
});
