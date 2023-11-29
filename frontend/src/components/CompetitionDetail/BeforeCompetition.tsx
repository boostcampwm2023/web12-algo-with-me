import { css } from '@style/css';

import { CompetitionInfo } from '@/apis/competitions';

import JoinCompetitionButton from '../Main/Buttons/JoinCompetitionButton';
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

export default function BeforeCompetition({
  competitionId,
  competition,
  startsAt,
  endsAt,
  competitionSchedule,
}: Props) {
  const BEFORE_COMPETITION_TEXT = ` 시작 전`;

  return (
    <div>
      <CompetitionDetailInfo
        competition={competition}
        text={BEFORE_COMPETITION_TEXT}
        competitionSchedule={competitionSchedule}
      />

      <div className={buttonContainerStyle}>
        <JoinCompetitionButton id={competitionId} />
        <EnterCompetitionButton id={competitionId} startsAt={startsAt} endsAt={endsAt} />
      </div>

      <CompetitionMembersInfo host={competition.host} members={competition.participants} />
    </div>
  );
}

const buttonContainerStyle = css({
  display: 'flex',
  gap: '16px',
});
