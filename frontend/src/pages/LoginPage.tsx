import Login from '@/components/Login';

const GITHUB_AUTH_URL = 'http://101.101.208.240:3000/auths/github';

export default function LoginPage() {
  // 넘겨주는 함수는 handle, 함수를 넘길 때의 프로펄티 네임은 on
  const handleLogin = () => {
    try {
      window.location.href = GITHUB_AUTH_URL;
    } catch (e) {
      const error = e as Error;
      console.error(error.message);
    }
  };

  return <Login onClickLogin={handleLogin} />;
}
