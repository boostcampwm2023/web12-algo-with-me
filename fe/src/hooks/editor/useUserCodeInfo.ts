import { useEffect, useMemo, useState } from 'react';

import { CompetitionProblem } from '@/apis/problems';
import { Dictionary, JSONType } from '@/types';
import { isDictionary, isNil } from '@/utils/type';

import type { LangaugeType } from './types';

interface UseUserCode {
  userId: string;
  problem: CompetitionProblem;
  competitionId: number;
  currentProblemIndex: number;
  defaultLanguage: LangaugeType;

  save: (key: string, origin: JSONType) => void;
}

interface Origin {
  [key: string]: { [key: number]: string };
}

export function useUserCodeInfo({
  userId,
  problem,
  competitionId,
  currentProblemIndex,
  defaultLanguage,
  save,
}: UseUserCode) {
  const [code, setCode] = useState<string>(problem.solutionCode);
  const [language, setLanguage] = useState<LangaugeType>(defaultLanguage);
  const [oldProblemIndex, setOldProblemIndex] = useState<number>(-1);

  const localStorageKey = 'savedCode';
  const competitionKey = useMemo(() => `${competitionId}|${userId}`, [competitionId, userId]);

  const getUserCode = (keys: string[]): JSONType => {
    let savedInfo = JSON.parse(String(localStorage.getItem(keys[0])));

    if (keys.length === 1 || !savedInfo) return savedInfo;

    for (let i = 1; i < keys.length; i++) {
      if (!isDictionary(savedInfo)) return null;
      savedInfo = savedInfo[keys[i]] as Dictionary;
    }
    return savedInfo;
  };

  useEffect(() => {
    // 최초에 localStorage에 저장할 객체 만들기.
    if (competitionKey === '|' || userId === '') return;

    if (!isNil(getUserCode([localStorageKey, competitionKey]))) return;

    save(localStorageKey, { [competitionKey]: {} });
  }, [competitionKey]);

  useEffect(() => {
    const userCode = getUserCode([localStorageKey, competitionKey, String(currentProblemIndex)]);
    if (typeof userCode === 'string') {
      setCode(userCode);
    } else {
      setCode(problem.solutionCode);
    }
  }, [problem]);

  useEffect(() => {
    const origin = getUserCode([localStorageKey]) as Origin;

    if (oldProblemIndex !== currentProblemIndex) {
      setOldProblemIndex(currentProblemIndex);
      return;
    }

    origin[competitionKey][currentProblemIndex] = code;

    save(localStorageKey, origin);
  }, [code, currentProblemIndex]);

  return { code, setCode, language, setLanguage };
}
