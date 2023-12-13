import type { Dashboard } from '@/hooks/dashboard';

export type DashboardData = {
  competitionId: number;
  email: string;
};

export type FetchDashboardResponse = Dashboard;
