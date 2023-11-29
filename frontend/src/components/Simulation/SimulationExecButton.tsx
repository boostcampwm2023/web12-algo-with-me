import { HTMLAttributes } from 'react';

import { Button } from '../Common';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  isRunning: boolean;
  onExec: () => void;
  onCancel: () => void;
}

export const SimulationExecButton = ({ isRunning, onExec, onCancel }: Props) => {
  const RUN_SIMULATION = '테스트 실행';
  const CANCEL_SIMULATION = '실행 취소';

  if (isRunning) {
    return <Button onClick={onCancel}>{CANCEL_SIMULATION}</Button>;
  } else {
    return <Button onClick={onExec}>{RUN_SIMULATION}</Button>;
  }
};
