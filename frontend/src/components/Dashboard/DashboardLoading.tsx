import { css } from '@style/css';

import { Text } from '../Common';
import Loading from '../Common/Loading';

export default function DashboardLoading() {
  return (
    <div className={pageStyle}>
      <Text className={textStyle} type="display">
        대회 종료 후 5분 뒤에 집계가 완료됩니다
      </Text>
      <Loading size={'60px'} color={'#FFF'} />
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

const textStyle = css({
  marginBottom: '20px',
});
