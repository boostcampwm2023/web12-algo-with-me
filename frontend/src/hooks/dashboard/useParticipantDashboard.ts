import { useContext, useEffect, useState } from 'react';

import { SocketContext } from '@/components/Common/Socket/SocketContext';
import { isNil } from '@/utils/type';

import type { Dashboard, Rank } from './types';

export function useParticipantDashboard() {
  const { socket } = useContext(SocketContext);
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
