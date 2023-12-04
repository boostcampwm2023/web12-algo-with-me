import { css } from '@style/css';

import { CompetitionInfo } from '@/apis/competitions';

import ViewDashboardButton from '../Main/Buttons/ViewDashboardButton';
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

const DURING_COMPETITION_TEXT = ' 진행중';

export default function DuringCompetition({ competitionId, competition, startsAt, endsAt }: Props) {
  return (
    <div>
      <CompetitionDetailInfo competition={competition} />
      <div className={statusTextContainerStyle}>
        <span className={statusTextStyle}>{DURING_COMPETITION_TEXT}</span>
      </div>
      <div className={buttonContainerStyle}>
        <EnterCompetitionButton id={competitionId} startsAt={startsAt} endsAt={endsAt} />
        <ViewDashboardButton competitionId={competitionId} />
      </div>
      <CompetitionMembersInfo competition={competition} />
    </div>
  );
}

const statusTextContainerStyle = css({
  display: 'inline-flex',
  padding: '4px 16px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '999px',
  border: '1px solid var(--alert-info-default, #82DD55)',
  background: 'var(--alert-success-dark, #355A23)',
});

const statusTextStyle = css({
  color: '#FFF',
  fontFamily: 'Inter',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: 'normal',
});

const buttonContainerStyle = css({
  display: 'flex',
  width: '900px',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '10px',
});
