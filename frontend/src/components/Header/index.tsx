import { css } from '@style/css';

import { Logo } from '@/components/Common';
import useAuth from '@/hooks/login/useAuth';

export default function Header() {
  const { changeLoginInfo, changeLogoutInfo, isLoggedin } = useAuth();

  const handleLogin = () => {
    changeLoginInfo();
  };

  const handleLogout = () => {
    changeLogoutInfo();
  };

  return (
    <header className={headerStyle}>
      <Logo size="36px" />
      {isLoggedin ? (
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
