import { css } from '@style/css';

import { useParams } from 'react-router-dom';

import Header from '@/components/Header';
import SocketTimer from '@/components/SocketTimer';
import { useCompetition } from '@/hooks/competition';
import { formatDate } from '@/utils/date';

export default function DashboardPage() {
  const { id } = useParams<{ id: string }>();
  const competitionId: number = id ? parseInt(id, 10) : -1;
  const { socket, competition, isConnected } = useCompetition(competitionId);

  const { startsAt, endsAt } = competition;
  const formattedStartsAt = formatDate(new Date(startsAt || ''), 'hh:mm');
  const formattedEndsAt = formatDate(new Date(endsAt || ''), 'hh:mm');
  const COMPEITION_PING_TIME = 5 * 1000;
  const COMPEITION_SOCKET_EVENT = 'ping';
  const competitionSchedule = `${formattedStartsAt} - ${formattedEndsAt}`;

  return (
    <main>
      <Header />
      <section className={flexRow}>
        <span className={competitionTitle}>{competition.name}</span>
        <div>
          <span>{competitionSchedule}</span>
          <div className={timerContainer}>
            <span>남은 시간:</span>
            <SocketTimer
              socket={socket.current}
              isConnected={isConnected}
              endsAt={new Date(endsAt)}
              pingTime={COMPEITION_PING_TIME}
              socketEvent={COMPEITION_SOCKET_EVENT}
            />
          </div>
        </div>
      </section>
      this is dashboard {competitionId}
    </main>
  );
}

const flexRow = css({
  display: 'flex',
  justifyContent: 'space-between',
});

const timerContainer = css({
  display: 'flex',
});

const competitionTitle = css({
  display: 'inline-block',
  height: '50px',
  padding: '10px',
  borderBottom: '2px solid white',
});
