import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import storage from '@/utils/storage';

const ACCESS_TOKEN = 'accessToken';

export default function Main() {
  // TODO 임시 메인 페이지 나중에 메인 페이지가 생기면 로직 분리

  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get(ACCESS_TOKEN) as string;

    if (!accessToken) return;
    storage.set(ACCESS_TOKEN, accessToken);
    // Todo main 페이지로 일단은 보내고, 나중에 로그인 버튼을 누른 페이지 정보[a]를 저장했다가
    // 토큰이 오면 토큰을 저장하고, 누른 페이지 정보[a]를 다시 꺼내서 navigate(a) 해 주자.
    console.log('서버에서 온 accessToken', accessToken);
  }, []);

  return (
    <div>
      임시 메인 페이지
      <Link to="/login">로그인</Link>
    </div>
  );
}
