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

export type CompetitionInfo = {
  id: CompetitionId;
  host: string | null;
  participants: string[];
  name: string;
  detail: string;
  maxParticipants: number;
  startsAt: string;
  endsAt: string;
  createdAt: string;
  updatedAt: string;
};

export type FetchCompetitionResponse = CompetitionInfo;
export type CreateCompetitionResponse = CompetitionInfo;
