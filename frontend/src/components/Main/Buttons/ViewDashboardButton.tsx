import { Link } from 'react-router-dom';

export default function ViewDashboardButton(props: { id: number }) {
  const dashboardLink = `/contest/dashboard/${props.id}`;
  return (
    <Link to={dashboardLink}>
      <button>대시보드 보기</button>
    </Link>
  );
}
