import type { CompetitionForm, CreateCompetitionResponse } from './types';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export * from './types';

export async function createCompetition(competitionForm: CompetitionForm) {
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
    const { data } = await api.post<CreateCompetitionResponse>('/competitions', form);

    return data;
  } catch (err) {
    console.error(err);

    return null;
  }
}
