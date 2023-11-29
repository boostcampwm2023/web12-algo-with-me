import { css } from '@style/css';

import { CompetitionInfo } from '@/apis/competitions';

import CompetitionDetailInfo from './CompetitionDetailInfo';
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
    <div className={containerStyle}>
      <CompetitionDetailInfo
        competition={competition}
        text={AFTER_COMPETITION_TEXT}
        competitionSchedule={competitionSchedule}
      />
      <ProblemList competitionId={competitionId} />
    </div>
  );
}

const containerStyle = css({
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
  border: '1px solid #ccc',
});
