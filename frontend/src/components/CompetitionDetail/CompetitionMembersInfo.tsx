import { css } from '@style/css';

import { CompetitionInfo } from '@/apis/competitions';

interface Props {
  competition: CompetitionInfo;
}

export default function CompetitionMembersInfo({ competition }: Props) {
  const formattedMembers = competition.participants.join(', ');
  const host = competition.host || 'None';

  return (
    <section>
      <div className={containerStyle}>
        <header className={headerStyle}>대회 생성자</header>
        <div className={contentContainerStyle}>
          <p className={contentStyle}>{host}</p>
        </div>
      </div>

      <div className={containerStyle}>
        <header className={headerStyle}>대회 참여자</header>
        <div className={contentContainerStyle}>
          <p className={contentStyle}>{formattedMembers}</p>
        </div>
      </div>
    </section>
  );
}

const containerStyle = css({
  display: 'flex',
  width: '900px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '16px',
});

const headerStyle = css({
  color: '#FFF',
  fontFamily: 'Inter',
  fontSize: '22px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: 'normal',
});

const contentStyle = css({
  color: '#FFF',
  fontFamily: 'Inter',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: 'normal',
});

const contentContainerStyle = css({
  display: 'flex',
  width: '900px',
  padding: '32px 16px',
  alignItems: 'flex-start',
  borderRadius: '8px',
  background: 'var(--border-default, #455A64)',
});
