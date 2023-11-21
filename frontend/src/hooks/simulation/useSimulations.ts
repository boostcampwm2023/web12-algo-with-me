import { useEffect, useMemo, useState } from 'react';

import evaluator from '@/modules/evaluator';

import type { SimulationInput, SimulationResult } from './types';

export const useSimulations = () => {
  const [simulations, setSimulations] = useState<SimulationInput[]>([
    { id: 1, input: '' },
    { id: 2, input: '' },
    { id: 3, input: '' },
    { id: 4, input: '' },
    { id: 5, input: '' },
  ]);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([
    { id: 1, isDone: true, input: '', output: '' },
    { id: 2, isDone: true, input: '', output: '' },
    { id: 3, isDone: true, input: '', output: '' },
    { id: 4, isDone: true, input: '', output: '' },
    { id: 5, isDone: true, input: '', output: '' },
  ]);
  const isSimulating = useMemo(() => {
    return simulationResults.some((result) => !result.isDone);
  }, [simulationResults]);

  useEffect(() => {
    return evaluator.subscribe(({ result, error, task }) => {
      if (!task) return;

      setSimulationResults((simulations) => {
        return simulations.map((simul) => {
          if (simul.id !== task.clientId) return simul;

          if (error) {
            return {
              ...simul,
              isDone: true,
              output: `${error.name}: ${error.message} \n${error.stack}`,
            };
          }
          return {
            ...simul,
            isDone: true,
            output: result,
          };
        });
      });
    });
  }, []);

  function runSimulation(code: string) {
    const tasks = simulations.map(({ id, input }) => evaluator.createEvalMessage(id, code, input));

    const isRequestSuccess = evaluator.evaluate(tasks);

    if (!isRequestSuccess) {
      return;
    }

    setSimulationResults((simulResults) => {
      return simulResults
        .map((simul, index) => ({
          ...simul,
          input: simulations[index].input,
        }))
        .map(toEvaluatingState);
    });
  }

  function changeInput(targetId: number, newParam: string) {
    const changedSimulation = simulations.find(({ id }) => id === targetId);
    if (changedSimulation) {
      changedSimulation.input = newParam;
    }
    setSimulations([...simulations]);
  }

  function cancelSimulation() {
    evaluator.cancelEvaluation();
  }

  return {
    simulations,
    simulationResults,
    isSimulating,
    runSimulation,
    cancelSimulation,
    changeInput,
  };
};

const toEvaluatingState = (simulation: SimulationResult) => {
  return {
    ...simulation,
    output: '계산중...',
    isDone: false,
  };
};
