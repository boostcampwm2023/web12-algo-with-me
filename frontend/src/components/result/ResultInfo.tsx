// import { css } from '../../../styled-system/css';
import { css } from '@style/css';

interface SubMitResult {
  contestId: number;
  problemId: number;
  testcaseId: number;
  isCorrect: string;
  elapsedTime: number;
  memoryUsage: number;
}
// 맞다 blue
const correctColor = css({
  color: 'blue',
});
// 틀리다 red, 시간초과 red
const inCorrectColor = css({
  color: 'red',
});

export default function ResultInfo({ submitResult }: { submitResult: SubMitResult }) {
  const { isCorrect, elapsedTime, memoryUsage } = submitResult;
  return (
    <>
      {isCorrect === '오답' ? (
        <span className={inCorrectColor}>
          실패 ({elapsedTime}ms ,{memoryUsage}MB)
        </span>
      ) : isCorrect === '정답' ? (
        <span className={correctColor}>
          {' '}
          정답 ({elapsedTime}ms ,{memoryUsage}MB)
        </span>
      ) : (
        <span className={inCorrectColor}>실패 (시간 초과)</span>
      )}
    </>
  );
}
