import { css } from '@style/css';

import { CompetitionInfo } from '@/apis/competitions';

import EnterCompetitionButton from './Buttons/EnterCompetitionButton';

interface Props {
  competitionId: number;
  competition: CompetitionInfo;
}

export default function DuringCompetition({ competitionId, competition }: Props) {
  return (
    <div className={containerStyle}>
      <span className={competitionNameStyle}>{competition.name}</span>
      <span className={statusTextStyle}> 진행중</span>
      <EnterCompetitionButton id={competitionId} />
    </div>
  );
}

const containerStyle = css({
  display: 'flex',
  alignItems: 'center',
});

const competitionNameStyle = css({
  fontSize: '18px',
  fontWeight: 'bold',
  color: 'black',
  marginRight: '8px',
});

const statusTextStyle = css({
  fontSize: '12px',
  color: 'gray',
});
