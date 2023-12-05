import { useParticipantDashboardSocket } from '@/hooks/dashboard';
import { range } from '@/utils/array';

import DashboardTable from './DashboardTable';

export default function DashboardTableSocket() {
  const { ranks, totalProblemCount, myRank } = useParticipantDashboardSocket();
  const problemCount = range(1, totalProblemCount + 1);

  return <DashboardTable ranks={ranks} myRank={myRank} problemCount={problemCount} />;
}
