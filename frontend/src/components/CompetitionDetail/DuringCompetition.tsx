import { css } from '@style/css';

import { CompetitionInfo } from '@/apis/competitions';

import EnterCompetitionButton from './Buttons/EnterCompetitionButton';
import CompetitionDetailInfo from './CompetitionDetailInfo';

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
    <div className={containerStyle}>
      <CompetitionDetailInfo
        competition={competition}
        text={DURING_COMPETITION_TEXT}
        competitionSchedule={competitionSchedule}
      />
      <EnterCompetitionButton id={competitionId} startsAt={startsAt} endsAt={endsAt} />
    </div>
  );
}

const containerStyle = css({
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
  border: '1px solid #ccc',
});
