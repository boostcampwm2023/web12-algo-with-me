import { useEffect, useMemo, useState } from 'react';

import evaluator from '@/modules/evaluator';

import type { SimulationInput, SimulationResult } from './types';

export const useSimulation = () => {
  const [inputs, setInputs] = useState<SimulationInput[]>([
    { id: 1, input: '' },
    { id: 2, input: '' },
    { id: 3, input: '' },
    { id: 4, input: '' },
    { id: 5, input: '' },
  ]);
  const [results, setResults] = useState<SimulationResult[]>([
    { id: 1, isDone: true, input: '', output: '' },
    { id: 2, isDone: true, input: '', output: '' },
    { id: 3, isDone: true, input: '', output: '' },
    { id: 4, isDone: true, input: '', output: '' },
    { id: 5, isDone: true, input: '', output: '' },
  ]);
  const isRunning = useMemo(() => {
    return results.some((result) => !result.isDone);
  }, [results]);

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
    setInputs([...inputs]);
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
