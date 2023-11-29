import { css } from '@style/css';

import { CompetitionInfo } from '@/apis/competitions';

interface Props {
  competition: CompetitionInfo;
  text: string;
  competitionSchedule: string;
}

export default function CompetitionDetailInfo({ competition, text, competitionSchedule }: Props) {
  return (
    <div className={infoContainerStyle}>
      <div>
        <span className={competitionNameStyle}>{competition.name}</span>
        <span className={statusTextStyle}>{text}</span>
      </div>
      <span className={statusTextStyle}>{competitionSchedule}</span>
      <div className={additionalTextStyle}>{competition.detail}</div>
    </div>
  );
}

const infoContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
});

const competitionNameStyle = css({
  fontSize: '18px',
  fontWeight: 'bold',
  color: 'black',
  marginBottom: '8px',
});

const statusTextStyle = css({
  fontSize: '12px',
  color: 'gray',
  marginBottom: '8px',
});

const additionalTextStyle = css({
  fontSize: '14px',
  color: 'black',
  marginBottom: '8px',
});
