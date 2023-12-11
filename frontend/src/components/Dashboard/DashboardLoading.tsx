import { css } from '@style/css';

import { HStack, Loading, Text } from '@/components/Common';
import { useRemainingTimeCounter } from '@/hooks/dashboard';

import Header from '../Header';
import { PageLayout } from '../Layout/PageLayout';

interface Props {
  endsAt: string;
}

export default function DashboardLoading({ endsAt }: Props) {
  const remainingTime = useRemainingTimeCounter(new Date(endsAt));

  return (
    <>
      <Header />
      <PageLayout className={pageStyle}>
        <HStack className={textContainerStyle}>
          <Text className={textStyle} type="display">
            대회 종료 후 5분 뒤에 집계가 완료됩니다
          </Text>
          <Text className={textStyle} type="title">
            남은 시간: {remainingTime}
          </Text>
        </HStack>
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

const textContainerStyle = css({
  alignItems: 'center',
});

const textStyle = css({
  marginBottom: '20px',
});
