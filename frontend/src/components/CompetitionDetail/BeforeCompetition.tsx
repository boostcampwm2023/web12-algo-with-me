import { css } from '@style/css';

import { CompetitionInfo } from '@/apis/competitions';

import JoinCompetitionButton from '../Main/Buttons/JoinCompetitionButton';
import CompetitionDetailInfo from './CompetitionDetailInfo';
import CompetitionMembersInfo from './CompetitionMembersInfo';

interface Props {
  competitionId: number;
  competition: CompetitionInfo;
  competitionSchedule: string;
}

export default function BeforeCompetition({ competitionId, competition }: Props) {
  const BEFORE_COMPETITION_TEXT = `시작 전`;

  return (
    <div>
      <CompetitionDetailInfo competition={competition} />
      <div className={statusTextContainerStyle}>
        <span className={statusTextStyle}>{BEFORE_COMPETITION_TEXT}</span>
      </div>

      <div className={buttonContainerStyle}>
        <button className={enterButtonStyle}>
          <span className={enterButtonTextStyle}>대회 입장</span>
        </button>
        <JoinCompetitionButton id={competitionId} />
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
  border: '1px solid var(--alert-info-default, #C8CDD0)',
  background: 'var(--alert-info-dark, #444749)',
});

const statusTextStyle = css({
  color: 'var(--surface-light, #D9D9D9)',
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

const enterButtonStyle = css({
  display: 'flex',
  padding: '12px 32px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '8px',
  background: 'var(--surface-default, #37474F)',
});

const enterButtonTextStyle = css({
  color: 'var(--text-light, rgba(250, 250, 250, 0.60))',
  textAlign: 'center',
  fontFamily: 'Inter',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: 'normal',
});
