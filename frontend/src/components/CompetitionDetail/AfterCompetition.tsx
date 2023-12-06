import { CompetitionInfo } from '@/apis/competitions';

import { Chip, Text, VStack } from '../Common';
import ViewDashboardButton from '../Main/Buttons/ViewDashboardButton';
import CompetitionDetailInfo from './CompetitionDetailInfo';
import CompetitionMembersInfo from './CompetitionMembersInfo';
import ProblemList from './ProblemList';
import { buttonContainerStyle } from './styles/styles';

interface Props {
  competitionId: number;
  competition: CompetitionInfo;
}

const AFTER_COMPETITION_TEXT = ' 종료';

export default function AfterCompetition({ competitionId, competition }: Props) {
  return (
    <div>
      <CompetitionDetailInfo competition={competition} />
      <Chip theme="danger">
        <Text type="label" size="md">
          {AFTER_COMPETITION_TEXT}
        </Text>
      </Chip>
      <VStack className={buttonContainerStyle}>
        <ViewDashboardButton competitionId={competitionId} />
      </VStack>
      <ProblemList competitionId={competitionId} />
      <CompetitionMembersInfo competition={competition} />
    </div>
  );
}
