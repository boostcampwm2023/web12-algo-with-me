import Loading from './Loading';
import type { ScoreResult, SubmitState } from './types';
import { SUBMIT_STATE } from './types';

interface Props {
  score?: ScoreResult;
  submitState: SubmitState;
}

export default function Score({ score, submitState }: Props) {
  if (submitState === SUBMIT_STATE.notSubmitted) {
    return '';
  }

  if (submitState === SUBMIT_STATE.loading) {
    return <Loading color="#e15b64" size="2rem" />;
  }

  return (
    <div>
      <p>결과: {score?.result ?? ''}</p>
      <p>출력: {score?.stdOut ?? ''}</p>
    </div>
  );
}
