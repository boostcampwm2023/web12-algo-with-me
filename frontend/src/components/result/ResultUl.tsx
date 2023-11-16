import { useCallback, useEffect, useState } from 'react';

import { css } from '../../../styled-system/css';
import ResultLi from './ResultLi';

interface SubMitResult {
  contestId: number;
  problemId: number;
  testcaseId: number;
  isCorrect: string;
  elapsedTime: number;
  memoryUsage: number;
}

interface LoadedInfo {
  [index: string]: boolean;
}

const ulStyle = css({
  width: '100%',
  padding: '4px',
});

export default function ResultUl({ testcaseNum }: { testcaseNum: number }) {
  const [submitResult, setSubmitResult] = useState<SubMitResult[]>([]);

  const [isLoaded, setIsLoaded] = useState<LoadedInfo>({});
  // TODO API 서버가 구축되면 websocket으로 변경
  // msw에서 websocket을 사용하지 못하기 때문에 request를 여러번 보내기로 함.
  // 테케 수도 서버에서 알려줘야 함.

  const initLoadedInfo = useCallback(() => {
    const loadedInfo: LoadedInfo = {};
    for (let i = 1; i <= testcaseNum; i++) {
      loadedInfo[i] = false;
    }
    setIsLoaded(loadedInfo);
  }, [testcaseNum]);

  useEffect(() => {
    initLoadedInfo();
    Array.from({ length: testcaseNum }, (_, i) => {
      fetch('/algo-with-me-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          solutionCode: 'function add(p1,p2){return p1+p2};',
          testcaseId: i + 1,
        }),
      })
        .then((response) => {
          // if (!response.ok) throw new Error('msw get error');
          return response.json();
        })
        .then((result) => {
          const { testcaseId } = result;
          setIsLoaded((prevState) => ({ ...prevState, [testcaseId]: true }));
          setSubmitResult((prevState) => prevState.concat(result));
        });
    });
  }, [testcaseNum, initLoadedInfo]);

  const resultFilter = useCallback(
    (testcaseId: number) => {
      return submitResult.filter((result) => result.testcaseId === testcaseId)[0];
    },
    [submitResult],
  );

  return (
    <ul className={ulStyle}>
      {Object.keys(isLoaded).map((key, i) => (
        <ResultLi
          isLoaded={isLoaded[key]}
          submitResult={resultFilter(Number(key))}
          index={i}
          key={`testCase-list-${i}`}
        />
      ))}
    </ul>
  );
}
