import { css } from '@style/css';

import Loading from './Loading';

export default function ResultDetailInfo({ isAllTestDone }: { isAllTestDone: boolean }) {
  // Todo 계산 로직은 웹소켓 논의 후에 추가
  return (
    <section>
      <header className={resultDetailTitle}>채점 결과</header>
      {isAllTestDone ? (
        <>
          <p className={resultDetailTextStyle}>정확성: 40.0</p>
          <p className={resultDetailTextStyle}>합계: 40.0 / 100.0 </p>
        </>
      ) : (
        <Loading color="gray" size="2rem" />
      )}
    </section>
  );
}
const resultDetailTitle = css({
  margin: '0.5rem 0',
});

const resultDetailTextStyle = css({
  fontSize: '0.8rem',
  color: 'lightgray',
});
