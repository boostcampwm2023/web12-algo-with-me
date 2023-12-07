import { css, cx } from '@style/css';

import { HTMLAttributes } from 'react';

import { CompetitionInfo } from '@/apis/competitions';
import { formatDate } from '@/utils/date';

import { Chip, Space, Text, VStack } from '../Common';
import ViewDashboardButton from '../Main/Buttons/ViewDashboardButton';
import EnterCompetitionButton from './Buttons/EnterCompetitionButton';
import { Card } from './Card';
import CompetitionDetailInfo from './CompetitionDetailInfo';
import CompetitionMembersInfo from './CompetitionMembersInfo';
import { buttonContainerStyle } from './styles/styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
  competitionId: number;
  competition: CompetitionInfo;
}

const DURING_COMPETITION_TEXT = '진행 중';

export default function DuringCompetition({
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
        <Chip theme="success">
          <Text type="label" size="md">
            {DURING_COMPETITION_TEXT}
          </Text>
        </Chip>
        <Space />
        <EnterCompetitionButton id={competitionId} startsAt={startsAt} endsAt={endsAt} />
        <ViewDashboardButton competitionId={competitionId} />
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
