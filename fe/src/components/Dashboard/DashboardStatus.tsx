import { css } from '@style/css';

import { HStack, Text } from '../Common';

interface Props {
  competitionName: string;
  competitionStatusText: string;
}

export default function DashboardStatus({ competitionName, competitionStatusText }: Props) {
  return (
    <HStack className={textContainerStyle}>
      <Text type="display" size="lg" className={competitionNameStyle}>
        {competitionName}
      </Text>
      <Text type="title" size="lg">
        {competitionStatusText}
      </Text>
    </HStack>
  );
}

const textContainerStyle = css({
  textAlign: 'center',
  gap: '10px',
  marginTop: '56px',
  marginBottom: '47px',
});

const competitionNameStyle = css({
  display: 'flex',
  height: '116px',
  flexDirection: 'column',
  justifyContent: 'center',
});
