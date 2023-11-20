import { css } from '@style/css';

import Loading from './Loading';
import ResultInfo from './ResultInfo';
import type { SubmitResult } from './types';

interface Props {
  isLoaded: boolean;
  submitResult: SubmitResult;
  index: number;
}

export default function ResultInfoWrapper({ isLoaded, submitResult, index }: Props) {
  return (
    <section className={wrapperStyle}>
      <p className={testcaseTextStyle}>테스트 케이스 {index + 1} </p>
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

const wrapperStyle = css({
  width: '100%',
  padding: '4px',
  display: 'flex',
  height: '32px',
  gap: '8px',
});

const testcaseTextStyle = css({
  minWidth: '120px',
});
