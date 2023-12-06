import { css } from '@style/css';

import { Button, Text, VStack } from '@/components/Common';
import Logo from '@/components/Common/Logo';
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
        <div className={LogoTextBoxStyle}>
          <Logo size="48px" className={LogoStyle} />
          <Text.Title bold size="lg" className={textStyle}>
            Algo With Me
          </Text.Title>
        </div>
        {isLoggedin ? (
          <Button className={buttonStyle} theme="brand" onClick={handleLogout}>
            로그아웃
          </Button>
        ) : (
          <Button className={buttonStyle} theme="brand" onClick={handleLogin}>
            로그인
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
  display: 'flex',
  width: '100%',
  maxWidth: '1200px',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const LogoTextBoxStyle = css({
  display: 'table',
});

const LogoStyle = css({
  display: 'inline',
  marginRight: '16px',
});

const textStyle = css({
  color: 'text',
  display: 'table-cell',
  verticalAlign: 'middle',
});

const buttonStyle = css({
  display: 'flex',
  width: '120px',
  padding: '12px 32px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  flexShrink: 0,
});
