import { css } from '@style/css';

import { Button } from '../Common';
import DashboardTable from './DashboardTable';
import { mockCompetitionData } from './mockCompetitionData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardModal({ isOpen, onClose }: Props) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={modalOverlayStyle} onClick={onClose}>
      <div className={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <DashboardTable userList={mockCompetitionData} />
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
