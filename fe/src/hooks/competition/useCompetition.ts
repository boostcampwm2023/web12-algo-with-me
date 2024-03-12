import { useEffect, useState } from 'react';

import type { CompetitionInfo } from '@/apis/competitions';
import { fetchCompetition } from '@/apis/competitions';
import type { ProblemId } from '@/apis/problems';
import { isNil } from '@/utils/type';

export type SubmissionForm = {
  competitionId: number;
  problemId: ProblemId;
  code: string;
  language: string;
};

const notFoundCompetition: CompetitionInfo = {
  id: 0,
  host: null,
  participants: [],
  name: 'Competition Not Found',
  detail: 'Competition Not Found',
  maxParticipants: 0,
  startsAt: 'Competition Not Found',
  endsAt: 'Competition Not Found',
  createdAt: 'Competition Not Found',
  updatedAt: 'Competition Not Found',
};

export const useCompetition = (competitionId: number) => {
  const [competition, setCompetition] = useState<CompetitionInfo>(notFoundCompetition);

  async function updateCompetition(competitionId: number) {
    const competition = await fetchCompetition(competitionId);
    if (isNil(competition)) {
      alert('대회 정보 패치에 실패했습니다.');
      return;
    }

    setCompetition(competition);
  }

  useEffect(() => {
    updateCompetition(competitionId);
  }, [competitionId]);

  return {
    competition,
  };
};
