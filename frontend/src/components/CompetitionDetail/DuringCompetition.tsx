import { CompetitionInfo } from '@/apis/competitions';

import EnterCompetitionButton from './Buttons/EnterCompetitionButton';
import CompetitionDetailInfo from './CompetitionDetailInfo';
import CompetitionMembersInfo from './CompetitionMembersInfo';

interface Props {
  competitionId: number;
  competition: CompetitionInfo;
  startsAt: Date;
  endsAt: Date;
  competitionSchedule: string;
}

const DURING_COMPETITION_TEXT = ' 진행중';

export default function DuringCompetition({
  competitionId,
  competition,
  startsAt,
  endsAt,
  competitionSchedule,
}: Props) {
  return (
    <div>
      <CompetitionDetailInfo
        competition={competition}
        text={DURING_COMPETITION_TEXT}
        competitionSchedule={competitionSchedule}
      />

      <EnterCompetitionButton id={competitionId} startsAt={startsAt} endsAt={endsAt} />

      <CompetitionMembersInfo host={competition.host} members={competition.participants} />
    </div>
  );
}
