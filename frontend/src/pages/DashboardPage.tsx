import { css } from '@style/css';

import { useParams } from 'react-router-dom';

import EnterCompetitionButton from '@/components/CompetitionDetail/Buttons/EnterCompetitionButton';
import DashboardList from '@/components/Dashboard/DashboardList';
import { mockCompetitionData } from '@/components/Dashboard/mockCompetitionData';
import Header from '@/components/Header';
import SocketTimer from '@/components/SocketTimer';
import { useCompetition } from '@/hooks/competition';
import { formatDate } from '@/utils/date';

export default function DashboardPage() {
  const { id } = useParams<{ id: string }>();
  const competitionId: number = id ? parseInt(id, 10) : -1;
  const { socket, competition, isConnected } = useCompetition(competitionId);

  const { startsAt, endsAt } = competition;
  const formattedStartsAt = new Date(startsAt || '');
  const formattedEndsAt = new Date(endsAt || '');
  const formattedStartsAtDate = formatDate(new Date(startsAt || ''), 'hh:mm');
  const formattedEndsAtDate = formatDate(new Date(endsAt || ''), 'hh:mm');
  const DASHBOARD_PING_TIME = 5 * 1000;
  const DASHBOARD_SOCKET_EVENT = 'ping';
  const competitionSchedule = `시작: ${formattedStartsAtDate} 종료: ${formattedEndsAtDate}`;

  return (
    <main>
      <Header />
      <section className={flexRowStyle}>
        <span className={competitionTitleStyle}>{competition.name}</span>
        <div>
          <span>{competitionSchedule}</span>
          <div className={timerContainerStyle}>
            <span>남은 시간:</span>
            <SocketTimer
              socket={socket.current}
              isConnected={isConnected}
              endsAt={new Date(endsAt)}
              pingTime={DASHBOARD_PING_TIME}
              socketEvent={DASHBOARD_SOCKET_EVENT}
            />
          </div>
          <EnterCompetitionButton
            id={competitionId}
            startsAt={formattedStartsAt}
            endsAt={formattedEndsAt}
          />
        </div>
      </section>
      <DashboardList userList={mockCompetitionData} />
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
