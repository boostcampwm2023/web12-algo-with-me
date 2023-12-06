import { css } from '@style/css';

import { useParams } from 'react-router-dom';

import { CompetitionDetailContent } from '@/components/CompetitionDetail/CompetitionDetailContent';
import Header from '@/components/Header';
import { PageLayout } from '@/components/Layout/PageLayout';
import { useCompetition } from '@/hooks/competition';
import { formatDate } from '@/utils/date';

export default function CompetitionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const competitionId: number = id ? parseInt(id, 10) : -1;
  const { competition } = useCompetition(competitionId);
  // 대회 상태에 따른 페이지를 구성하기 위해 현재 날짜, 시작 시간, 종료 시간을 가져옴
  const startsAt = new Date(competition?.startsAt || '');
  const endsAt = new Date(competition?.endsAt || '');
  const formattedStartsAt = formatDate(startsAt, 'YYYY. MM. DD. hh:mm');
  const formattedEndsAt = formatDate(endsAt, 'YYYY. MM. DD. hh:mm');

  const competitionSchedule = `시작: ${formattedStartsAt} 종료: ${formattedEndsAt}`;

  return (
    <PageLayout className={pageStyle}>
      <Header />
      <CompetitionDetailContent
        competitionId={competitionId}
        competition={competition}
        startsAt={startsAt}
        endsAt={endsAt}
        competitionSchedule={competitionSchedule}
      />
    </PageLayout>
  );
}

const pageStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '136px',
  height: '100vh',
});
