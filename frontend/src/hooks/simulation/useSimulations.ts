import { useEffect, useState } from 'react';

import type { TestCase } from '@/components/Simulation/types';
import evaluator from '@/modules/evaluator';

export const useSimulations = () => {
  const [testCases, setTestCases] = useState<TestCase[]>([
    { param: '', result: '' },
    { param: '', result: '' },
    { param: '', result: '' },
    { param: '', result: '' },
    { param: '', result: '' },
  ]);

  useEffect(() => {
    return evaluator.subscribe(({ result, error, task }) => {
      if (!task) return;

      const taskId = task.clientId;

      setTestCases((oldTestCases) => {
        return oldTestCases.map((tc, index) => {
          if (index !== taskId) return tc;

          if (error) {
            return {
              ...tc,
              result: `${error.name}: ${error.message} \n${error.stack}`,
            };
          }
          return {
            ...tc,
            result,
          };
        });
      });
    });
  }, []);

  function runSimulation(code: string) {
    const tasks = testCases.map((tc, index) => evaluator.createEvalMessage(index, code, tc.param));

    const isRequestSuccess = evaluator.evaluate(tasks);
    if (isRequestSuccess) {
      setTestCases((oldTestCases) => {
        return oldTestCases.map(toEvaluatingState);
      });
    }
  }

  function changeParam(index: number, newParam: string) {
    const changedTestCase = testCases.find((_, i) => i === index);
    if (changedTestCase) {
      changedTestCase.param = newParam;
    }
    setTestCases([...testCases]);
  }

  return {
    testCases,
    runSimulation,
    changeParam,
  };
};

const toEvaluatingState = (testcase: TestCase) => {
  return {
    ...testcase,
    result: '계산중...',
  };
};
