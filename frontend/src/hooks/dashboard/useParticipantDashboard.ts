import { useContext, useEffect, useState } from 'react';

import { getDashboardData } from '@/apis/dashboard';
import { SocketContext } from '@/components/Common/Socket/SocketContext';

import type { Dashboard, Rank } from './types';

const REFRESH_INTERVAL = 5000;

export function useParticipantDashboard(
  useWebSocket: boolean,
  competitionId: number,
  email: string,
) {
  const { socket } = useContext(SocketContext);
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [myRank, setMyRank] = useState<Rank>({
    rank: 0,
    email: '',
    score: 0,
    problemDict: {},
  });
  const [totalProblemCount, setTotalProblemCount] = useState(-1);

  const fetchDashboardDataUsingWebSocket = () => {
    if (socket) {
      socket.emit('dashboard');
    }
  };

  const fetchDashboardDataUsingApi = async () => {
    try {
      const newDashboard: Dashboard = await getDashboardData({
        competitionId,
        email: email,
      });

      setRanks(newDashboard.rankings);
      setMyRank(newDashboard.myRanking);
      setTotalProblemCount(newDashboard.totalProblemCount);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (useWebSocket) {
      fetchDashboardDataUsingWebSocket();

      const intervalId = setInterval(() => {
        fetchDashboardDataUsingWebSocket();
      }, REFRESH_INTERVAL);

      return () => clearInterval(intervalId);
    } else {
      fetchDashboardDataUsingApi();
    }
  }, [useWebSocket, socket, competitionId, email]);

  useEffect(() => {
    if (useWebSocket && socket && !socket.hasListeners('dashboard')) {
      socket.on('dashboard', handleDashboardData);
    }

    return () => {
      if (useWebSocket && socket && socket.hasListeners('dashboard')) {
        socket.off('dashboard', handleDashboardData);
      }
    };
  }, [useWebSocket, socket]);

  const handleDashboardData = (newDashboard: Dashboard) => {
    setRanks(newDashboard.rankings);
    setMyRank(newDashboard.myRanking);
    setTotalProblemCount(newDashboard.totalProblemCount);
  };

  return {
    ranks,
    myRank,
    totalProblemCount,
  };
}
