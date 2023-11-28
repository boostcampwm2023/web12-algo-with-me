import { useParams } from 'react-router-dom';

import ProblemList from '@/components/CompetitionDetail/ProblemList';

export default function CompetitionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const competitionId: number = id ? parseInt(id, 10) : -1;

  return (
    <div>
      CompetitionDetailPage
      <ProblemList competitionId={competitionId} />
    </div>
  );
}
