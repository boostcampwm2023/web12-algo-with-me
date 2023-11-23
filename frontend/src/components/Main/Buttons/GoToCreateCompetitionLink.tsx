import { Link } from 'react-router-dom';

export default function GoToCreateCompetitionLink() {
  // TODO: 로그인 여부에 따른 페이지 이동 설정

  return (
    <Link to="/contest/create">
      <button>대회 생성</button>
    </Link>
  );
}
