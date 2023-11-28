import { useContext } from 'react';

import type { SimulationInput } from '@/hooks/simulation';

import { Modal, type ModalProps } from '../Common';
import { SimulationInputList } from './SimulationInputList';

interface Props extends ModalProps {
  simulationInputs: SimulationInput[];
  onChangeInput: (id: number, newInput: string) => void;
}

export function SimulationInputModal({ simulationInputs, onChangeInput, ...props }: Props) {
  const modal = useContext(Modal.Context);

  const handleCloseModal = () => {
    modal.close();
  };

  return (
    <Modal {...props}>
      <SimulationInputList
        inputList={simulationInputs}
        onChangeInput={onChangeInput}
      ></SimulationInputList>
      <button onClick={handleCloseModal}>닫기</button>
    </Modal>
  );
}
