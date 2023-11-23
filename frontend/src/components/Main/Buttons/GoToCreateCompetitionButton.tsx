import { Link } from 'react-router-dom';

export default function GoToCreateCompetitionButton() {
  // TODO: 로그인 여부에 따른 페이지 이동 설정

  return (
    <div>
      <Link to="/contest/create">
        <button>대회 생성</button>
      </Link>
    </div>
  );
}
