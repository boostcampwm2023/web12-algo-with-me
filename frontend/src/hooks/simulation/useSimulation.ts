import { useEffect, useMemo, useState } from 'react';

import evaluator from '@/modules/evaluator';

import type { SimulationInput, SimulationResult } from './types';

export const useSimulation = (testcases: SimulationInput[]) => {
  const [inputs, setInputs] = useState<SimulationInput[]>([]);
  const [results, setResults] = useState<SimulationResult[]>([]);

  const isRunning = useMemo(() => {
    return results.some((result) => !result.isDone);
  }, [results]);

  function setupTestcase(testcases: SimulationInput[]) {
    setInputs(testcases);
    setResults(testcases.map(createResult));
  }

  useEffect(() => {
    setupTestcase(testcases);
  }, [testcases]);

  useEffect(() => {
    const unsubscriber = evaluator.subscribe(({ result: output, error, task, logs }) => {
      if (!task) return;

      setResults((results) => {
        return results.map((result) => {
          if (result.id !== task.clientId) return result;

          if (error) {
            return {
              ...result,
              isDone: true,
              output: `${error.name}: ${error.message} \n${error.stack}`,
              logs,
            };
          }
          return {
            ...result,
            isDone: true,
            output,
            logs,
          };
        });
      });
    });

    return () => {
      unsubscriber();
    };
  }, []);

  function run(code: string) {
    const tasks = inputs.map(({ id, input }) => evaluator.createEvalMessage(id, code, input));

    const isRequestSuccess = evaluator.evaluate(tasks);

    if (!isRequestSuccess) {
      return;
    }

    setResults((results) => {
      return results
        .map((result, index) => ({
          ...result,
          input: inputs[index].input,
        }))
        .map(toEvaluatingState);
    });
  }

  function changeInputs(inputs: SimulationInput[]) {
    setupTestcase(inputs);
  }

  function cancel() {
    evaluator.cancelEvaluation();
  }

  return {
    inputs,
    results,
    isRunning,
    run,
    cancel,
    changeInputs,
  };
};

const toEvaluatingState = (simulation: SimulationResult) => {
  return {
    ...simulation,
    output: '계산중...',
    isDone: false,
  };
};

const createResult = (input: SimulationInput) => {
  return { ...input, isDone: true, output: '', logs: [] };
};
