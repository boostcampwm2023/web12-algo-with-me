import { Link } from 'react-router-dom';

import type { CompetitionId } from '@/apis/competitions';

interface Props {
  competitionId: CompetitionId;
}

export default function ViewDashboardButton({ competitionId }: Props) {
  const dashboardLink = `/contest/dashboard/${competitionId}`;

  return (
    <Link to={dashboardLink}>
      <button>대시보드 보기</button>
    </Link>
  );
}
