import { css } from '@style/css';

import { useNavigate } from 'react-router-dom';

import { Button, Text } from '@/components/Common';
import useAuth from '@/hooks/login/useAuth';

export default function GoToCreateCompetitionLink() {
  const { isLoggedin } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (!isLoggedin) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    } else {
      navigate('/contest/create');
    }
  };

  return (
    <Button className={buttonStyle} theme="brand" onClick={handleNavigate}>
      <Text type="body" size="lg">
        대회 생성
      </Text>
    </Button>
  );
}

const buttonStyle = css({
  display: 'flex',
  width: '120px',
  padding: '12px 24px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
});
