import { css } from '@style/css';

import { useEffect, useState } from 'react';

import { fetchCompetitionList } from '@/apis/competitionList';
import { Chip, Icon, Link, Text } from '@/components/Common';
import secToTime from '@/utils/secToTime';

interface Competition {
  id: number;
  name: string;
  startsAt: string;
  endsAt: string;
  maxParticipants: number;
}

const getCompetitionDetailURL = (competitionId: number) => `/contest/detail/${competitionId}`;

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
    return '진행중';
  }
}

export default function CompetitionList() {
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
      <thead className={tableHeaderStyle}>
        <tr className={tableRowStyle}>
          <th className={nameColumnStyle}>
            <Text type="title" bold={true} size="lg">
              대회 이름
            </Text>
          </th>
          <th className={startColumnStyle}>
            <Text type="title" bold={true} size="lg">
              시작 시간
            </Text>
          </th>
          <th className={endColumnStyle}>
            <Text type="title" size="lg" bold={true}>
              종료 시간
            </Text>
          </th>
          <th className={stateColumnStyle}>
            <Text type="title" size="lg" bold={true}>
              상태
            </Text>
          </th>
          <th className={registrationColumnStyle}>
            <Text type="title" size="lg" bold={true}>
              참여 신청 여부
            </Text>
          </th>
          <th className={dashboardColumnStyle}>
            <Text type="title" size="lg" bold={true}>
              대시보드 보기
            </Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {competitions.map((competition) => (
          <tr className={tableRowStyle} key={competition.id}>
            <td className={nameTdStyle}>
              <Link className={nameTdTextStyle} to={getCompetitionDetailURL(competition.id)}>
                {competition.name}
              </Link>
            </td>
            <td>
              <div className={startTdStyle}>
                <Text type="body" size="md">
                  {new Date(competition.startsAt).toLocaleString()}
                </Text>
              </div>
            </td>
            <td>
              <div className={endTdStyle}>
                <Text type="body" size="md">
                  {new Date(competition.endsAt).toLocaleString()}
                </Text>
              </div>
            </td>
            <td>
              <div className={stateTdStyle}>
                {formatTimeRemaining(competition.startsAt, competition.endsAt) === '종료' ? (
                  <Chip theme="danger">종료</Chip>
                ) : (
                  <Chip className={wideStyle} theme="success">
                    진행 중
                  </Chip>
                )}
              </div>
            </td>
            <td>
              <div className={registrationTdStyle}>
                <Icon.CheckRound color="success" />
              </div>
            </td>
            <td className={dashboardTdStyle}>
              <Link to={`/contest/${competition.id}`}>Link</Link>
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
  padding: '16px 24px',
  flexDirection: 'column',
  color: 'text',
});

const tableHeaderStyle = css({
  display: 'flex',
  height: '64px',
  gap: '10px',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  alignSelf: 'stretch',
});

const tableRowStyle = css({
  padding: '24px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  alignSelf: 'stretch',
  justifyContent: 'center',
});

const nameColumnStyle = css({
  flex: '1 0 0',
  textAlign: 'start',
});
const startColumnStyle = css({
  width: '240px',
  textAlign: 'start',
});
const endColumnStyle = css({
  width: '240px',
  textAlign: 'start',
});
const stateColumnStyle = css({
  width: '80px',
  textAlign: 'center',
});
const registrationColumnStyle = css({
  width: '120px',
  textAlign: 'center',
});
const dashboardColumnStyle = css({
  width: '120px',
  textAlign: 'center',
});

const nameTdStyle = css({
  display: 'flex',
  height: '17px',
  paddingRight: '108px',
  alignItems: 'center',
  flex: '1 0 0',
});
const startTdStyle = css({
  width: '240px',
});
const endTdStyle = css({
  width: '240px',
});
const stateTdStyle = css({
  display: 'flex',
  width: '80px',
  padding: '4px 12px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
});
const registrationTdStyle = css({
  width: '120px',
  height: '20px',
  display: 'flex',
  justifyContent: 'center',
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
});

const wideStyle = css({
  width: '69px',
});
