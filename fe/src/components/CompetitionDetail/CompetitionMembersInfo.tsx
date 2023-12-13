import { css } from '@style/css';

import { CompetitionInfo } from '@/apis/competitions';

import { Text } from '../Common';

interface Props {
  competition: CompetitionInfo;
}

export default function CompetitionMembersInfo({ competition }: Props) {
  const formattedMembers = competition.participants.join(', ');
  const { maxParticipants, participants, host = 'None' } = competition;

  return (
    <section>
      <div className={containerStyle}>
        <Text type="title" size="lg">
          운영진
        </Text>
        <div className={contentContainerStyle}>
          <Text type="body" size="md">
            {host}
          </Text>
        </div>
      </div>

      <div className={containerStyle}>
        <Text type="title" size="lg">
          참가자{' '}
          <small className={css({ color: 'text.light' })}>
            ({participants.length}/{maxParticipants})
          </small>
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
  width: '100%',
  padding: '32px 16px',
  alignItems: 'flex-start',
  borderRadius: '8px',
  background: 'surface.alt',
});
