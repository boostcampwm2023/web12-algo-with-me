import { css } from '@style/css';

import { Link } from 'react-router-dom';

import { Button, Space, Text, VStack } from '@/components/Common';
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
    <header className={headerWrapperStyle}>
      <VStack className={headerStyle}>
        <Link to="/">
          <Logo size="48px" />
        </Link>
        <Link to="/">
          <Text.Title bold size="lg" className={textStyle}>
            Algo With Me
          </Text.Title>
        </Link>
        <Space />
        {isLoggedin ? (
          <Button className={buttonStyle} theme="brand" onClick={handleLogout}>
            <Text.Body size="lg">로그아웃</Text.Body>
          </Button>
        ) : (
          <Button className={buttonStyle} theme="brand" onClick={handleLogin}>
            <Text.Body size="lg">로그인</Text.Body>
          </Button>
        )}
      </VStack>
    </header>
  );
}

const headerWrapperStyle = css({
  width: '100%',
  height: '4rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'surface',
});

const headerStyle = css({
  paddingY: '0.5rem',
  height: '40px',
  width: '100%',
  maxWidth: '1200px',
  alignItems: 'center',
  gap: '1rem',
});

const textStyle = css({
  color: 'text',
});

const buttonStyle = css({
  width: '120px',
});
