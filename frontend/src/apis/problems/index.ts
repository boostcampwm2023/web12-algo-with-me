import api from '@/utils/api';

import type {
  CompetitionProblem,
  FetchCompetitionProblemResponse,
  FetchProblemListResponse,
  Problem,
  ProblemId,
  ProblemInfo,
} from './types';

export * from './types';

export async function fetchProblemList(): Promise<ProblemInfo[]> {
  try {
    const { data } = await api.get<FetchProblemListResponse>('/problems');

    return data;
  } catch (err) {
    console.error(err);

    return [];
  }
}

export async function fetchCompetitionProblemList(competitionId: number): Promise<ProblemInfo[]> {
  try {
    const { data } = await api.get<FetchProblemListResponse>(
      `/competitions/${competitionId}/problems`,
    );

    return data;
  } catch (err) {
    console.error(err);

    return [];
  }
}

export async function fetchCompetitionProblem(
  problemId: ProblemId,
): Promise<CompetitionProblem | null> {
  try {
    const { data } = await api.get<FetchCompetitionProblemResponse>(
      `/competitions/problems/${problemId}/`,
    );

    return data;
  } catch (err) {
    console.error(err);

    return null;
  }
}

export async function fetchProblemDetail(problemId: number) {
  try {
    const response = await api.get<Problem>(`/problems/${problemId}`);
    const data = response.data;

    return data;
  } catch (error) {
    console.error('Error fetching problem:', (error as Error).message);
  }
}
