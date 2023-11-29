import { css } from '@style/css';

import { useContext } from 'react';

import { mockCompetitionData } from '@/components/Dashboard/mockCompetitionData';

import { Modal } from '../Common';
import { ModalContext } from '../Common/Modal/ModalContext';
import DashboardList from './DashboardList';

interface ModalComponentProps {
  onClose: () => void;
}

export default function DashboardModal({ onClose }: ModalComponentProps) {
  const modal = useContext(ModalContext);

  const handleCloseModal = () => {
    onClose();
    modal.close();
  };

  return (
    <Modal className={modalStyle}>
      <DashboardList userList={mockCompetitionData} />
      <button onClick={handleCloseModal}>닫기</button>
    </Modal>
  );
}

const modalStyle = css({
  width: '80%',
  height: '80%',
});
