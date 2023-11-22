import { css } from '@style/css';

import { useCallback, useEffect, useState } from 'react';

import ResultInfoWrapper from './ResultInfoWrapper.tsx';
import type { SubmitResult } from './types.ts';

interface TestcaseLoadInfo {
  [index: string]: boolean;
}

interface Props {
  testcaseNum: number;
  onSetIsAllTestDone: () => void;
}

export default function ResultList({ testcaseNum, onSetIsAllTestDone }: Props) {
  const [submitResult, setSubmitResult] = useState<SubmitResult[]>([]);

  const [testcaseLoadInfo, setTestcaseLoadInfo] = useState<TestcaseLoadInfo>({});
  // TODO API 서버가 구축되면 websocket으로 변경
  // msw에서 websocket을 사용하지 못하기 때문에 request를 여러번 보내기로 함.
  // 테스트 케이스 수를 서버에서 알려줘야 함. 10개면 10개 바로 loading 으로 만들고 데이터 받아야함..

  // 첫 테스트 버튼 누르면 isLoaded 값 초기화
  useEffect(() => {
    const testcaseLoadInfo: TestcaseLoadInfo = {};
    for (let testcaseId = 1; testcaseId <= testcaseNum; testcaseId++) {
      testcaseLoadInfo[testcaseId] = false;
    }
    setTestcaseLoadInfo({ ...testcaseLoadInfo });
  }, [testcaseNum]);

  // 모든 테스트 케이스에 해당하는 값들이 도착했는지 서버는 체크 안함
  // 서버는 그냥 데이터를 던지기 때문에 response가 오면 프론트 단에서 계속적으로 체크해줘야함

  useEffect(() => {
    Array.from({ length: testcaseNum }, async (_, i) => {
      try {
        const response = await fetch('/algo-with-me-api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            solutionCode: 'function add(p1,p2){return p1+p2};',
            testcaseId: i + 1,
          }),
        });
        const result = await response.json();
        const { testcaseId } = result;
        setTestcaseLoadInfo((prevState) => ({ ...prevState, [testcaseId]: true }));
        setSubmitResult((prevState) => prevState.concat(result));
      } catch (error) {
        console.warn(error);
      }
    });
  }, [testcaseNum]);

  const resultFilter = useCallback(
    (testcaseId: number) => {
      return submitResult.find((result) => result.testcaseId === testcaseId) as SubmitResult;
    },
    [submitResult],
  );

  useEffect(() => {
    const testcaseIds = Object.keys(testcaseLoadInfo);
    if (testcaseIds.length === 0) return;
    if (!testcaseIds.some((key) => testcaseLoadInfo[key] === false)) {
      onSetIsAllTestDone();
    }
  }, [testcaseLoadInfo, onSetIsAllTestDone]);

  return (
    <ul className={resultListStyle}>
      {Object.keys(testcaseLoadInfo).map((key, i) => (
        <li key={i}>
          <ResultInfoWrapper
            isLoaded={testcaseLoadInfo[key]}
            submitResult={resultFilter(Number(key))}
            index={i}
          />
        </li>
      ))}
    </ul>
  );
}
const resultListStyle = css({
  border: '1.5px solid #909090',
  width: '100%',
  padding: '4px',
});

export { type SubmitResult };
