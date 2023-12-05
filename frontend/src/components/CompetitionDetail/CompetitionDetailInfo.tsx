import { css } from '@style/css';

import { CompetitionInfo } from '@/apis/competitions';

import { Text } from '../Common';

interface Props {
  competition: CompetitionInfo;
}

export default function CompetitionDetailInfo({ competition }: Props) {
  return (
    <div className={infoContainerStyle}>
      <div>
        <Text type="display" size="lg">
          {competition.name}
        </Text>
      </div>
      <Text type="body" size="md">
        {competition.detail}
      </Text>
    </div>
  );
}

const infoContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginBottom: '16px',
});
