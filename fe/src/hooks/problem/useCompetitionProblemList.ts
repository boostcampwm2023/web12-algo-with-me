import { useEffect, useState } from 'react';

import type { ProblemInfo } from '@/apis/problems';
import { fetchCompetitionProblemList } from '@/apis/problems';

export function useCompetitionProblemList(competitionId: number) {
  const [problemList, setProblemList] = useState<ProblemInfo[]>([]);

  async function updateCompetitionProblemList(competitionId: number) {
    const problemList = await fetchCompetitionProblemList(competitionId);
    setProblemList(problemList);
  }

  useEffect(() => {
    updateCompetitionProblemList(competitionId);
  }, [competitionId]);

  return {
    problemList,
  };
}
