import { css } from '../../../styled-system/css';
import Loading from './Loading';
import ResultInfo from './ResultInfo';

interface SubMitResult {
  contestId: number;
  problemId: number;
  testcaseId: number;
  isCorrect: string;
  elapsedTime: number;
  memoryUsage: number;
}

const resultLiStyle = css({
  width: '100%',
  padding: '4px',
  display: 'flex',
  height: '32px',
  gap: '8px',
});

const resultPStyle = css({
  minWidth: '120px',
});

export default function ResultLi({
  isLoaded,
  submitResult,
  index,
}: {
  isLoaded: boolean;
  submitResult: SubMitResult;
  index: number;
}) {
  return (
    <li className={resultLiStyle}>
      <p className={resultPStyle}>테스트 케이스 {index + 1} </p>
      <section>
        {isLoaded ? (
          <ResultInfo submitResult={submitResult} />
        ) : (
          <Loading color="#e15b64" width="100%" height="32px" />
        )}
      </section>
    </li>
  );
}
