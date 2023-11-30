import { css, cx } from '@style/css';

import { useContext, useEffect, useState } from 'react';

import type { SimulationInput } from '@/hooks/simulation';
import { deepCopy } from '@/utils/copy';

import { Button, Modal, type ModalProps } from '../Common';
import { SimulationInputList } from './SimulationInputList';

interface Props extends ModalProps {
  simulationInputs: SimulationInput[];
  onSave: (inputs: SimulationInput[]) => void;
}

interface InputChangeProps {
  testcaseType: string;
  newInput: string;
  testcaseId: number;
}

const MAX_INPUT_COUNT = 10;

export function SimulationInputModal({ simulationInputs, onSave, ...props }: Props) {
  const modal = useContext(Modal.Context);

  const [inputs, setInputs] = useState<SimulationInput[]>(deepCopy(simulationInputs));

  useEffect(() => {
    setInputs(deepCopy(simulationInputs));
  }, [simulationInputs]);

  const handleCloseModal = () => {
    setInputs(deepCopy(simulationInputs));
    modal.close();
  };

  // input 다 채웠냐
  const isFilled = () => {
    for (const { input, expected } of inputs) {
      if (input === '' || expected === '') {
        alert('빈칸을 채워주세요');
        return false;
      }
    }
    return true;
  };

  // 정해진 타입에 맞게 채웠냐
  const isTypeValid = () => {
    // TODO 추후에 백엔드와 논의 후에 로직 넣어야함.
    return true;
  };

  const validateInput = () => {
    // 1 input 다 채워졌는지 검증  => isFilled()
    // 2 input 타입 검증 => isTypeValid()
    return isFilled() && isTypeValid() ? true : false;
  };

  const handleSave = () => {
    if (!validateInput()) return;
    onSave(deepCopy(inputs));

    console.log('저장된 testcase 정보는 :', inputs);
    modal.close();
  };

  const handleClickAddButton = () => {
    if (inputs.length >= MAX_INPUT_COUNT) return;
    setInputs((prev) => [
      ...prev,
      { id: prev.length + 1, input: '', expected: '', changable: true },
    ]);
  };

  const handleChangeInput = ({ newInput, testcaseId, testcaseType }: InputChangeProps) => {
    const changedInput = inputs.find(({ id }) => id === testcaseId);
    if (!changedInput) return;
    const originInputs = deepCopy(inputs);
    if (testcaseType === 'input') {
      changedInput.input = newInput;
    }
    if (testcaseType === 'expected') {
      changedInput.expected = newInput;
    }
    originInputs[testcaseId - 1] = changedInput;
    setInputs([...originInputs]);
  };

  const handleDeleteInput = (targetId: number) => {
    const originInputs = deepCopy(inputs);
    const targetIndex = originInputs.findIndex(({ id }) => id === targetId);
    if (targetIndex === -1) return;
    originInputs.splice(targetIndex, 1);
    setInputs(originInputs.map((input, index) => ({ ...input, id: index + 1 })));
  };

  return (
    <Modal {...props}>
      <div className={cx(rowStyle, paddingStyle)}>
        <header>테스트 케이스 추가</header>
        <Button onClick={handleCloseModal}>x</Button>
      </div>
      <div className={cx(ListWrapperStyle, rowStyle)}>
        <section>
          <div className={rowStyle}>
            <div>Parameters</div>
            <Button onClick={handleClickAddButton}>+ 추가</Button>
          </div>
          <SimulationInputList
            inputList={inputs}
            onChangeInput={handleChangeInput}
            onDeleteInput={handleDeleteInput}
          ></SimulationInputList>
        </section>
      </div>
      <div className={positionEndStyle}>
        <Button onClick={handleSave}>확인</Button>
      </div>
    </Modal>
  );
}

const ListWrapperStyle = css({
  border: '1px solid silver',
  padding: '1rem',
  margin: '1rem',
});

const rowStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const paddingStyle = css({
  padding: '4px',
});

const positionEndStyle = css({
  display: 'flex',
  flexDirection: 'row-reverse',
});

export { type InputChangeProps };
