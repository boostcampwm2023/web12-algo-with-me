import { css } from '@style/css';

import { useCallback, useState } from 'react';

import ResultList from './ResultList';
import ResultDetailInfo from './ResultTotalInfo';

export default function MswTestComponent() {
  const [isClicked, setIsClicked] = useState(false);
  const [isAllTestDone, setIsAllTestDone] = useState(false);

  const handleClickSubmit = useCallback(() => {
    setIsClicked(!isClicked);
  }, [isClicked]);

  return (
    <>
      <section className={resultWrapperStyle}>
        {!isClicked ? (
          <p>실행 결과가 여기에 표시됩니다.</p>
        ) : (
          <>
            <p>채점 결과는 다음과 같습니다.</p>
            <ResultList testcaseNum={10} onSetIsAllTestDone={setIsAllTestDone} />
            <ResultDetailInfo isAllTestDone={isAllTestDone} />
          </>
        )}
      </section>
      <button onClick={handleClickSubmit}>제출버튼</button>
    </>
  );
}

const resultWrapperStyle = css({
  padding: '24px',
  minHeight: '40vh',
  width: '80vw',
  backgroundColor: 'darkgray',
  margin: '0 auto',
});
