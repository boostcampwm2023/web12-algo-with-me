import api from '@/utils/api';

import { DashboardData, FetchDashboardResponse } from './type';

export const getDashboardData = async ({ competitionId, email }: DashboardData) => {
  const response = await api.get<FetchDashboardResponse>(`/dashboards/${competitionId}`, {
    params: {
      email,
    },
  });

  return response.data;
};
