import { cx } from '@style/css';

import { HTMLAttributes, useContext } from 'react';

import type { ProblemId } from '@/apis/problems';
import type { SubmissionForm } from '@/hooks/competition';
import { isNil } from '@/utils/type';

import { Button } from '../Common';
import { CompetitionContext } from '../Competition/CompetitionContext';
import { SubmissionResult } from './SubmissionResult';

interface Props extends HTMLAttributes<HTMLDivElement> {
  code: string;
  problemId?: ProblemId;
}

export function Submission({ code, problemId, className, ...props }: Props) {
  const { competition, submitSolution } = useContext(CompetitionContext);
  function handleSubmitSolution() {
    if (isNil(problemId)) {
      console.error('존재하지 않는 문제입니다.');
      return;
    }

    const form = {
      problemId,
      code,
      competitionId: competition.id,
    } satisfies SubmissionForm;

    submitSolution(form);
  }

  return (
    <div className={cx(className)} {...props}>
      <SubmissionResult></SubmissionResult>
      <Button onClick={handleSubmitSolution}>제출하기</Button>
    </div>
  );
}
