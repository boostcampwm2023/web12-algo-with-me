import { css, cx } from '@style/css';

import { HTMLAttributes } from 'react';

import { CompetitionInfo } from '@/apis/competitions';
import { Card } from '@/components/Common';
import { formatDate } from '@/utils/date';

import { Chip, Space, Text, VStack } from '../Common';
import { ViewDashboardButton } from '../Main';
import CompetitionDetailInfo from './CompetitionDetailInfo';
import CompetitionMembersInfo from './CompetitionMembersInfo';
import ProblemList from './ProblemList';
import { buttonContainerStyle } from './styles/styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
  competitionId: number;
  competition: CompetitionInfo;
}

const AFTER_COMPETITION_TEXT = ' 종료';

export default function AfterCompetition({
  competitionId,
  competition,
  className,
  ...props
}: Props) {
  const startsAt = new Date(competition?.startsAt || '');
  const endsAt = new Date(competition?.endsAt || '');

  return (
    <div className={cx(className)} {...props}>
      <CompetitionDetailInfo className={css({ marginBottom: '3rem' })} competition={competition} />
      <VStack className={buttonContainerStyle}>
        <Chip theme="danger">
          <Text type="label" size="md">
            {AFTER_COMPETITION_TEXT}
          </Text>
        </Chip>
        <Space />
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
      <ProblemList competitionId={competitionId} />
      <CompetitionMembersInfo competition={competition} />
    </div>
  );
}
