import api from '@/utils/api';

import type {
  CompetitionProblem,
  FetchCompetitionProblemResponse,
  FetchProblemListResponse,
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
