import type { ProblemId } from '../problems';

export type CompetitionId = number;

export type CompetitionForm = {
  name: string;
  detail: string;
  maxParticipants: number;
  startsAt: string;
  endsAt: string;
  problems: ProblemId[];
};

export type CreateCompetitionResponse = {
  id: CompetitionId;
  name: string;
  detail: string;
  maxParticipants: number;
  startsAt: string;
  endsAt: string;
  createdAt: string;
  updatedAt: string;
};
