import { css } from '@style/css';

import { Button, Text, VStack } from '../Common';
import { buttonContainerStyle } from '../CompetitionDetail/styles/styles';
import { PageLayout } from '../Layout/PageLayout';
import DashboardTable from './DashboardTable';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  competitionName: string;
}

export default function DashboardModal({ isOpen, onClose, competitionName }: Props) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={modalOverlayStyle} onClick={onClose}>
      <PageLayout className={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <div className={competitionNameStyle}>
          <Text type="display" size="lg">
            {competitionName}
          </Text>
        </div>
        <DashboardTable />
        <VStack className={buttonContainerStyle}>
          <Button className={buttonStyle} onClick={onClose}>
            닫기
          </Button>
        </VStack>
      </PageLayout>
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
  maxWidth: '1264px',
  maxHeight: '920px',
});

const competitionNameStyle = css({
  marginBottom: '32px',
});

const buttonStyle = css({
  marginTop: '6px',
});
