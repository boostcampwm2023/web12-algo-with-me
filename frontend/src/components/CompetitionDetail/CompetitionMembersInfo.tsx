import { css } from '@style/css';

interface Props {
  host: string;
  members: string[];
}

export default function CompetitionMembersInfo({ host, members }: Props) {
  const formattedMembers = members.join(', ');

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
