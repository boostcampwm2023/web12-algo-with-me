import { useEffect, useState } from 'react';

import api from '@/utils/api';

import type { Dashboard, Rank } from './types';

export function useParticipantDashboardApi(competitionId: number, email: string) {
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [myRank, setMyRank] = useState<Rank>({
    rank: 0,
    email: '',
    score: 0,
    problemDict: {},
  });
  const [totalProblemCount, setTotalProblemCount] = useState(-1);

  const fetchData = async () => {
    try {
      const response = await api.get(`/dashboards/${competitionId}`, {
        params: {
          email,
        },
      });

      const newDashboard: Dashboard = response.data;

      setRanks(newDashboard.rankings);
      setMyRank(newDashboard.myRanking);
      setTotalProblemCount(newDashboard.totalProblemCount);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [competitionId, email]);

  return {
    ranks,
    myRank,
    totalProblemCount,
  };
}
