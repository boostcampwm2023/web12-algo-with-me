import { css } from '@style/css';

import { CompetitionInfo } from '@/apis/competitions';

import JoinCompetitionButton from '../Main/Buttons/JoinCompetitionButton';
import EnterCompetitionButton from './Buttons/EnterCompetitionButton';
import CompetitionDetailInfo from './CompetitionDetailInfo';

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
  const formattedParticipants = competition.participants.join(', ');

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

      <div className={containerStyle}>
        <div className={headerStyle}>대회 생성자</div>
        <div className={contentStyle}>{competition.host}</div>
      </div>

      <div className={containerStyle}>
        <div className={headerStyle}>대회 참여자</div>
        <div className={contentStyle}>{formattedParticipants}</div>
      </div>
    </div>
  );
}

const containerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '16px',
  padding: '16px',
  border: '1px solid #ccc',
});

const headerStyle = css({
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '8px',
});

const contentStyle = css({
  fontSize: '16px',
});

const buttonContainerStyle = css({
  display: 'flex',
  gap: '16px',
});
