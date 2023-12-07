import { css } from '@style/css';

import { useEffect, useState } from 'react';

import { fetchCompetitionList } from '@/apis/competitionList';
import { Chip, Link, Text } from '@/components/Common';
import secToTime from '@/utils/secToTime';

interface Competition {
  id: number;
  name: string;
  startsAt: string;
  endsAt: string;
  maxParticipants: number;
}

function formatTimeRemaining(startsAt: string, endsAt: string): string {
  const now = new Date();
  const startDate = new Date(startsAt);
  const endDate = new Date(endsAt);

  if (endDate.getTime() < now.getTime()) {
    return '종료';
  } else if (startDate.getTime() > now.getTime()) {
    const timeDiff = startDate.getTime() - now.getTime();
    const { days, hours, minutes, seconds } = secToTime(timeDiff);

    return `시작까지 ${days}일 ${hours}:${minutes}:${seconds}`;
  } else {
    return '진행 중';
  }
}

export default function CompetitionTable() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);

  const fetchCompetitions = async () => {
    try {
      const competitionData = await fetchCompetitionList();
      setCompetitions(competitionData);
    } catch (error) {
      console.error('Error fetching competitions:', (error as Error).message);
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);
  return (
    <table className={tableStyle}>
      <thead>
        <tr className={tableRowStyle}>
          <th className={nameColumnStyle}>
            <Text.Title size="sm" bold>
              대회 이름
            </Text.Title>
          </th>
          <th className={timeColumnStyle}>
            <Text.Title size="sm" bold>
              시작 시간
            </Text.Title>
          </th>
          <th className={timeColumnStyle}>
            <Text.Title size="sm" bold>
              종료 시간
            </Text.Title>
          </th>
          <th className={stateColumnStyle}>
            <Text.Title size="sm" bold>
              상태
            </Text.Title>
          </th>

          <th className={dashboardColumnStyle}>
            <Text.Title size="sm" bold>
              대시보드 보기
            </Text.Title>
          </th>
        </tr>
      </thead>
      <tbody>
        {competitions.map((competition) => (
          <tr className={tableRowStyle} key={competition.id}>
            <td className={nameTdStyle}>
              <Link className={nameTdTextStyle} to={`/competition/detail/${competition.id}`}>
                {competition.name}
              </Link>
            </td>
            <td>
              <Text className={timeTextStyle} type="body" size="md">
                {new Date(competition.startsAt).toLocaleString()}
              </Text>
            </td>
            <td>
              <Text className={timeTextStyle} type="body" size="md">
                {new Date(competition.endsAt).toLocaleString()}
              </Text>
            </td>
            <td className={stateTdStyle}>
              {formatTimeRemaining(competition.startsAt, competition.endsAt) === '종료' ? (
                <Chip theme="danger">종료</Chip>
              ) : formatTimeRemaining(competition.startsAt, competition.endsAt) === '진행 중' ? (
                <Chip theme="success">진행 중</Chip>
              ) : (
                <Chip theme="info">시작 전</Chip>
              )}
            </td>

            <td className={dashboardTdStyle}>
              <Link to={`/competition/dashboard/${competition.id}`}>Link</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const tableStyle = css({
  background: 'surface',
  display: 'flex',
  padding: '1rem 1.5rem',
  flexDirection: 'column',
  color: 'text',
  borderRadius: '0.5rem',
});

const tableRowStyle = css({
  display: 'flex',
  alignItems: 'center',
  height: '4rem',
  gap: '0.75rem',
  paddingX: '0.5rem',
  alignSelf: 'stretch',
  justifyContent: 'center',
  borderBottom: '2px solid',
  borderColor: 'border',
});

const nameColumnStyle = css({
  flex: '1 0 0',
  textAlign: 'start',
});
const timeColumnStyle = css({
  width: '240px',
  textAlign: 'start',
});
const stateColumnStyle = css({
  width: '100px',
  textAlign: 'center',
});

const dashboardColumnStyle = css({
  width: '120px',
  textAlign: 'center',
});

const nameTdStyle = css({
  display: 'flex',
  height: '17px',

  alignItems: 'center',
  flex: '1 0 0',
});
const timeTextStyle = css({
  display: 'block',
  width: '240px',
});
const stateTdStyle = css({
  width: '100px',
  textAlign: 'center',
  verticalAlign: 'middle',
});

const dashboardTdStyle = css({
  display: 'flex',
  width: '120px',
  height: '17px',
  justifyContent: 'center',
  alignItems: 'center',
});

const nameTdTextStyle = css({
  width: '152px',
  height: '17px',
  display: 'flex',
});
