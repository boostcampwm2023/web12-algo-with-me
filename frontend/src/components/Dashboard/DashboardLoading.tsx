import { css } from '@style/css';

import { Text } from '../Common';

export default function DashboardLoading() {
  return (
    <div className={pageStyle}>
      <Text type="display">대회 종료 후 5분 뒤에 집계가 완료됩니다</Text>
      <div className={loadingIconStyle}></div>
    </div>
  );
}

const pageStyle = css({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--Background, #263238)',
  color: '#fff',
});

const loadingIconStyle = css({
  width: '50px',
  height: '50px',
  border: '8px solid #fff',
  borderTop: '8px solid transparent',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  marginTop: '20px',
});
