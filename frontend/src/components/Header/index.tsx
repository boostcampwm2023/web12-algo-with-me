import { css } from '@style/css';

import { useEffect } from 'react';

import Logo from '@/components/Common/Logo';
import useAuth from '@/hooks/login/useAuth';

export default function Header() {
  const { changeLoginInfo, changeLogoutInfo, isLogin } = useAuth();

  useEffect(() => {
    console.log(isLogin, '로그인 정보 확인용입니다.');
  }, [isLogin]);

  const handleLogin = () => {
    changeLoginInfo();
  };

  const handleLogout = () => {
    changeLogoutInfo();
  };

  return (
    <header className={headerStyle}>
      <Logo size="36px" />
      {isLogin ? (
        <button onClick={handleLogout}> 로그아웃 </button>
      ) : (
        <button onClick={handleLogin}> 로그인 </button>
      )}
    </header>
  );
}

const headerStyle = css({
  width: '100%',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});
