import { css } from '@style/css';

import { useParams } from 'react-router-dom';

import { CompetitionDetailContent } from '@/components/CompetitionDetail/CompetitionDetailContent';
import { Header } from '@/components/Header';
import { PageLayout } from '@/components/Layout/PageLayout';
import { useCompetition } from '@/hooks/competition';

export function CompetitionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const competitionId: number = id ? parseInt(id, 10) : -1;
  const { competition } = useCompetition(competitionId);

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
