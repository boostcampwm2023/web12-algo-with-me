import { css } from '@style/css';

import { CompetitionInfo } from '@/apis/competitions';

import JoinCompetitionButton from '../Main/Buttons/JoinCompetitionButton';
import EnterCompetitionButton from './Buttons/EnterCompetitionButton';
import CompetitionDetailInfo from './CompetitionDetailInfo';

interface Props {
  competitionId: number;
  competition: CompetitionInfo;
  startsAt: Date;
  competitionSchedule: string;
}

export default function BeforeCompetition({
  competitionId,
  competition,
  startsAt,
  competitionSchedule,
}: Props) {
  const BEFORE_COMPETITION_TEXT = ` 시작 전`;

  return (
    <div className={containerStyle}>
      <CompetitionDetailInfo
        competition={competition}
        text={BEFORE_COMPETITION_TEXT}
        competitionSchedule={competitionSchedule}
      />
      <div className={buttonContainerStyle}>
        <JoinCompetitionButton id={competitionId} />
        <EnterCompetitionButton id={competitionId} startsAt={startsAt} />
      </div>
    </div>
  );
}

const containerStyle = css({
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
  border: '1px solid #ccc',
});

const buttonContainerStyle = css({
  display: 'flex',
  gap: '16px',
});
