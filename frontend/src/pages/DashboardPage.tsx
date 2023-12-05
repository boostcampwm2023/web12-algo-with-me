import { css } from '@style/css';

import { useParams } from 'react-router-dom';

import { HStack, Text } from '@/components/Common';
import { SocketProvider } from '@/components/Common/Socket/SocketProvider';
import DashboardTable from '@/components/Dashboard/DashboardTable';
import Header from '@/components/Header';
import { PageLayout } from '@/components/Layout/PageLayout';
import { useCompetition } from '@/hooks/competition';

export default function DashboardPage() {
  const { id } = useParams<{ id: string }>();
  const competitionId: number = id ? parseInt(id, 10) : -1;
  const { competition } = useCompetition(competitionId);

  const { startsAt, endsAt } = competition;
  const currentTime = new Date();

  let competitionStatusText = '대회 전';
  if (currentTime >= new Date(startsAt)) {
    competitionStatusText = currentTime <= new Date(endsAt) ? '진행 중' : '대회 종료';
  }

  return (
    <PageLayout className={pageLayoutStyle}>
      <Header />
      <SocketProvider
        transports={['websocket']}
        query={{ competitionId: String(competitionId) }}
        token={localStorage.getItem('accessToken') ?? ''}
        namespace={'dashboards'}
      >
        <HStack className={textContainerStyle}>
          <Text type="display" size="lg" className={competitionNameStyle}>
            {competition.name}
          </Text>
          <Text type="title" size="lg">
            {competitionStatusText}
          </Text>
        </HStack>
        <DashboardTable />
      </SocketProvider>
    </PageLayout>
  );
}

const pageLayoutStyle = css({
  textAlign: 'center',
  minHeight: '100vh',
});

const textContainerStyle = css({
  gap: '10px',
  marginTop: '56px',
  marginBottom: '47px',
});

const competitionNameStyle = css({
  display: 'flex',
  height: '116px',
  flexDirection: 'column',
  justifyContent: 'center',
});
