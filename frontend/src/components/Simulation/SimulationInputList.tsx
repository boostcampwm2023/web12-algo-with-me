import { css } from '@style/css';

import type { ChangeEvent, HTMLAttributes } from 'react';

import type { SimulationInput } from '@/hooks/simulation';

import type { InputChangeProps } from './SimulationInputModal';

interface Props extends HTMLAttributes<HTMLUListElement> {
  inputList: SimulationInput[];
  onChangeInput: ({ testcaseId, newInput, testcaseType }: InputChangeProps) => void;
  onDeleteInput: (index: number) => void;
}

export function SimulationInputList(props: Props) {
  const { inputList, onChangeInput, onDeleteInput, ...rest } = props;

  const handleChange = ({ testcaseId, newInput, testcaseType }: InputChangeProps) => {
    onChangeInput({ testcaseId, newInput, testcaseType });
  };

  return (
    <ul {...rest}>
      {inputList.map(({ input, expected, id, changable }, index) => (
        <li key={id} className={listStyle}>
          인풋{index}:
          <Input
            testcaseId={index + 1}
            testcaseType="input"
            value={input}
            onChange={handleChange}
            changable={changable as boolean}
          ></Input>
          예상{index}:
          <Input
            testcaseId={index + 1}
            testcaseType="expected"
            value={expected as string}
            onChange={handleChange}
            changable={changable as boolean}
          ></Input>
          {changable && <button onClick={() => onDeleteInput(id)}>-</button>}
        </li>
      ))}
    </ul>
  );
}

interface SimulationInputProps {
  value: string;
  testcaseId: number;
  testcaseType: string;
  changable: boolean;
  onChange: ({ testcaseId, newInput, testcaseType }: InputChangeProps) => void;
}

const Input = (props: SimulationInputProps) => {
  const { value, onChange, testcaseId, testcaseType, changable } = props;

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    if (onChange) {
      onChange({ newInput, testcaseId, testcaseType });
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
