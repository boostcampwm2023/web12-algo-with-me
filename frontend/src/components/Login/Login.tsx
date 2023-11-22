import { css } from '@style/css';

export default function LogIn() {
  const handleLogIn = async () => {
    try {
      window.location.href = 'http://101.101.208.240:3000/auths/github';
    } catch (e) {
      const error = e as Error;
      console.error(error.message);
    }
  };

  return (
    <section className={loginWrapperStyle}>
      <header className={loginHeaderStyle}>Algo With Me</header>
      <button onClick={handleLogIn}>Github으로 로그인</button>
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
