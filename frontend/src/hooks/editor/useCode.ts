import { useContext, useEffect, useMemo, useState } from 'react';

import AuthContext from '@/components/Auth/AuthContext';
import { isNil } from '@/utils/type';

export function useCode(solutionCode: string, competitionId: number, currentProblemIndex: number) {
  const [code, setCode] = useState<string>('');
  const [oldProblemIndex, setOldProblemIndex] = useState<number>(0);

  const { email } = useContext(AuthContext);
  const localStorageKey = 'savedCode';
  const competitionKey = useMemo(() => `${competitionId}|${email}`, [competitionId, email]);

  const getSavedInfo = (localStorageKey: string, competitionKey: string) => {
    const originObj = JSON.parse(localStorage.getItem(localStorageKey) as 'object');
    const targetCode = originObj[competitionKey][currentProblemIndex];
    return { targetCode, originObj };
  };
  useEffect(() => {
    // 최초에 localStorage에 저장할 객체 만들기.
    if (competitionKey === '|') return;
    const savedCodeObj = JSON.stringify({ [competitionKey]: {} });
    localStorage.setItem(localStorageKey, savedCodeObj);
  }, [competitionKey]);

  useEffect(() => {
    // 빈 객체거나 code의 초기값이라면 solutionCode라는 초기 값으로 셋팅
    const { targetCode, originObj } = getSavedInfo(localStorageKey, competitionKey);
    if (!isNil(targetCode) && targetCode !== '') {
      setCode(originObj[competitionKey][currentProblemIndex]);
    } else {
      setCode(solutionCode);
    }
  }, [solutionCode, competitionKey]);

  useEffect(() => {
    if (oldProblemIndex !== currentProblemIndex) {
      // oldProblemIndex와 currentProblemIndex가 다르다면
      // 문제를 클릭만 한 경우기 때문에 localStorage에 저장할 필요가 없다.
      setOldProblemIndex(currentProblemIndex);
      return;
    }
    // oldProblemIndex는와 currentProblemIndex가 같다면
    // 해당 페이지 내에서 특정한 코드 변경이 있었다는 것을 의미하니,
    // 변경 사항을 저장할 필요가 있다.
    const { originObj } = getSavedInfo(localStorageKey, competitionKey);
    originObj[competitionKey][currentProblemIndex] = code;
    localStorage.setItem(localStorageKey, JSON.stringify(originObj));
  }, [code, currentProblemIndex]);

  return { code, setCode };
}
