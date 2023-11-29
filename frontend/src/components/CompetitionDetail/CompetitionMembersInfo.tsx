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
        <p className={contentStyle}>{host}</p>
      </div>

      <div className={containerStyle}>
        <header className={headerStyle}>대회 참여자</header>
        <p className={contentStyle}>{formattedMembers}</p>
      </div>
    </section>
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
