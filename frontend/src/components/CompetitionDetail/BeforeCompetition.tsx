import { css } from '@style/css';

import { CompetitionInfo } from '@/apis/competitions';

import JoinCompetitionButton from '../Main/Buttons/JoinCompetitionButton';
import CompetitionDetailInfo from './CompetitionDetailInfo';
import CompetitionMembersInfo from './CompetitionMembersInfo';
import { buttonContainerStyle, statusTextContainerStyle, statusTextStyle } from './styles/styles';

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
