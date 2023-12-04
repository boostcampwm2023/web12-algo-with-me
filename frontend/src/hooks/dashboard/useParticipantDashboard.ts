import { useContext, useEffect, useState } from 'react';

import { SocketContext } from '@/components/Common/Socket/SocketContext';
import { isNil } from '@/utils/type';

import type { Dashboard, Rank } from './types';

const INTERVAL_TIME = 5000;

export function useParticipantDashboard() {
  const { socket } = useContext(SocketContext);
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [myRank, setMyRank] = useState<Rank>({
    rank: 0,
    email: '',
    score: 0,
    problemDict: {},
  });
  const [totalProblemCount, setTotalProblemCount] = useState(-1);

  const fetchData = () => {
    if (!isNil(socket)) {
      socket.emit('dashboard');
    }
  };

  function handleDashboard(newDashboard: Dashboard) {
    setRanks(newDashboard.rankings);
    setMyRank(newDashboard.myRanking);
    setTotalProblemCount(newDashboard.totalProblemCount);
  }

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, INTERVAL_TIME);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isNil(socket)) return;

    if (!socket.hasListeners('dashboard')) {
      socket.on('dashboard', handleDashboard);
    }

    return () => {
      if (socket.hasListeners('dashboard')) {
        socket.off('dashboard', handleDashboard);
      }
    };
  }, [socket]);

  return {
    ranks,
    myRank,
    totalProblemCount,
  };
}
