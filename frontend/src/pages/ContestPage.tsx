import { css } from '@style/css';

import { useEffect, useState } from 'react';

import ContestBreadCrumb from '@/components/Contest/ContestBreadCrumb';
import Editor from '@/components/Editor/Editor';
import ProblemViewer from '@/components/Problem/ProblemViewer';
import SimulatorList from '@/components/Simulation/SimulatorList';
import type { TestCase } from '@/components/Simulation/types';
import SubmissionResult from '@/components/SubmissionResult';
import { SITE } from '@/constants';
import mockData from '@/mockData.json';
import evaluator from '@/modules/evaluator';

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

  const [currentProblemId] = useState(INITIAL_PROBLEM_ID);
  const targetProblem =
    mockData.problems.find((problem) => problem.id === currentProblemId) || notFoundProblem;
  const [code, setCode] = useState<string>(targetProblem.solutionCode);
  const [testCases, setTestCases] = useState<TestCase[]>([
    { param: '', result: '' },
    { param: '', result: '' },
    { param: '', result: '' },
    { param: '', result: '' },
    { param: '', result: '' },
  ]);

  const handleChangeCode = (newCode: string) => {
    setCode(newCode);
  };

  useEffect(() => {
    return evaluator.subscribe(({ result, task }) => {
      if (!task) return;

      const taskId = task.clientId;

      const evaluatedTestcase = testCases.find((_, index) => index === taskId);
      if (evaluatedTestcase) {
        evaluatedTestcase.result = String(result);
      }

      setTestCases((oldTestCases) => {
        return oldTestCases.map((tc, index) => {
          if (index !== taskId) return tc;

          return {
            ...tc,
            result,
          };
        });
      });
    });
  }, []);

  const handleTestExec = () => {
    setTestCases((oldTestCases) => {
      return oldTestCases.map(toEvaluatingState);
    });

    const tasks = testCases.map((tc, index) => evaluator.createEvalMessage(index, code, tc.param));

    evaluator.evaluate(tasks);
  };

  const handleChangeParam = (index: number, newParam: string) => {
    const changedTestCase = testCases.find((_, i) => i === index);
    if (changedTestCase) {
      changedTestCase.param = newParam;
    }
    setTestCases([...testCases]);
  };

  const crumbs = [SITE.NAME, CONTEST_NAME, targetProblem.title];

  return (
    <main className={style}>
      <ContestBreadCrumb crumbs={crumbs} />
      <section>
        <span className={problemTitleStyle}>{targetProblem.title}</span>
      </section>
      <section className={rowListStyle}>
        <ProblemViewer content={targetProblem.content} />
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

const toEvaluatingState = (testcase: TestCase) => {
  return {
    ...testcase,
    result: '계산중...',
  };
};

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
