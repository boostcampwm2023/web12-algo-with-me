import { useContext, useEffect, useState } from 'react';

import type { CompetitionId } from '@/apis/competitions';
import { CompetitionContext } from '@/components/Competition/CompetitionContext';
import { isNil } from '@/utils/type';

type Rank = {
  user: string;
  solved: number;
  score: number;
  problemSet: {
    [key: number]: number | null;
  };
};

type Dashboard = {
  competitionId: CompetitionId;
  totalProblemCount: number;
  ranking: Rank[];
  myRanking: Rank;
};

export function useParticipantDashboard() {
  const { socket } = useContext(CompetitionContext);
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [myRank, setMyRank] = useState<Rank>({
    user: '',
    solved: 0,
    score: 0,
    problemSet: {},
  });

  function handleDashboard(newDashboard: Dashboard) {
    setRanks(newDashboard.ranking);
    setMyRank(newDashboard.myRanking);
  }

  useEffect(() => {
    if (isNil(socket)) return;

    if (!socket.hasListeners('dashboard')) {
      socket.on('dashboard', handleDashboard);
    }
  }, [socket]);

  return {
    ranks,
    myRank,
  };
}
