import { useCallback, useState } from 'react';

import { css } from '../../../styled-system/css';
import ResultUl from './ResultUl';

const resultWrapperStyle = css({
  padding: '24px',
  minHeight: '40vh',
  width: '80vw',
  backgroundColor: 'darkgray',
  margin: '0 auto',
});

export default function MswTestComponent() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClickSubmit = useCallback(() => {
    setIsClicked(!isClicked);
  }, [isClicked]);

  return (
    <>
      <section className={resultWrapperStyle}>
        {!isClicked ? <p>실행 결과가 여기에 표시됩니다.</p> : <ResultUl testcaseNum={10} />}
      </section>
      <button onClick={handleClickSubmit}>제출버튼</button>
    </>
  );
}
