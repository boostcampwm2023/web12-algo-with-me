import { css } from '@style/css';

import { useParams } from 'react-router-dom';

import { SocketProvider } from '@/components/Common/Socket/SocketProvider';
import EnterCompetitionButton from '@/components/CompetitionDetail/Buttons/EnterCompetitionButton';
import DashboardTable from '@/components/Dashboard/DashboardTable';
import Header from '@/components/Header';
import SocketTimer from '@/components/SocketTimer';
import { useCompetition } from '@/hooks/competition';
import { useParticipantDashboard } from '@/hooks/dashboard/useParticipantDashboard';
import { formatDate } from '@/utils/date';

export default function DashboardPage() {
  const { id } = useParams<{ id: string }>();
  const competitionId: number = id ? parseInt(id, 10) : -1;
  const { competition } = useCompetition(competitionId);
  const { ranks, myRanks } = useParticipantDashboard();

  const { startsAt, endsAt } = competition;
  const formattedStartsAt = new Date(startsAt || '');
  const formattedEndsAt = new Date(endsAt || '');
  const formattedStartsAtDate = formatDate(new Date(startsAt || ''), 'hh:mm');
  const formattedEndsAtDate = formatDate(new Date(endsAt || ''), 'hh:mm');
  const competitionSchedule = `시작: ${formattedStartsAtDate} 종료: ${formattedEndsAtDate}`;

  return (
    <main>
      <Header />
      <SocketProvider
        transports={['websocket']}
        query={{ competitionId: String(competitionId) }}
        namespace={'dashboard'}
      >
        <section className={flexRowStyle}>
          <span className={competitionTitleStyle}>{competition.name}</span>
          <div>
            <span>{competitionSchedule}</span>
            <div className={timerContainerStyle}>
              <span>남은 시간:</span>
              <SocketTimer />
            </div>
            <EnterCompetitionButton
              id={competitionId}
              startsAt={formattedStartsAt}
              endsAt={formattedEndsAt}
            />
          </div>
        </section>
        <DashboardTable userList={ranks} />
      </SocketProvider>
    </main>
  );
}

const flexRowStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const timerContainerStyle = css({
  display: 'flex',
});

const competitionTitleStyle = css({
  display: 'inline-block',
  height: '50px',
  padding: '10px',
  borderBottom: '2px solid white',
});
