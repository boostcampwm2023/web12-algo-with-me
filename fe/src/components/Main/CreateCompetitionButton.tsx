import { css } from '@style/css';

import { Button, Link, Text } from '@/components/Common';
import useAuth from '@/hooks/login/useAuth';

export function CreateCompetitionButton() {
  const { isLoggedin } = useAuth();

  const handleNavigate = () => {
    if (!isLoggedin) {
      alert('로그인이 필요합니다.');
    }
  };

  return (
    <Link to={isLoggedin ? '/competition/create' : '/login'} underline={false}>
      <Button className={buttonStyle} theme="brand" onClick={handleNavigate}>
        <Text.Body className={LinkTextStyle} size="lg">
          대회 생성
        </Text.Body>
      </Button>
    </Link>
  );
}

const buttonStyle = css({
  width: '120px',
});

const LinkTextStyle = css({
  color: 'text',
});
