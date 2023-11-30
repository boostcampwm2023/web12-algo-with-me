import { cx } from '@style/css';

import { HTMLAttributes, useContext } from 'react';

import { CompetitionId } from '@/apis/competitions';
import type { ProblemId } from '@/apis/problems';
import type { SubmissionForm } from '@/hooks/competition';
import { isNil } from '@/utils/type';

import { Button } from '../Common';
import { SocketContext } from '../Common/Socket/SocketContext';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  code: string;
  problemId?: ProblemId;
  competitionId: CompetitionId;
}

export function SubmissionButton({ code, problemId, competitionId, className, ...props }: Props) {
  const { socket, isConnected } = useContext(SocketContext);

  function handleSubmitSolution() {
    if (isNil(problemId)) {
      console.error('존재하지 않는 문제입니다.');
      return;
    }

    const form = {
      problemId,
      code,
      competitionId,
    } satisfies SubmissionForm;

    if (isNil(socket) || !isConnected) {
      alert('연결에 실패했습니다.');
      return;
    }

    socket.emit('submission', form);
  }

  return (
    <Button className={cx(className)} onClick={handleSubmitSolution} {...props}>
      제출하기
    </Button>
  );
}
