import { useEffect, useState } from 'react';

import evaluator from '@/modules/evaluator';

export type Simulation = {
  id: number;
  param: string;
};

export type SimulationResult = {
  id: number;
  input: string;
  output: unknown;
};

export const useSimulations = () => {
  const [simulations, setSimulations] = useState<Simulation[]>([
    { id: 1, param: '' },
    { id: 2, param: '' },
    { id: 3, param: '' },
    { id: 4, param: '' },
    { id: 5, param: '' },
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
    const tasks = simulations.map(({ id, param }) => evaluator.createEvalMessage(id, code, param));

    const isRequestSuccess = evaluator.evaluate(tasks);
    if (isRequestSuccess) {
      setSimulationResults((simulResults) => {
        return simulResults
          .map((simul, index) => {
            return {
              ...simul,
              input: simulations[index].param,
            };
          })
          .map(toEvaluatingState);
      });
    }
  }

  function changeParam(targetId: number, newParam: string) {
    const changedSimulation = simulations.find(({ id }) => id === targetId);
    if (changedSimulation) {
      changedSimulation.param = newParam;
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
    changeParam,
  };
};

const toEvaluatingState = (simulation: SimulationResult) => {
  return {
    ...simulation,
    output: '계산중...',
  };
};
