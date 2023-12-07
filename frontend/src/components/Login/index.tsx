import { css } from '@style/css';

import { Button } from '@/components/Common';

interface Props {
  onClickLogin: () => void;
}

export default function Login({ onClickLogin }: Props) {
  return (
    <section className={loginWrapperStyle}>
      <header className={loginHeaderStyle}>Algo With Me</header>
      <Button onClick={onClickLogin}>Github으로 로그인</Button>
    </section>
  );
}

const loginWrapperStyle = css({
  border: '1px solid white',
  borderRadius: '10px',
  width: '100%',
  height: '100%',
  maxWidth: '500px',
  maxHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const loginHeaderStyle = css({
  fontSize: '3rem',
  fontWeight: 'bold',
  textAlign: 'center',
  padding: '1rem',
});
