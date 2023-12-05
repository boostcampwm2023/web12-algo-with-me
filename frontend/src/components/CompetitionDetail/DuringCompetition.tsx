import { CompetitionInfo } from '@/apis/competitions';

import ViewDashboardButton from '../Main/Buttons/ViewDashboardButton';
import EnterCompetitionButton from './Buttons/EnterCompetitionButton';
import CompetitionDetailInfo from './CompetitionDetailInfo';
import CompetitionMembersInfo from './CompetitionMembersInfo';
import { buttonContainerStyle, statusTextContainerStyle, statusTextStyle } from './styles/styles';

interface Props {
  competitionId: number;
  competition: CompetitionInfo;
  startsAt: Date;
  endsAt: Date;
  competitionSchedule: string;
}

const DURING_COMPETITION_TEXT = ' 진행중';

export default function DuringCompetition({ competitionId, competition, startsAt, endsAt }: Props) {
  return (
    <div>
      <CompetitionDetailInfo competition={competition} />
      <div className={statusTextContainerStyle}>
        <span className={statusTextStyle}>{DURING_COMPETITION_TEXT}</span>
      </div>
      <div className={buttonContainerStyle}>
        <EnterCompetitionButton id={competitionId} startsAt={startsAt} endsAt={endsAt} />
        <ViewDashboardButton competitionId={competitionId} />
      </div>
      <CompetitionMembersInfo competition={competition} />
    </div>
  );
}
