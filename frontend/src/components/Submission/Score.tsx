import Loading from './Loading';
import type { ScoreResult } from './types';

interface Props {
  score: ScoreResult;
}

export default function Score({ score }: Props) {
  const { problemId, result, stdOut } = score;

  if (problemId < 0) {
    return <Loading color="#e15b64" size="2rem" />;
  }

  return (
    <div>
      <p>결과: {result}</p>
      <p>출력: {stdOut}</p>
    </div>
  );
}
