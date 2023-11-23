import { useEffect, useRef, useState } from 'react';

import type { ProblemId } from '@/apis/problems';
import { createSocketInstance } from '@/utils/socket';

import axios from 'axios';

interface Competition {
  id: number;
  name: string;
  detail: string;
  maxParticipants: number;
  startsAt: string;
  endsAt: string;
  createdAt: string;
  updatedAt: string;
}

export type SubmissionForm = {
  problemId: ProblemId;
  code: string;
};

const notFoundCompetition: Competition = {
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
  const [competition, setCompetition] = useState<Competition>(notFoundCompetition);
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
    try {
      const { data } = await axios.get<Competition>(
        `http://101.101.208.240:3000/competitions/${competitionId}`,
      );
      setCompetition(data);
    } catch (err) {
      console.error('Error fetching competition data:', err);
      alert('대회 정보 패치에 실패했습니다.');
    }
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
