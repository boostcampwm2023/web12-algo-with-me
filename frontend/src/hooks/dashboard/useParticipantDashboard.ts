import { useContext, useEffect, useState } from 'react';

import { SocketContext } from '@/components/Common/Socket/SocketContext';
import { isNil } from '@/utils/type';

import type { Dashboard, Rank } from './types';

export function useParticipantDashboard() {
  const { socket } = useContext(SocketContext);
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [myRank, setMyRank] = useState<Rank>({
    email: '',
    score: 0,
    problemDict: {},
  });
  const [totalProblemCount, setTotalProblemCount] = useState(-1);

  function handleDashboard(newDashboard: Dashboard) {
    setRanks(newDashboard.rankings);
    setMyRank(newDashboard.myRanking);
    setTotalProblemCount(newDashboard.totalProblemCount);
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
    totalProblemCount,
  };
}
