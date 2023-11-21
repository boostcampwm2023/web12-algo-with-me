import { useEffect, useState } from 'react';

import evaluator from '@/modules/evaluator';

export type Simulation = {
  param: string;
  result: unknown;
};

export const useSimulations = () => {
  const [simulations, setSimulations] = useState<Simulation[]>([
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

      setSimulations((oldSimulations) => {
        return oldSimulations.map((simul, index) => {
          if (index !== taskId) return simul;

          if (error) {
            return {
              ...simul,
              result: `${error.name}: ${error.message} \n${error.stack}`,
            };
          }
          return {
            ...simul,
            result,
          };
        });
      });
    });
  }, []);

  function runSimulation(code: string) {
    const tasks = simulations.map(({ param }, index) =>
      evaluator.createEvalMessage(index, code, param),
    );

    const isRequestSuccess = evaluator.evaluate(tasks);
    if (isRequestSuccess) {
      setSimulations((simulations) => {
        return simulations.map(toEvaluatingState);
      });
    }
  }

  function changeParam(index: number, newParam: string) {
    const changedSimulation = simulations.find((_, i) => i === index);
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
    runSimulation,
    cancelSimulation,
    changeParam,
  };
};

const toEvaluatingState = (simulation: Simulation) => {
  return {
    ...simulation,
    result: '계산중...',
  };
};
