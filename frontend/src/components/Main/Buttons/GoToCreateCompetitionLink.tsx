import { useNavigate } from 'react-router-dom';

const TOKEN_KEY = 'accessToken';

export default function GoToCreateCompetitionLink() {
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    } else {
      navigate('/contest/create');
    }
  };

  return <button onClick={handleNavigate}>대회 생성</button>;
}
