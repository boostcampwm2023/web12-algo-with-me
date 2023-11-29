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
  const formattedParticipants = competition.participants.join(', ');

  return (
    <div>
      <CompetitionDetailInfo
        competition={competition}
        text={AFTER_COMPETITION_TEXT}
        competitionSchedule={competitionSchedule}
      />

      <ProblemList competitionId={competitionId} />

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
