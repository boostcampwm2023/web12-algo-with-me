import { useEffect, useState } from 'react';

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
  const problems = [1, 2, 3]; // TODO: 대회에 해당하는 문제의 id를 유동적으로 채워넣을 수 있게 수정해야함
  const [competition, setCompetition] = useState<Competition>(notFoundCompetition);

  useEffect(() => {
    axios
      .get(`http://101.101.208.240:3000/competitions/${competitionId}`)
      .then((response) => {
        setCompetition(response.data);
      })
      .catch((error) => {
        console.error('Error fetching competition data:', error);
      });
  }, [competitionId]);

  return {
    problems,
    competition,
  };
};
