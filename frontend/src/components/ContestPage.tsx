import { useEffect, useState } from 'react';

import evaluator from '@/modules/evaluator';

import Editor from './Editor';
import Tester from './Tester';

type TestCase = {
  param: string;
  result: unknown;
};
const ContestPage = () => {
  const [code, setCode] = useState<string>(
    localStorage.getItem('myValue') || 'function solution() {\n\n}',
  );
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
    evaluator.subscribe((data) => {
      const { result, task } = data;
      if (!task) return;

      const taskId = task.clientId;

      setTestCases((oldTestCases) => {
        return [...oldTestCases].map((tc, index) => {
          if (index !== taskId) return tc;

          tc.result = result;

          return tc;
        });
      });
    });
  }, []);

  const handleTestExec = () => {
    setTestCases((oldTestCases) => {
      return oldTestCases.map(toEvaluatingState);
    });

    const tasks = testCases.map((tc, index) => evaluator.createEvalMessage(index, code, tc.param));

    evaluator.safeEval(tasks);
  };

  const handleChangeParam = (index: number, newParam: string) => {
    setTestCases((oldTestCases) => {
      const newTestCase = { param: newParam, result: oldTestCases[index].result };

      return oldTestCases
        .slice(0, index)
        .concat([newTestCase])
        .concat(oldTestCases.slice(index + 1));
    });
  };

  return (
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
  );
};

const toEvaluatingState = (testcase: TestCase) => {
  return {
    ...testcase,
    result: '계산중...',
  };
};

export default ContestPage;
