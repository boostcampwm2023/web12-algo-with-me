import { css } from '@style/css';

import type { ChangeEvent, HTMLAttributes } from 'react';

import type { SimulationInput } from '@/hooks/simulation';

interface Props extends HTMLAttributes<HTMLUListElement> {
  inputList: SimulationInput[];
  onChangeInput: (index: number, newInput: string) => void;
}

export function SimulationInputList(props: Props) {
  const { inputList, onChangeInput, ...rest } = props;

  const handleInputChange = (index: number, newInput: string) => {
    onChangeInput(index, newInput);
  };

  return (
    <ul {...rest}>
      {inputList.map(({ input, id }, index) => (
        <li key={id} className={listStyle}>
          케이스 {index}:
          <SimulationInput
            value={input}
            onChange={(newInput) => handleInputChange(id, newInput)}
          ></SimulationInput>
        </li>
      ))}
    </ul>
  );
}

interface SimulationInputProps {
  value: string;
  onChange: (newInput: string) => void;
}

const SimulationInput = (props: SimulationInputProps) => {
  const { value, onChange } = props;

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    if (onChange) {
      onChange(newInput);
    }
  };

  return <input value={value} className={inputStyle} onChange={handleInput}></input>;
};

const listStyle = css({
  marginBottom: '0.25rem',
});

const inputStyle = css({
  color: 'black',
});
