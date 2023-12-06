import { css } from '@style/css';

import { useContext } from 'react';

import { useParticipantDashboard } from '@/hooks/dashboard';
import { range } from '@/utils/array';

import AuthContext from '../Auth/AuthContext';
import { Button } from '../Common';
import DashboardTable from './DashboardTable';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  competitionId: number;
}

export default function DashboardModal({ isOpen, onClose, competitionId }: Props) {
  const { email } = useContext(AuthContext);
  const { ranks, totalProblemCount, myRank } = useParticipantDashboard(true, competitionId, email);
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
