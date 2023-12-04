import { css } from '@style/css';

import { CompetitionInfo } from '@/apis/competitions';

interface Props {
  competition: CompetitionInfo;
}

export default function CompetitionDetailInfo({ competition }: Props) {
  return (
    <div className={infoContainerStyle}>
      <div>
        <span className={competitionNameStyle}>{competition.name}</span>
      </div>
      <span className={additionalTextStyle}>{competition.detail}</span>
    </div>
  );
}

const infoContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
});

const competitionNameStyle = css({
  color: '#FFF',
  fontFamily: 'Inter',
  fontSize: '57px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: 'normal',
});

const additionalTextStyle = css({
  color: '#FFF',
  fontFamily: 'Inter',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: 'normal',
});
