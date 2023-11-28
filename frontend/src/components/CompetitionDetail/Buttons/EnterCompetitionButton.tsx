import { useNavigate } from 'react-router-dom';

import useAuth from '@/hooks/login/useAuth';

interface Props {
  id: number;
  startsAt: Date;
  endsAt: Date;
}

export default function EnterCompetitionButton({ id, startsAt, endsAt }: Props) {
  const competitionLink = `/contest/${id}`;
  const { isLoggedin } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    const currentTime = new Date();

    if (!isLoggedin) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    } else if (currentTime < startsAt) {
      alert('아직 대회가 시작되지 않았습니다. 다시 시도해주세요');
      window.location.reload();
    } else if (currentTime >= endsAt) {
      alert('해당 대회는 종료되었습니다.');
      window.location.reload();
    } else {
      navigate(competitionLink);
    }
  };

  return <button onClick={handleNavigate}>대회 입장</button>;
}
