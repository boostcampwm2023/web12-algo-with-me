import { CompetitionInfo } from '@/apis/competitions';

import { Chip, Text, VStack } from '../Common';
import ViewDashboardButton from '../Main/Buttons/ViewDashboardButton';
import EnterCompetitionButton from './Buttons/EnterCompetitionButton';
import CompetitionDetailInfo from './CompetitionDetailInfo';
import CompetitionMembersInfo from './CompetitionMembersInfo';
import { buttonContainerStyle } from './styles/styles';

interface Props {
  competitionId: number;
  competition: CompetitionInfo;
  startsAt: Date;
  endsAt: Date;
}

const DURING_COMPETITION_TEXT = '진행 중';

export default function DuringCompetition({ competitionId, competition, startsAt, endsAt }: Props) {
  return (
    <div>
      <CompetitionDetailInfo competition={competition} />
      <Chip theme="success">
        <Text type="label" size="md">
          {DURING_COMPETITION_TEXT}
        </Text>
      </Chip>
      <VStack className={buttonContainerStyle}>
        <EnterCompetitionButton id={competitionId} startsAt={startsAt} endsAt={endsAt} />
        <ViewDashboardButton competitionId={competitionId} />
      </VStack>
      <CompetitionMembersInfo competition={competition} />
    </div>
  );
}
