import { css } from '@style/css';

import { CompetitionInfo } from '@/apis/competitions';

import { Text } from '../Common';

interface Props {
  competition: CompetitionInfo;
}

export default function CompetitionMembersInfo({ competition }: Props) {
  const formattedMembers = competition.participants.join(', ');
  const host = competition.host || 'None';

  return (
    <section>
      <div className={containerStyle}>
        <Text type="title" size="lg" className={headerTextstyle}>
          운영진
        </Text>
        <div className={contentContainerStyle}>
          <Text type="body" size="md">
            {host}
          </Text>
        </div>
      </div>

      <div className={containerStyle}>
        <Text type="title" size="lg" className={headerTextstyle}>
          참가자
        </Text>
        <div className={contentContainerStyle}>
          <Text type="body" size="md">
            {formattedMembers}
          </Text>
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
  marginTop: '60px',
});

const contentContainerStyle = css({
  display: 'flex',
  width: '900px',
  padding: '32px 16px',
  alignItems: 'flex-start',
  borderRadius: '8px',
  background: 'var(--border-default, #455A64)',
});

const headerTextstyle = css({
  fontSize: '22px',
});
