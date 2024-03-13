import { HTMLAttributes } from 'react';

import { Button } from '../Common';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  isRunning: boolean;
  onExec: () => void;
  onCancel: () => void;
}

export const SandboxSubmissionButton = ({ isRunning, onExec, onCancel }: Props) => {
  const RUN_SIMULATION = '제출 하기';
  const CANCEL_SIMULATION = '제출 취소';

  if (isRunning) {
    return (
      <Button theme="brand" onClick={onCancel}>
        {CANCEL_SIMULATION}
      </Button>
    );
  } else {
    return (
      <Button theme="brand" onClick={onExec}>
        {RUN_SIMULATION}
      </Button>
    );
  }
};
