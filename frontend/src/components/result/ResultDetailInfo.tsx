import { css } from '../../../styled-system/css';
import Loading from './Loading';

const resultDetailTitle = css({
  margin: '0.5rem 0',
});

const resultDetailTextStyle = css({
  fontSize: '0.8rem',
  color: 'lightgray',
});

// interface SubMitResult {
//   contestId: number;
//   problemId: number;
//   testcaseId: number;
//   isCorrect: string;
//   elapsedTime: number;
//   memoryUsage: number;
// }

export default function ResultDetailInfo({ isAllTestDone }: { isAllTestDone: boolean }) {
  // Todo 계산로직을 module에 빼는 게 좋겠지?

  return (
    <section>
      <header className={resultDetailTitle}>채점 결과</header>
      {isAllTestDone ? (
        <>
          <p className={resultDetailTextStyle}>정확성: 40.0</p>
          <p className={resultDetailTextStyle}>합계: 40.0 / 100.0 </p>
        </>
      ) : (
        <Loading color="gray" width="2rem" height="2rem" />
      )}
    </section>
  );
}
