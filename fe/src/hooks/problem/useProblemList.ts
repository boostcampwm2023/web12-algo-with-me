import { useEffect, useState } from 'react';

import type { ProblemInfo } from '@/apis/problems';
import { fetchProblemList } from '@/apis/problems';

export function useProblemList() {
  const [problemList, setProblemList] = useState<ProblemInfo[]>([]);

  async function updateProblemList() {
    const problems = await fetchProblemList();

    setProblemList(problems);
  }

  useEffect(() => {
    updateProblemList();
  }, []);

  return {
    problemList,
  };
}
