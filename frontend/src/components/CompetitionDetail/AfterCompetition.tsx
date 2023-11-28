import { css } from '@style/css';

import { CompetitionInfo } from '@/apis/competitions';

import ProblemList from './ProblemList';

interface Props {
  competitionId: number;
  competition: CompetitionInfo;
}

export default function AfterCompetition({ competitionId, competition }: Props) {
  return (
    <div className={containerStyle}>
      <span className={competitionNameStyle}>{competition.name}</span>
      <span className={statusTextStyle}> 종료</span>
      <ProblemList competitionId={competitionId} />
    </div>
  );
}

const containerStyle = css({
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
