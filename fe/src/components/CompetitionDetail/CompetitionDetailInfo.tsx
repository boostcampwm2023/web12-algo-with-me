import { css, cx } from '@style/css';

import { HTMLAttributes } from 'react';

import { CompetitionInfo } from '@/apis/competitions';

import { Text } from '../Common';

interface Props extends HTMLAttributes<HTMLDivElement> {
  competition: CompetitionInfo;
}

export default function CompetitionDetailInfo({ competition, className, ...props }: Props) {
  return (
    <div className={cx(infoContainerStyle, className)} {...props}>
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
});
