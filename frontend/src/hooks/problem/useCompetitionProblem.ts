import { useEffect, useState } from 'react';

import type { CompetitionProblem, ProblemId, Testcase } from '@/apis/problems';
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

    const { data } = problem.testcases as Testcase;

    setProblem({
      ...problem,
      testcases: data.map(({ input, output }, index) => ({
        id: index + 1,
        input: input.map((el) => JSON.stringify(el)).join(','),
        expected: JSON.stringify(output),
        changable: false,
      })),
    });
  }

  useEffect(() => {
    updateProblem(problemId);
  }, [problemId]);

  return {
    problem,
  };
};
