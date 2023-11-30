import { useEffect, useMemo, useState } from 'react';

import evaluator from '@/modules/evaluator';

import type { SimulationInput, SimulationResult } from './types';

export const useSimulation = (testcases: SimulationInput[]) => {
  const [inputs, setInputs] = useState<SimulationInput[]>([]);
  const [results, setResults] = useState<SimulationResult[]>([]);

  const isRunning = useMemo(() => {
    return results.some((result) => !result.isDone);
  }, [results]);

  useEffect(() => {
    setInputs(testcases);
    setResults(testcases.map(createResult));
  }, [testcases]);

  useEffect(() => {
    return evaluator.subscribe(({ result: output, error, task }) => {
      if (!task) return;

      setResults((results) => {
        return results.map((result) => {
          if (result.id !== task.clientId) return result;

          if (error) {
            return {
              ...result,
              isDone: true,
              output: `${error.name}: ${error.message} \n${error.stack}`,
            };
          }
          return {
            ...result,
            isDone: true,
            output,
          };
        });
      });
    });
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
    setInputs(inputs);
    setResults(inputs.map(createResult));
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
  return { ...input, isDone: true, output: '' };
};
