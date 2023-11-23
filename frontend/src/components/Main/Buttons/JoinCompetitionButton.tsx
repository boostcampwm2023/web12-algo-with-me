import { joinCompetition } from '@/apis/joinCompetition';
import type { CompetitionApiData } from '@/apis/joinCompetition/types';
import useAuth from '@/hooks/login/useAuth';

const TOKEN_KEY = 'accessToken';

export default function JoinCompetitionButton(props: { id: number }) {
  const { isLoggedin } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);

  const handleJoinClick = async () => {
    if (!isLoggedin) {
      alert('로그인이 필요합니다.');
      window.location.href = '/login';
      return;
    }
  };
  const competitionData: CompetitionApiData = {
    apiUrl: apiUrl,
    id: props.id,
    token: token,
  };

  joinCompetition(competitionData);

  return <button onClick={handleJoinClick}>참여하기</button>;
}
