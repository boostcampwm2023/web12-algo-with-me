import { useEffect, useState } from 'react';

import type { ProblemId } from '@/apis/problems';

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

export const useProblem = (problemId: ProblemId) => {
  const [problem, setProblem] = useState<CompetitionProblem>(notFoundProblem);

  const fetchProblem = async (id: number) => {
    if (id < 0) return;

    try {
      const response = await axios.get(`http://101.101.208.240:3000/competitions/problems/${id}`);
      const fetchedProblem = response.data;
      setProblem(fetchedProblem || notFoundProblem);
    } catch (error) {
      console.error('Error fetching problem data:', error);
    }
  };

  useEffect(() => {
    fetchProblem(problemId);
  }, [problemId]);

  return {
    problem,
  };
};
