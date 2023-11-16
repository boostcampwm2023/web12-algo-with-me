import { css } from '@style/css';

import Loading from './Loading';
import ResultInfo from './ResultDetailInfo';
import { type SubmitResult } from './ResultList';

export default function ResultLi({
  isLoaded,
  submitResult,
  index,
}: {
  isLoaded: boolean;
  submitResult: SubmitResult;
  index: number;
}) {
  return (
    <section className={resultLiStyle}>
      <p className={resultPStyle}>테스트 케이스 {index + 1} </p>
      <div>
        {isLoaded ? (
          <ResultInfo submitResult={submitResult} />
        ) : (
          <Loading color="#e15b64" size="2rem" />
        )}
      </div>
    </section>
  );
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
