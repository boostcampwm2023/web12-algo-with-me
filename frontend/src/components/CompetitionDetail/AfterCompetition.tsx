import { CompetitionInfo } from '@/apis/competitions';

import { Chip } from '../Common';
import { Text } from '../Common';
import ViewDashboardButton from '../Main/Buttons/ViewDashboardButton';
import CompetitionDetailInfo from './CompetitionDetailInfo';
import CompetitionMembersInfo from './CompetitionMembersInfo';
import ProblemList from './ProblemList';
import { buttonContainerStyle, statusTextStyle } from './styles/styles';

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
          <span className={statusTextStyle}>{AFTER_COMPETITION_TEXT}</span>
        </Text>
      </Chip>
      <div className={buttonContainerStyle}>
        <ViewDashboardButton competitionId={competitionId} />
      </div>

      <ProblemList competitionId={competitionId} />
      <CompetitionMembersInfo competition={competition} />
    </div>
  );
}
