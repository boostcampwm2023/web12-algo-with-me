import { useContext, useEffect, useState } from 'react';

import { SocketContext } from '@/components/Common/Socket/SocketContext';
import api from '@/utils/api';

import type { Dashboard, Rank } from './types';

const INTERVAL_TIME = 5000;

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

  const fetchDataWebSocket = () => {
    if (socket) {
      socket.emit('dashboard');
    }
  };

  const fetchDataApi = async () => {
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
    if (useWebSocket) {
      fetchDataWebSocket();

      const intervalId = setInterval(() => {
        fetchDataWebSocket();
      }, INTERVAL_TIME);

      return () => clearInterval(intervalId);
    } else {
      fetchDataApi();
    }
  }, [useWebSocket, socket, competitionId, email]);

  useEffect(() => {
    if (useWebSocket && socket && !socket.hasListeners('dashboard')) {
      socket.on('dashboard', handleDashboard);
    }

    return () => {
      if (useWebSocket && socket && socket.hasListeners('dashboard')) {
        socket.off('dashboard', handleDashboard);
      }
    };
  }, [useWebSocket, socket]);

  const handleDashboard = (newDashboard: Dashboard) => {
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
