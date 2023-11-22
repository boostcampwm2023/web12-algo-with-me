import { css } from '@style/css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import JoinCompetitionButton from '@/components/Main/Buttons/JoinCompetitionButton';
import ViewDashboardButton from '@/components/Main/Buttons/ViewDashboardButton';
const generateMockData = () => {
  // API배포가 완료되면 삭제 에정
  return [
    {
      id: 1,
      name: '테스트 대회 이름',
      detail: '테스트 대회 설명',
      maxParticipants: 70,
      startsAt: '2023-11-14T08:35:24.358Z',
      endsAt: '2023-11-20T12:13:04.005Z',
      createdAt: '2023-11-14T08:35:24.358Z',
      updatedAt: '2023-11-21T02:28:43.955Z',
    },
    {
      id: 2,
      name: 'ICPC 서울',
      detail: '이거슨 아이씨피씨입니다',
      maxParticipants: 1000,
      startsAt: '2023-11-21T07:10:44.456Z',
      endsAt: '2023-11-21T10:10:44.456Z',
      createdAt: '2023-11-21T07:50:58.686Z',
      updatedAt: '2023-11-21T07:50:58.686Z',
    },
    {
      id: 3,
      name: '천하제일코딩대회',
      detail: '^오^',
      maxParticipants: 10,
      startsAt: '2023-11-21T07:10:44.456Z',
      endsAt: '2023-11-21T10:10:44.456Z',
      createdAt: '2023-11-21T07:57:07.563Z',
      updatedAt: '2023-11-21T07:57:07.563Z',
    },
    {
      id: 4,
      name: 'fe테스트대회',
      detail: '가나다라마바사',
      maxParticipants: 3,
      startsAt: '2023-11-22T01:20:00.000Z',
      endsAt: '2023-11-23T01:20:00.000Z',
      createdAt: '2023-11-22T10:22:03.723Z',
      updatedAt: '2023-11-22T10:22:03.723Z',
    },
    {
      id: 5,
      name: '가나다라',
      detail: '마바사아자차카타파하',
      maxParticipants: 3,
      startsAt: '2023-11-23T03:00:00.000Z',
      endsAt: '2023-11-23T04:00:00.000Z',
      createdAt: '2023-11-22T12:00:46.942Z',
      updatedAt: '2023-11-22T12:00:46.942Z',
    },
  ];
};

interface Competition {
  id: number;
  name: string;
  startsAt: string;
  endsAt: string;
  maxParticipants: number;
}

function secToTime(sec: number) {
  const days = Math.floor(sec / (1000 * 60 * 60 * 24));
  const hours = Math.floor((sec % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((sec % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((sec % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
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
    return '진행중';
  }
}

export default function CompetitionList() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 실제 API 요청 대신 목업 데이터 사용 -> TODO: API배포가 완료되면 API처리하는 코드로 바꿔야함
    const mockData = generateMockData();
    setCompetitions(mockData);
  }, []);

  const handleCompetitionClick = (id: number) => {
    navigate(`/contest/detail/${id}`);
  };
  // TODO: 대회 시작 전에 들어와서 대회가 시작된 뒤에 참여 버튼을 누르면 서버에서 거절하고 화면에 alert을 띄우고 새로고침
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>대회 이름</th>
            <th>시작 시간</th>
            <th>종료 시간</th>
            <th>상태</th>
            <th>참여</th>
            <th>대시보드</th>
          </tr>
        </thead>
        <tbody>
          {competitions.map((competition) => (
            <tr key={competition.id}>
              <td>
                <span
                  className={competitionDetailLinkStyle}
                  onClick={() => handleCompetitionClick(competition.id)}
                >
                  {competition.name}
                </span>
              </td>
              <td>{new Date(competition.startsAt).toLocaleString()}</td>
              <td>{new Date(competition.endsAt).toLocaleString()}</td>
              <td>{formatTimeRemaining(competition.startsAt, competition.endsAt)}</td>
              <td>
                {competition.startsAt > new Date().toISOString() && <JoinCompetitionButton />}
              </td>
              <td>
                <ViewDashboardButton id={competition.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const competitionDetailLinkStyle = css({
  color: 'blue',
  cursor: 'pointer',
  textDecoration: 'underline',
});
