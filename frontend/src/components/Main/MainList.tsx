import { useEffect, useState } from 'react';

import JoinCompetitionButton from '@/components/Commoms/Buttons/JoinCompetitionButton';
import ViewDashboardButton from '@/components/Commoms/Buttons/ViewDashboardButton';

const generateMockData = () => {
  return [
    {
      id: 1,
      name: '모의 대회 1',
      startsAt: '2023-12-01T12:00:00.000Z',
      endsAt: '2023-12-05T18:00:00.000Z',
      maxParticipants: 50,
    },
    {
      id: 2,
      name: '모의 대회 2',
      startsAt: '2023-12-10T10:00:00.000Z',
      endsAt: '2023-12-15T16:00:00.000Z',
      maxParticipants: 30,
    },
    {
      id: 3,
      name: '모의 대회 3',
      startsAt: '2023-11-10T10:00:00.000Z',
      endsAt: '2023-11-16T16:00:00.000Z',
      maxParticipants: 30,
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

function formatTimeRemaining(startsAt: string, endsAt: string): string {
  const now = new Date();
  const startDate = new Date(startsAt);
  const endDate = new Date(endsAt);

  if (endDate.getTime() < now.getTime()) {
    return '종료';
  }

  const timeDiff = startDate.getTime() - now.getTime();
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return `시작까지 ${days}일 ${hours}:${minutes}:${seconds}`;
}

function MainList() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);

  useEffect(() => {
    // 실제 API 요청 대신 목업 데이터 사용
    const mockData = generateMockData();
    setCompetitions(mockData);
  }, []);

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
              <td>{competition.name}</td>
              <td>{new Date(competition.startsAt).toLocaleString()}</td>
              <td>{new Date(competition.endsAt).toLocaleString()}</td>
              <td>{formatTimeRemaining(competition.startsAt, competition.endsAt)}</td>
              <td>
                <JoinCompetitionButton />
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

export default MainList;
