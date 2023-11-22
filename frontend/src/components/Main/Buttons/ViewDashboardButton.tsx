import { useNavigate } from 'react-router-dom';

export default function ViewDashboardButton(props: { id: number }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // 버튼이 클릭되면 /contest/dashboard/:id 주소로 이동
    navigate(`/contest/dashboard/${props.id}`);
  };
  return (
    <div>
      <button onClick={handleClick}>대시보드 보기</button>
    </div>
  );
}
