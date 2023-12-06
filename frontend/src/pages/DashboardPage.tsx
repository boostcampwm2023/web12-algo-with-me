import { css } from '@style/css';

import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import AuthContext from '@/components/Auth/AuthContext';
import { SocketProvider } from '@/components/Common/Socket/SocketProvider';
import DashboardLoading from '@/components/Dashboard/DashboardLoading';
import DashboardTable from '@/components/Dashboard/DashboardTable';
import Header from '@/components/Header';
import { useCompetition } from '@/hooks/competition';
import { useParticipantDashboard } from '@/hooks/dashboard';
import { range } from '@/utils/array';

export default function DashboardPage() {
  const { id } = useParams<{ id: string }>();
  const competitionId: number = id ? parseInt(id, 10) : -1;
  const { competition } = useCompetition(competitionId);
  const { email } = useContext(AuthContext);

  const { startsAt, endsAt } = competition;
  const currentTime = new Date();

  let competitionStatusText = '대회 전';
  if (currentTime >= new Date(startsAt)) {
    competitionStatusText = currentTime <= new Date(endsAt) ? '진행 중' : '대회 종료';
  }

  const fiveMinutesAfterEnd = new Date(endsAt);
  fiveMinutesAfterEnd.setMinutes(fiveMinutesAfterEnd.getMinutes() + 5);

  const useWebsocket = currentTime < fiveMinutesAfterEnd;

  const { ranks, myRank, totalProblemCount } = useParticipantDashboard(
    useWebsocket,
    competitionId,
    email,
  );
  const problemCount = range(1, totalProblemCount + 1);

  if (currentTime < fiveMinutesAfterEnd && currentTime >= new Date(endsAt)) {
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
        <DashboardTable ranks={ranks} myRank={myRank} problemCount={problemCount} />
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
