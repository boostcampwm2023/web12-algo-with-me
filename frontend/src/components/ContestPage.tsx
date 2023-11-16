import { css } from '@style/css';

import { useEffect, useState } from 'react';

import evaluator from '@/modules/evaluator';

import mockData from '../mockData.json';
import Editor from './Editor';
import ProblemContent from './ProblemContent';
import Tester from './Tester';

type TestCase = {
  param: string;
  result: unknown;
};
        
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

  return (
    <div className={layout}>
      <ProblemContent content={targetProblem}></ProblemContent>
      <div>
        <Editor code={code} onChangeCode={handleChangeCode} />
        <button onClick={handleTestExec}>테스트 실행</button>
        {testCases.map((tc, index) => (
          <Tester
            param={tc.param}
            result={tc.result}
            onChangeParam={(param: string) => handleChangeParam(index, param)}
            key={index}
          ></Tester>
        ))}
      </div>
    </div>
  );
}

const toEvaluatingState = (testcase: TestCase) => {
  return {
    ...testcase,
    result: '계산중...',
  };
};

const layout = css({
  display: 'flex',
});
