import api from '@/utils/api';

import { DashboardFetchData } from './type';

export const fetchDashboardData = async ({ competitionId, email }: DashboardFetchData) => {
  const response = await api.get(`/dashboards/${competitionId}`, {
    params: {
      email,
    },
  });

  return response.data;
};
