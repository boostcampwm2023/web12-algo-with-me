import { Link } from 'react-router-dom';

import type { CompetitionId } from '@/apis/competitions';
import { Button } from '@/components/Common';

interface Props {
  competitionId: CompetitionId;
}

export default function ViewDashboardButton({ competitionId }: Props) {
  const dashboardLink = `/competition/dashboard/${competitionId}`;

  return (
    <Link to={dashboardLink}>
      <Button>대시보드 확인</Button>
    </Link>
  );
}
