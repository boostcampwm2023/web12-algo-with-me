import { css } from '@style/css';

import { useContext } from 'react';

import { Modal } from '../Common';
import DashboardList from './DashboardList';
import { mockCompetitionData } from './mockCompetitionData';

export default function DashboardModal() {
  const modal = useContext(Modal.Context);

  const handleCloseModal = () => {
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
