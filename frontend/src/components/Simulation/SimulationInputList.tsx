import { css } from '@style/css';

import type { ChangeEvent, HTMLAttributes } from 'react';

import type { SimulationInput } from '@/hooks/simulation';

import type { InputChangeProps } from './SimulationInputModal';

interface Props extends HTMLAttributes<HTMLUListElement> {
  inputList: SimulationInput[];
  onChangeInput: ({ dataType, newInput, dataIndex }: InputChangeProps) => void;
  onDeleteInput: (index: number) => void;
}

export function SimulationInputList(props: Props) {
  const { inputList, onChangeInput, onDeleteInput, ...rest } = props;

  const handleChange = ({ dataType, newInput, dataIndex }: InputChangeProps) => {
    onChangeInput({ dataType, newInput, dataIndex });
  };

  return (
    <ul {...rest}>
      {inputList.map(({ input, expected, id, changable }, index) => (
        <li key={id} className={listStyle}>
          케이스 {index}:
          <SimulationInput
            dataIndex={index + 1}
            dataType="input"
            value={input}
            onChange={handleChange}
            changable={changable as boolean}
          ></SimulationInput>
          <SimulationInput
            dataIndex={index + 1}
            dataType="expected"
            value={expected as string}
            onChange={handleChange}
            changable={changable as boolean}
          ></SimulationInput>
          {changable && <button onClick={() => onDeleteInput(id)}>-</button>}
        </li>
      ))}
    </ul>
  );
}

interface SimulationInputProps {
  value: string;
  dataIndex: number;
  dataType: string;
  changable: boolean;
  onChange: ({ dataType, newInput, dataIndex }: InputChangeProps) => void;
}

const SimulationInput = (props: SimulationInputProps) => {
  const { value, onChange, dataIndex, dataType, changable } = props;

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    if (onChange) {
      onChange({ newInput, dataIndex, dataType });
    }
  };
  if (!changable) {
    return <input value={value} className={inputStyle} onChange={handleInput} disabled></input>;
  }
  return <input value={value} className={inputStyle} onChange={handleInput}></input>;
};

const listStyle = css({
  marginBottom: '0.25rem',
  display: 'flex',
  gap: '0.5rem',
});

const inputStyle = css({
  color: 'black',
});
