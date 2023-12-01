import api from '@/utils/api';

import type {
  CompetitionForm,
  CompetitionInfo,
  CreateCompetitionResponse,
  FetchCompetitionResponse,
} from './types';

export * from './types';

export async function fetchCompetition(competitionId: number): Promise<CompetitionInfo | null> {
  try {
    const { data } = await api.get<FetchCompetitionResponse>(`/competitions/${competitionId}`);
    return data;
  } catch (err) {
    console.error('Error fetching competition data:', err);
    return null;
  }
}

export async function createCompetition(
  competitionForm: CompetitionForm,
): Promise<CompetitionInfo | null> {
  const { name, detail, maxParticipants, startsAt, endsAt, problems } = competitionForm;

  try {
    const form = {
      name,
      detail,
      maxParticipants,
      startsAt,
      endsAt,
      problems,
    };
    const { data } = await api.post<CreateCompetitionResponse>('/competitions', form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    return data;
  } catch (err) {
    console.error(err);

    return null;
  }
}
