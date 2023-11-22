import { useEffect, useState } from 'react';

import type { ProblemInfo } from '@/apis/problems';
import { fetchProblemList } from '@/apis/problems';

export function useProblemList() {
  const [allProblems, setAllProblems] = useState<ProblemInfo[]>([]);

  async function updateProblemList() {
    const problems = await fetchProblemList();

    setAllProblems(problems);
  }

  useEffect(() => {
    updateProblemList();
  }, []);

  return {
    allProblems,
  };
}
