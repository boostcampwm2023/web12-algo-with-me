import { useEffect, useState } from 'react';

import axios from 'axios';

interface CompetitionProblem {
  id: number;
  title: string;
  timeLimit: number;
  memoryLimit: number;
  content: string;
  createdAt: string;
  solutionCode: string;
  testcases: string;
}

const notFoundProblem: CompetitionProblem = {
  id: 0,
  title: 'Problem Not Found',
  timeLimit: 0,
  memoryLimit: 0,
  content: 'The requested problem could not be found.',
  solutionCode: '',
  testcases: '',
  createdAt: new Date().toISOString(),
};

export const useProblem = (problemId: number) => {
  const [problem, setProblem] = useState<CompetitionProblem>(notFoundProblem);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(
          `http://101.101.208.240:3000/competitions/problems/${problemId}`,
        );
        const problem = response.data;
        setProblem(problem || [notFoundProblem]);
      } catch (error) {
        console.error('Error fetching problem data:', error);
      }
    };
    fetchProblem();
  }, [problemId]);

  return {
    problem,
  };
};
