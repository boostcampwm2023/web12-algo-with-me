import { useEffect, useState } from 'react';

import type { CompetitionProblem, ProblemId } from '@/apis/problems';
import { fetchCompetitionProblem } from '@/apis/problems';
import { isNil } from '@/utils/type';

const notFoundProblem: CompetitionProblem = {
  id: 0,
  title: 'Problem Not Found',
  timeLimit: 0,
  memoryLimit: 0,
  content: 'The requested problem could not be found.',
  solutionCode: '',
  testcases: [],
  createdAt: new Date().toISOString(),
};

export const useCompetitionProblem = (problemId: ProblemId) => {
  const [problem, setProblem] = useState<CompetitionProblem>(notFoundProblem);

  async function updateProblem(problemId: ProblemId) {
    if (problemId < 0) return;

    const problem = await fetchCompetitionProblem(problemId);

    if (isNil(problem)) {
      alert('문제를 가져오는데 실패했습니다.');
      return;
    }

    /**
     * 서버에서 실제 테스트케이스를 받기 전 임시로 저장한 입력
     */
    setProblem({
      ...problem,
      testcases: [{ id: 1, input: '1,2', expected: '3', changable: false }],
    });
  }

  useEffect(() => {
    updateProblem(problemId);
  }, [problemId]);

  return {
    problem,
  };
};
