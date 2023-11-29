import { CompetitionInfo } from '@/apis/competitions';

import CompetitionDetailInfo from './CompetitionDetailInfo';
import CompetitionMembersInfo from './CompetitionMembersInfo';
import ProblemList from './ProblemList';

interface Props {
  competitionId: number;
  competition: CompetitionInfo;
  competitionSchedule: string;
}

const AFTER_COMPETITION_TEXT = ' 종료';

export default function AfterCompetition({
  competitionId,
  competition,
  competitionSchedule,
}: Props) {
  return (
    <div>
      <CompetitionDetailInfo
        competition={competition}
        text={AFTER_COMPETITION_TEXT}
        competitionSchedule={competitionSchedule}
      />

      <ProblemList competitionId={competitionId} />
      <CompetitionMembersInfo host={competition.host} members={competition.participants} />
    </div>
  );
}
