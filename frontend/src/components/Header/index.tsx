import { css } from '@style/css';

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
        <Logo size="48px" />
        <Text.Title bold size="lg" className={textStyle}>
          Algo With Me
        </Text.Title>
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
  height: '64px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'surface',
});

const headerStyle = css({
  height: '40px',
  width: '100%',
  maxWidth: '1200px',
  alignItems: 'center',
  gap: '16px',
});

const textStyle = css({
  color: 'text',
});

const buttonStyle = css({
  display: 'flex',
  width: '120px',
  padding: '12px 20px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  flexShrink: 0,
});
