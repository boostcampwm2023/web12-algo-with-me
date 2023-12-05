import { useContext } from 'react';

import { useParticipantDashboardApi } from '@/hooks/dashboard';
import { range } from '@/utils/array';

import AuthContext from '../Auth/AuthContext';
import DashboardTable from './DashboardTable';

interface Props {
  competitionId: number;
}

export default function DashboardTableApi({ competitionId }: Props) {
  const { email } = useContext(AuthContext);
  const { ranks, totalProblemCount, myRank } = useParticipantDashboardApi(competitionId, email);
  const problemCount = range(1, totalProblemCount + 1);

  return <DashboardTable ranks={ranks} myRank={myRank} problemCount={problemCount} />;
}
