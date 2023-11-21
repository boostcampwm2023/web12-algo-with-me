import { useEffect, useState } from 'react';

import evaluator from '@/modules/evaluator';

export type Simulation = {
  id: number;
  input: string;
};

export type SimulationResult = {
  id: number;
  input: string;
  output: unknown;
};

export const useSimulations = () => {
  const [simulations, setSimulations] = useState<Simulation[]>([
    { id: 1, input: '' },
    { id: 2, input: '' },
    { id: 3, input: '' },
    { id: 4, input: '' },
    { id: 5, input: '' },
  ]);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([
    { id: 1, input: '', output: '' },
    { id: 2, input: '', output: '' },
    { id: 3, input: '', output: '' },
    { id: 4, input: '', output: '' },
    { id: 5, input: '', output: '' },
  ]);

  useEffect(() => {
    return evaluator.subscribe(({ result, error, task }) => {
      if (!task) return;

      setSimulationResults((simulations) => {
        return simulations.map((simul) => {
          if (simul.id !== task.clientId) return simul;

          if (error) {
            return {
              ...simul,
              output: `${error.name}: ${error.message} \n${error.stack}`,
            };
          }
          return {
            ...simul,
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
    runSimulation,
    cancelSimulation,
    changeInput,
  };
};

const toEvaluatingState = (simulation: SimulationResult) => {
  return {
    ...simulation,
    output: '계산중...',
  };
};
