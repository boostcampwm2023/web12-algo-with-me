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
    return evaluator.subscribe(({ result, task }) => {
      if (!task) return;

      const taskId = task.clientId;

      const evaluatedTestcase = testCases.find((_, index) => index === taskId);
      if (evaluatedTestcase) {
        evaluatedTestcase.result = String(result);
      }

      setTestCases([...testCases]);
    });
  }, []);

  const handleTestExec = () => {
    setTestCases(testCases.map(changeToEvaluating));

    const tasks = testCases.map((tc, index) => evaluator.createEvalMessage(index, code, tc.param));

    evaluator.safeEval(tasks);
  };

  const handleChangeParam = (index: number, newParam: string) => {
    const changedTestCase = testCases.find((_, i) => i === index);
    if (changedTestCase) {
      changedTestCase.param = newParam;
    }
    setTestCases([...testCases]);
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

const changeToEvaluating = (testcase: TestCase) => {
  return {
    ...testcase,
    result: '평가중...',
  };
};

export default ContestPage;
