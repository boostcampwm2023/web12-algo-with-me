import { css } from '@style/css';

import { useParams } from 'react-router-dom';

import { CompetitionDetailContent } from '@/components/CompetitionDetail/CompetitionDetailContent';
import Header from '@/components/Header';
import { PageLayout } from '@/components/Layout/PageLayout';
import { useCompetition } from '@/hooks/competition';

export default function CompetitionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const competitionId: number = id ? parseInt(id, 10) : -1;
  const { competition } = useCompetition(competitionId);
  // 대회 상태에 따른 페이지를 구성하기 위해 현재 날짜, 시작 시간, 종료 시간을 가져옴

  return (
    <PageLayout className={pageStyle}>
      <Header />
      <CompetitionDetailContent
        competitionId={competitionId}
        competition={competition}
        className={css({
          maxWidth: '900px',
        })}
      />
    </PageLayout>
  );
}

const pageStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '136px',
  minHeight: '100vh',
});
