import { css } from '@style/css';

import Loading from './Loading';

interface Props {
  isAllTestDone: boolean;
}

export default function ResultTotallInfo({ isAllTestDone }: Props) {
  // Todo 계산 로직은 웹소켓 논의 후에 추가
  return (
    <section>
      <header className={titleStyle}>채점 결과</header>
      {isAllTestDone ? (
        <>
          <p className={detailTextStyle}>정확성: 40.0</p>
          <p className={detailTextStyle}>합계: 40.0 / 100.0 </p>
        </>
      ) : (
        <Loading color="gray" size="2rem" />
      )}
    </section>
  );
}
const titleStyle = css({
  margin: '0.5rem 0',
});

const detailTextStyle = css({
  fontSize: '0.8rem',
  color: 'lightgray',
});
