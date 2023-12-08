import { css } from '@style/css';

import { Button, HStack, Text, VStack } from '../Common';
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
      <HStack className={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <h3>
          <Text type="display" size="lg">
            {competitionName}
          </Text>
        </h3>
        <div className={tableStyle}>
          <DashboardTable useWebsocket={true} competitionId={competitionId} />
        </div>
        <VStack className={buttonContainerStyle}>
          <Button className={buttonStyle} onClick={onClose}>
            닫기
          </Button>
        </VStack>
      </HStack>
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
  padding: '1rem 1.5rem',
  position: 'relative',
  width: 'calc(100% - 4rem)',
  minWidth: '900px',
  height: 'calc(100% - 4rem)',
  minHeight: '680px',
  borderRadius: '0.5rem',
  background: 'background',
  gap: '2rem',
});

const tableStyle = css({
  overflow: 'auto',
  flexGrow: 1,
});

const buttonStyle = css({
  position: 'absolute',
  bottom: '0',
  right: '0',
  margin: '12px',
});
