import { useParams } from 'react-router-dom';

import AfterCompetition from '@/components/CompetitionDetail/AfterCompetition';
import BeforeCompetition from '@/components/CompetitionDetail/BeforeCompetition';
import DuringCompetition from '@/components/CompetitionDetail/DuringCompetition';
import Header from '@/components/Header';
import { useCompetition } from '@/hooks/competition';

export default function CompetitionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const competitionId: number = id ? parseInt(id, 10) : -1;
  const { competition } = useCompetition(competitionId);
  // 대회 상태에 따른 페이지를 구성하기 위해 현재 날짜, 시작 시간, 종료 시간을 가져옴
  const currentDate = new Date();
  const startsAt = new Date(competition?.startsAt || '');
  const endsAt = new Date(competition?.endsAt || '');

  let content;

  if (currentDate < startsAt) {
    content = <BeforeCompetition />;
  } else if (currentDate >= startsAt && currentDate <= endsAt) {
    content = <DuringCompetition competitionId={competitionId} competition={competition} />;
  } else {
    content = <AfterCompetition competitionId={competitionId} competition={competition} />;
  }

  // content = <DuringCompetition competitionId={competitionId} competition={competition} />;

  return (
    <div>
      <Header />
      {content}
    </div>
  );
}
