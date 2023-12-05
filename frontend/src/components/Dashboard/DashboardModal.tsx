import { css } from '@style/css';

import { useParticipantDashboardSocket } from '@/hooks/dashboard';
import { range } from '@/utils/array';

import { Button } from '../Common';
import DashboardTable from './DashboardTable';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardModal({ isOpen, onClose }: Props) {
  const { ranks, totalProblemCount, myRank } = useParticipantDashboardSocket();
  const problemCount = range(1, totalProblemCount + 1);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={modalOverlayStyle} onClick={onClose}>
      <div className={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <DashboardTable ranks={ranks} myRank={myRank} problemCount={problemCount} />
        <Button onClick={onClose}>닫기</Button>
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
  background: '#fff',
  color: 'black',
  padding: '20px',
  borderRadius: '8px',
  width: '100%',
  position: 'relative',
});
