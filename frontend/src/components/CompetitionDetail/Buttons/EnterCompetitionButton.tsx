import { useNavigate } from 'react-router-dom';

import useAuth from '@/hooks/login/useAuth';

export default function EnterCompetitionButton(props: { id: number }) {
  const competitionLink = `/contest/${props.id}`;
  const { isLoggedin } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (!isLoggedin) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    } else {
      navigate(competitionLink);
    }
  };

  return <button onClick={handleNavigate}>대회 입장</button>;
}
