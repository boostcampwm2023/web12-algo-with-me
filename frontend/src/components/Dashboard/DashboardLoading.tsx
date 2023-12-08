import { css } from '@style/css';

import { Loading, Text } from '@/components/Common';

import Header from '../Header';
import { PageLayout } from '../Layout/PageLayout';

export default function DashboardLoading() {
  return (
    <>
      <Header />
      <PageLayout className={pageStyle}>
        <Text className={textStyle} type="display">
          대회 종료 후 5분 뒤에 집계가 완료됩니다
        </Text>
        <Loading size={'60px'} color={'#FFF'} />
      </PageLayout>
    </>
  );
}

const pageStyle = css({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const textStyle = css({
  marginBottom: '20px',
});
