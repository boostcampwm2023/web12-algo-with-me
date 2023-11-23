import { useNavigate } from 'react-router-dom';

import useAuth from '@/hooks/login/useAuth';

export default function GoToCreateCompetitionLink() {
  const { isLoggedin } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (!isLoggedin) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    } else {
      navigate('/contest/create');
    }
  };

  return <button onClick={handleNavigate}>대회 생성</button>;
}
