import { Link } from 'react-router-dom';

export default function ViewDashboardButton(props: { id: number }) {
  const targetLink = `/contest/dashboard/${props.id}`;
  return (
    <div>
      <Link to={targetLink}>
        <button>대시보드 보기</button>
      </Link>
    </div>
  );
}
