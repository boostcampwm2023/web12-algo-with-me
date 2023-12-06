import { css } from '@style/css';

import { useParams } from 'react-router-dom';

import { SocketProvider } from '@/components/Common/Socket/SocketProvider';
import DashboardLoading from '@/components/Dashboard/DashboardLoading';
import DashboardTable from '@/components/Dashboard/DashboardTable';
import Header from '@/components/Header';
import { useCompetition } from '@/hooks/competition';

export default function DashboardPage() {
  const { id } = useParams<{ id: string }>();
  const competitionId: number = id ? parseInt(id, 10) : -1;
  const { competition } = useCompetition(competitionId);

  const { startsAt, endsAt } = competition;
  const currentTime = new Date();

  const determineCompetitionStatus = () => {
    if (currentTime >= new Date(startsAt)) {
      return currentTime <= new Date(endsAt) ? '진행 중' : '대회 종료';
    }
    return '대회 전';
  };

  const competitionStatusText = determineCompetitionStatus();

  const bufferTimeAfterCompetitionEnd = new Date(endsAt);
  bufferTimeAfterCompetitionEnd.setMinutes(bufferTimeAfterCompetitionEnd.getMinutes() + 5);

  const useWebSocket = currentTime < bufferTimeAfterCompetitionEnd;

  if (currentTime < bufferTimeAfterCompetitionEnd && currentTime >= new Date(endsAt)) {
    return <DashboardLoading />;
  }

  return (
    <main>
      <Header />
      <SocketProvider
        transports={['websocket']}
        query={{ competitionId: String(competitionId) }}
        token={localStorage.getItem('accessToken') ?? ''}
        namespace={'dashboards'}
      >
        <section>
          <span className={competitionTitleStyle}>{competition.name}</span>
          <span>{competitionStatusText}</span>
        </section>
        <DashboardTable useWebsocket={useWebSocket} competitionId={competitionId} />
      </SocketProvider>
    </main>
  );
}

const competitionTitleStyle = css({
  display: 'inline-block',
  height: '50px',
  padding: '10px',
  borderBottom: '2px solid white',
});
