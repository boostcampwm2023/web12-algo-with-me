import { css } from '@style/css';

import { CompetitionInfo } from '@/apis/competitions';

import JoinCompetitionButton from '../Main/Buttons/JoinCompetitionButton';
import EnterCompetitionButton from './Buttons/EnterCompetitionButton';

interface Props {
  competitionId: number;
  competition: CompetitionInfo;
  startsAt: Date;
}

export default function BeforeCompetition({ competitionId, competition, startsAt }: Props) {
  return (
    <div className={containerStyle}>
      <span className={competitionNameStyle}>{competition.name}</span>
      <span className={statusTextStyle}> 대회 시작 전</span>
      <JoinCompetitionButton id={competitionId} />
      <EnterCompetitionButton id={competitionId} startsAt={startsAt} />
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
