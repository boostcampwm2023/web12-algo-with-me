import { css } from '@style/css';

import type { HTMLAttributes } from 'react';
import { useContext } from 'react';

import type { ProblemId } from '@/apis/problems';
import type { SubmissionForm } from '@/hooks/competition';
import { isNil } from '@/utils/type';

import { CompetitionContext } from './CompetitionContext';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  problemId?: ProblemId;
  code: string;
}

export function CompetitionSubmitButton({ problemId, code }: Props) {
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
    console.log(form);
    submitSolution(form);
  }

  return (
    <button className={execButtonStyle} onClick={handleSubmitSolution}>
      제출하기
    </button>
  );
}

const execButtonStyle = css({
  color: 'black',
});
