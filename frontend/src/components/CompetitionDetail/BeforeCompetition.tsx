import { css, cx } from '@style/css';

import { HTMLAttributes } from 'react';

import { CompetitionInfo } from '@/apis/competitions';
import { Card } from '@/components/Common';
import { formatDate } from '@/utils/date';

import { Button, Chip, Space, Text, VStack } from '../Common';
import JoinCompetitionButton from './Buttons/JoinCompetitionButton';
import CompetitionDetailInfo from './CompetitionDetailInfo';
import CompetitionMembersInfo from './CompetitionMembersInfo';
import { buttonContainerStyle } from './styles/styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
  competitionId: number;
  competition: CompetitionInfo;
}

const BEFORE_COMPETITION_TEXT = `시작 전`;

export default function BeforeCompetition({
  className,
  competitionId,
  competition,
  ...props
}: Props) {
  const startsAt = new Date(competition?.startsAt || '');
  const endsAt = new Date(competition?.endsAt || '');

  return (
    <div className={cx(className)} {...props}>
      <CompetitionDetailInfo className={css({ marginBottom: '3rem' })} competition={competition} />
      <VStack className={buttonContainerStyle}>
        <Chip theme="info">
          <Text type="label" size="md">
            {BEFORE_COMPETITION_TEXT}
          </Text>
        </Chip>
        <Space />
        <Button disabled>대회 입장</Button>
        <JoinCompetitionButton id={competitionId} />
      </VStack>
      <VStack
        className={css({
          justifyContent: 'space-between',
        })}
      >
        <Card className={css({ width: '420px', textAlign: 'center' })}>
          시작 시간: {formatDate(new Date(startsAt), 'YYYY. MM. DD. hh:mm')}
        </Card>
        <Card className={css({ width: '420px', textAlign: 'center' })}>
          종료 시간: {formatDate(new Date(endsAt), 'YYYY. MM. DD. hh:mm')}
        </Card>
      </VStack>
      <CompetitionMembersInfo competition={competition} />
    </div>
  );
}
