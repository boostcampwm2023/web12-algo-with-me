import { useContext, useState } from 'react';

import type { SimulationInput } from '@/hooks/simulation';
import { deepCopy } from '@/utils/copy';

import { Modal, type ModalProps } from '../Common';
import { SimulationInputList } from './SimulationInputList';

interface Props extends ModalProps {
  simulationInputs: SimulationInput[];
  onSave: (inputs: SimulationInput[]) => void;
}

export function SimulationInputModal({ simulationInputs, onSave, ...props }: Props) {
  const modal = useContext(Modal.Context);
  const [inputs, setInputs] = useState<SimulationInput[]>(deepCopy(simulationInputs));

  const handleCloseModal = () => {
    setInputs(simulationInputs);
    modal.close();
  };

  const handleSave = () => {
    onSave(deepCopy(inputs));
    modal.close();
  };

  const handleChangeInput = (targetId: number, newParam: string) => {
    const changedSimulation = inputs.find(({ id }) => id === targetId);
    if (changedSimulation) {
      changedSimulation.input = newParam;
    }
    setInputs([...inputs]);
  };

  return (
    <Modal {...props}>
      <SimulationInputList
        inputList={inputs}
        onChangeInput={handleChangeInput}
      ></SimulationInputList>
      <button onClick={handleCloseModal}>닫기</button>
      <button onClick={handleSave}>저장</button>
    </Modal>
  );
}
