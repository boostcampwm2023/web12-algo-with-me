import { useEffect, useState } from 'react';

import type { ProblemId, ProblemInfo } from '@/apis/problems';
import { fetchProblemList } from '@/apis/problems';

export function useProblemList() {
  const [pickedProblemIds, setPickedProblemIds] = useState<ProblemId[]>([]);
  const [allProblems, setAllProblems] = useState<ProblemInfo[]>([]);

  async function updateProblemList() {
    const problems = await fetchProblemList();

    setAllProblems(problems);
  }

  function togglePickedProblem(problemId: ProblemId) {
    if (pickedProblemIds.includes(problemId)) {
      setPickedProblemIds((ids) => ids.filter((id) => id !== problemId).sort());
    } else {
      setPickedProblemIds((ids) => [...ids, problemId].sort());
    }
  }

  useEffect(() => {
    updateProblemList();
  }, []);

  return {
    allProblems,
    pickedProblemIds,
    togglePickedProblem,
  };
}
