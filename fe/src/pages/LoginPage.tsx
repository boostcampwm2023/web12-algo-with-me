import { css } from '@style/css';

import { Button, HStack, Logo } from '@/components/Common';
import { PageLayout } from '@/components/Layout';

const GITHUB_AUTH_URL = import.meta.env.VITE_GITHUB_AUTH_URL;

export function LoginPage() {
  const handleLogin = () => {
    try {
      window.location.href = GITHUB_AUTH_URL;
    } catch (e) {
      const error = e as Error;
      console.error(error.message);
    }
  };

  return (
    <PageLayout className={style}>
      <HStack as="section" className={loginWrapperStyle}>
        <Logo size="220px" />
        <header className={loginHeaderStyle}>Algo With Me</header>
        <Button theme="brand" className={loginButtonStyle} onClick={handleLogin}>
          Github으로 로그인
        </Button>
      </HStack>
    </PageLayout>
  );
}

const style = css({ position: 'relative' });

const loginWrapperStyle = css({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  top: '180px',
  width: '900px',
  margin: '0 auto',
  height: '100%',
  alignItems: 'center',
});

const loginHeaderStyle = css({
  fontSize: '3rem',
  fontWeight: 'bold',
  textAlign: 'center',
  padding: '1rem',
});

const loginButtonStyle = css({
  width: '300px',
});
