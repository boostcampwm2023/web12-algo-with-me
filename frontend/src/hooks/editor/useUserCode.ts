import { useEffect, useMemo, useState } from 'react';

import { CompetitionProblem } from '@/apis/problems';
import { isNil } from '@/utils/type';

type JSONType =
  | string
  | number
  | boolean
  | null
  | undefined
  | JSONType[]
  | { [key: string]: JSONType };

interface UseUserCode {
  userId: string;
  problem: CompetitionProblem;
  competitionId: number;
  currentProblemIndex: number;
  save: (key: string, origin: JSONType) => void;
  getTarget: (keys: string[]) => JSONType;
}

interface Origin {
  [key: string]: { [key: number]: string };
}

export function useUserCode({
  userId,
  problem,
  competitionId,
  currentProblemIndex,
  save,
  getTarget,
}: UseUserCode) {
  const [code, setCode] = useState<string>(problem.solutionCode);
  const [oldProblemIndex, setOldProblemIndex] = useState<number>(-1);

  const localStorageKey = 'savedCode';
  const competitionKey = useMemo(() => `${competitionId}|${userId}`, [competitionId, userId]);

  useEffect(() => {
    // 최초에 localStorage에 저장할 객체 만들기.
    if (competitionKey === '|') return;
    if (!isNil(getTarget([localStorageKey]))) return;
    save(localStorageKey, { [competitionKey]: {} });
  }, [competitionKey]);

  useEffect(() => {
    const targetCode = getTarget([localStorageKey, competitionKey, String(currentProblemIndex)]);

    if (typeof targetCode === 'string') {
      setCode(targetCode);
    } else {
      setCode(problem.solutionCode);
    }
  }, [problem]);

  useEffect(() => {
    const origin = getTarget([localStorageKey]) as Origin;

    if (oldProblemIndex !== currentProblemIndex) {
      // oldProblemIndex와 currentProblemIndex가 다르다면
      // 문제를 클릭만 한 경우기 때문에 localStorage에 저장하게 되면
      // 예전 번호가 현재 번호를 덮어쓰게 됨.
      setOldProblemIndex(currentProblemIndex);
      return;
    }

    if (code === problem.solutionCode) return;

    // oldProblemIndex는와 currentProblemIndex가 같다면
    // 해당 페이지 내에서 특정한 코드 변경이 있었다는 것을 의미하니,
    // 변경 사항을 저장할 필요가 있다.
    origin[competitionKey][currentProblemIndex] = code;
    save(localStorageKey, origin);
  }, [code, currentProblemIndex]);

  return { code, setCode };
}
