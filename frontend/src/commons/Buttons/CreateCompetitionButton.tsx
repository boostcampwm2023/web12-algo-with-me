import { useNavigate } from 'react-router-dom';

export default function CreateCompetitionButton() {
  // TODO: 로그인 여부에 따른 페이지 이동 설정
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/contest/create');
  };

  return (
    <div>
      <button onClick={handleClick}>대회 생성</button>
    </div>
  );
}
