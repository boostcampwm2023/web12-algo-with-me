import { css } from '@style/css';

import { Button, Text, VStack } from '../Common';
import { buttonContainerStyle } from '../CompetitionDetail/styles/styles';
import DashboardTable from './DashboardTable';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  competitionName: string;
  competitionId: number;
}

export default function DashboardModal({ isOpen, onClose, competitionId, competitionName }: Props) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={modalOverlayStyle} onClick={onClose}>
      <div className={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <div className={competitionNameStyle}>
          <Text type="display" size="lg">
            {competitionName}
          </Text>
        </div>
        <DashboardTable useWebsocket={true} competitionId={competitionId} />
        <VStack className={buttonContainerStyle}>
          <Button className={buttonStyle} onClick={onClose}>
            닫기
          </Button>
        </VStack>
      </div>
    </div>
  );
}

const modalOverlayStyle = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const modalContentStyle = css({
  padding: '32px',
  position: 'relative',
  width: '1264px',
  height: '920px',
  background: 'background',
});

const competitionNameStyle = css({
  marginBottom: '32px',
});

const buttonStyle = css({
  position: 'absolute',
  bottom: '0',
  right: '0',
  margin: '12px',
});
