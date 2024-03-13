import { useEffect, useMemo, useState } from 'react';

import evaluator from '@/modules/evaluator';

import type { SimulationInput, SimulationResult } from './types';

function getMemoryUsage(startMemory: string, endMemory: string) {
  const memoryIdx = 20;
  function filteringMemoryInfo(memoryInfo: string) {
    return memoryInfo.split('\n').filter((line) => line.includes('memory used'))[0];
  }
  function parsingMemoryInfo(memoryInfo: string) {
    return filteringMemoryInfo(memoryInfo).split(' ')[memoryIdx];
  }

  return parseInt(parsingMemoryInfo(endMemory)) - parseInt(parsingMemoryInfo(startMemory));
}

export const useSimulation = (testcases: SimulationInput[], tabIndex = 0) => {
  const [inputs, setInputs] = useState<SimulationInput[]>([]);
  const [results, setResults] = useState<SimulationResult[]>([]);

  const isRunning = useMemo(() => {
    return results.some((result) => !result.isDone);
  }, [results]);

  function setupTestcase(testcases: SimulationInput[]) {
    setInputs([...testcases]);
    setResults(testcases.map(createResult));
  }

  useEffect(() => {
    setupTestcase(testcases);
  }, [tabIndex, testcases]);

  useEffect(() => {
    const unsubscriber = evaluator.subscribe(
      ({ result: output, error, task, logs, time, startMemory, endMemory }) => {
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
              time,
              memory: getMemoryUsage(startMemory, endMemory),
            };
          });
        });
      },
    );

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
  return { ...input, isDone: true, output: '', logs: [], time: 0, memory: 0 };
};
