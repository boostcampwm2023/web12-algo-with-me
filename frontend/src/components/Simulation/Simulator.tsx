import { cx } from '@style/css';

import { HTMLAttributes, useContext } from 'react';

import { SimulationInput, useSimulation } from '@/hooks/simulation';

import { Button, Modal } from '../Common';
import { SimulationInputModal } from './SimulationInputModal';
import { SimulationResultList } from './SimulationResultList';

const ADD_SIMULATION = '테스트 케이스 추가하기';

interface Props extends HTMLAttributes<HTMLDivElement> {
  code: string;
}
export function Simulator({ className, code, ...props }: Props) {
  const simulation = useSimulation();
  const modal = useContext(Modal.Context);

  const handleSimulate = () => {
    simulation.run(code);
  };

  const handleSimulationCancel = () => {
    simulation.cancel();
  };

  const handleSaveSimulationInputs = (simulationInputs: SimulationInput[]) => {
    simulation.changeInputs(simulationInputs);
  };

  function handleOpenModal() {
    modal.open();
  }

  return (
    <div className={cx(className)} {...props}>
      <SimulationResultList resultList={simulation.results}></SimulationResultList>
      <Button onClick={handleOpenModal}>{ADD_SIMULATION}</Button>
      <ExecButton
        isRunning={simulation.isRunning}
        onExec={handleSimulate}
        onCancel={handleSimulationCancel}
      />
      <SimulationInputModal
        simulationInputs={simulation.inputs}
        onSave={handleSaveSimulationInputs}
      ></SimulationInputModal>
    </div>
  );
}

interface ExecButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isRunning: boolean;
  onExec: () => void;
  onCancel: () => void;
}

const ExecButton = ({ isRunning, onExec, onCancel }: ExecButtonProps) => {
  const RUN_SIMULATION = '테스트 실행';
  const CANCEL_SIMULATION = '실행 취소';

  if (isRunning) {
    return <Button onClick={onCancel}>{CANCEL_SIMULATION}</Button>;
  } else {
    return <Button onClick={onExec}>{RUN_SIMULATION}</Button>;
  }
};
