import { useEffect, useRef, useState } from 'react';

import type { CompetitionInfo } from '@/apis/competitions';
import { fetchCompetition } from '@/apis/competitions';
import type { ProblemId } from '@/apis/problems';
import { createSocketInstance } from '@/utils/socket';
import { isNil } from '@/utils/type';

export type SubmissionForm = {
  problemId: ProblemId;
  code: string;
};

const notFoundCompetition: CompetitionInfo = {
  id: 0,
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
  const socket = useRef(
    createSocketInstance('/competitions', {
      transports: ['websocket'],
      query: { competitionId: 3 },
    }),
  );

  const handleConnect = () => {
    console.log('connected!');
  };

  const handleDisconnect = () => {
    console.log('disconnected!');
  };

  useEffect(() => {
    if (!socket.current.hasListeners('connect')) {
      socket.current.on('connect', handleConnect);
    }
    if (!socket.current.hasListeners('disconnect')) {
      socket.current.on('disconnect', handleDisconnect);
    }
  }, []);

  function submitSolution(form: SubmissionForm) {
    socket.current.emit('submissions', form);
  }

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
    socket,
    competition,
    submitSolution,
  };
};
