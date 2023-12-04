import { css } from '@style/css';

import { CompetitionInfo } from '@/apis/competitions';

import ViewDashboardButton from '../Main/Buttons/ViewDashboardButton';
import CompetitionDetailInfo from './CompetitionDetailInfo';
import CompetitionMembersInfo from './CompetitionMembersInfo';
import ProblemList from './ProblemList';

interface Props {
  competitionId: number;
  competition: CompetitionInfo;
}

const AFTER_COMPETITION_TEXT = ' 종료';

export default function AfterCompetition({ competitionId, competition }: Props) {
  return (
    <div>
      <CompetitionDetailInfo competition={competition} />
      <div className={statusTextContainerStyle}>
        <span className={statusTextStyle}>{AFTER_COMPETITION_TEXT}</span>
      </div>
      <div className={buttonContainerStyle}>
        <ViewDashboardButton competitionId={competitionId} />
      </div>

      <ProblemList competitionId={competitionId} />
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
  border: '1px solid var(--alert-error-default, #E23636)',
  background: 'var(--alert-error-dark, #751919)',
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
