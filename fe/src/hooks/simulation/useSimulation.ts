import { useEffect, useMemo, useState } from 'react';

import evaluator, { TaskEndMessage } from '@/modules/evaluator';
import { createKey } from '@/utils/lru';
import { isNil } from '@/utils/type';

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

function resultToSimulationResult(
  result: SimulationResult,
  { result: output, logs, time, startMemory, endMemory, error }: TaskEndMessage,
) {
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

  console.log(results);

  useEffect(() => {
    setupTestcase(testcases);
  }, [tabIndex, testcases]);

  useEffect(() => {
    const unsubscriber = evaluator.subscribe((evalResult) => {
      if (isNil(evalResult.task)) return;

      setResults((results) => {
        return results.map((result) => {
          if (result.id !== evalResult.task!.clientId) return result;
          return resultToSimulationResult(result, evalResult);
        });
      });
    });

    return () => {
      unsubscriber();
    };
  }, []);

  async function run(code: string) {
    setResults((results) => {
      return results
        .map((result, index) => ({
          ...result,
          input: inputs[index].input,
        }))
        .map(toEvaluatingState);
    });

    const keys = await Promise.all(inputs.map(({ input }) => createKey(code, input)));

    const todoTask: SimulationInput[] = [];

    keys.forEach((key, index) => {
      const cache = evaluator.getCache(key);
      if (cache === null) todoTask.push(inputs[index]);
      else {
        setResults((results) => {
          return results.map((result) => {
            if (result.id !== inputs[index].id) return result;
            return resultToSimulationResult(result, cache);
          });
        });
      }
    });

    const tasks = todoTask.map(({ id, input }) => evaluator.createEvalMessage(id, code, input));

    const isRequestSuccess = evaluator.evaluate(tasks);

    if (!isRequestSuccess) {
      return;
    }
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
