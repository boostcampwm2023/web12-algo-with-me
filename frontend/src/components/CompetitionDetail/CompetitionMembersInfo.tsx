import { css } from '@style/css';

interface Props {
  host: string;
  members: string[];
}

export default function CompetitionMembersInfo({ host, members }: Props) {
  const formattedMembers = members.join(', ');

  return (
    <div>
      <div className={containerStyle}>
        <div className={headerStyle}>대회 생성자</div>
        <div className={contentStyle}>{host}</div>
      </div>

      <div className={containerStyle}>
        <div className={headerStyle}>대회 참여자</div>
        <div className={contentStyle}>{formattedMembers}</div>
      </div>
    </div>
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
