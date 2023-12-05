import { css } from '@style/css';

import { CompetitionInfo } from '@/apis/competitions';

import { Chip } from '../Common';
import { Text } from '../Common';
import { Button } from '../Common';
import JoinCompetitionButton from '../Main/Buttons/JoinCompetitionButton';
import CompetitionDetailInfo from './CompetitionDetailInfo';
import CompetitionMembersInfo from './CompetitionMembersInfo';
import { buttonContainerStyle } from './styles/styles';

interface Props {
  competitionId: number;
  competition: CompetitionInfo;
}

const BEFORE_COMPETITION_TEXT = `시작 전`;

export default function BeforeCompetition({ competitionId, competition }: Props) {
  return (
    <div>
      <CompetitionDetailInfo competition={competition} />
      <Chip theme="info">
        <Text type="label" size="md" className={statusTextStyle}>
          {BEFORE_COMPETITION_TEXT}
        </Text>
      </Chip>
      <div className={buttonContainerStyle}>
        <Button disabled>대회 입장</Button>
        <JoinCompetitionButton id={competitionId} />
      </div>
      <CompetitionMembersInfo competition={competition} />
    </div>
  );
}

const statusTextStyle = css({
  color: 'var(--surface-light, #D9D9D9)',
});
