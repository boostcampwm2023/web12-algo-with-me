import { css } from '@style/css';

import { useContext } from 'react';

import { Modal } from '../Common';
import { ModalContext } from '../Common/Modal/ModalContext';
import DashboardList from './DashboardList';

interface Props {
  userList: Record<
    string,
    {
      'Solved Problems': number;
      'Total Time Spent': number;
      Problems: Record<string, number | null>;
    }
  >;
}

const mockCompetitionData: Props['userList'] = {
  'tmp@gmail.com': {
    'Solved Problems': 2,
    'Total Time Spent': 19,
    // eslint-disable-next-line quote-props
    Problems: {
      1: 12,
      2: null,
      4: 7,
    },
  },
  'user2@gmail.com': {
    'Solved Problems': 0,
    'Total Time Spent': 0,
    // eslint-disable-next-line quote-props
    Problems: {
      1: null,
      2: null,
      4: null,
    },
  },
};

interface ModalComponentProps {
  onClose: () => void;
}

export default function DashboardListModal({ onClose }: ModalComponentProps) {
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
