import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import JoinCompetitionButton from '@/components/Main/Buttons/JoinCompetitionButton';
import ViewDashboardButton from '@/components/Main/Buttons/ViewDashboardButton';
import secToTime from '@/utils/secToTime';

import axios from 'axios';

interface Competition {
  id: number;
  name: string;
  startsAt: string;
  endsAt: string;
  maxParticipants: number;
}

const apiUrl = import.meta.env.VITE_API_URL;

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

  const fetchCompetitionList = async () => {
    try {
      const response = await axios.get<Competition[]>(`${apiUrl}competitions`);
      setCompetitions(response.data);
    } catch (error) {
      console.error('Error fetching competitions:', (error as Error).message);
    }
  };

  useEffect(() => {
    fetchCompetitionList();
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
              <td>
                <Link to={getCompetitionDetailURL(competition.id)}>{competition.name}</Link>
              </td>
              <td>{new Date(competition.startsAt).toLocaleString()}</td>
              <td>{new Date(competition.endsAt).toLocaleString()}</td>
              <td>{formatTimeRemaining(competition.startsAt, competition.endsAt)}</td>
              <td>
                {competition.startsAt > new Date().toISOString() && (
                  <JoinCompetitionButton id={competition.id} />
                )}
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
