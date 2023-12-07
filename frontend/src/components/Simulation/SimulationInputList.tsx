import { css } from '@style/css';

import type { ChangeEvent, HTMLAttributes } from 'react';

import type { SimulationInput } from '@/hooks/simulation';

import { Button, Icon, Input, Text, VStack } from '../Common';
import type { InputChangeProps } from './SimulationInputModal';

interface Props extends HTMLAttributes<HTMLUListElement> {
  inputList: SimulationInput[];
  onChangeInput: ({ testcaseId, newInput, testcaseType }: InputChangeProps) => void;
  onDeleteInput: (index: number) => void;
}

export function SimulationInputList(props: Props) {
  const { inputList, onChangeInput, onDeleteInput, ...rest } = props;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    testcaseId: number,
    testcaseType: string,
  ) => {
    const newInput = e.target.value;

    onChangeInput({ testcaseId, newInput, testcaseType });
  };

  return (
    <ul {...rest}>
      <li className={itemStyle}>
        <VStack className={css({ gap: '0.75rem', width: '100%', alignItems: 'center' })}>
          <Text.Title size="md" className={css({ flexGrow: 1, paddingLeft: '0.5rem' })}>
            Input
          </Text.Title>
          <Text.Title size="md" className={css({ width: '180px', paddingLeft: '0.5rem' })}>
            Expected
          </Text.Title>
          <Text.Title size="md" className={css({ width: '64px', textAlign: 'center' })}>
            삭제
          </Text.Title>
        </VStack>
      </li>
      {inputList.map(({ input, expected, id, changable }, index) => (
        <li key={id} className={itemStyle}>
          <VStack className={css({ gap: '0.75rem', width: '100%', alignItems: 'center' })}>
            <Input className={css({ flexGrow: 1 })}>
              <Input.TextField
                disabled={!changable}
                value={input}
                onChange={(e) => handleChange(e, index + 1, 'input')}
                className={inputStyle}
              ></Input.TextField>
            </Input>
            <Input>
              <Input.TextField
                disabled={!changable}
                value={expected}
                onChange={(e) => handleChange(e, index + 1, 'expected')}
                className={expectedInputStyle}
              ></Input.TextField>
            </Input>
            <Button
              className={css({ width: '4rem' })}
              disabled={!changable}
              onClick={() => onDeleteInput(id)}
            >
              <Icon.Minus color="danger" size={24} />
            </Button>
          </VStack>
        </li>
      ))}
    </ul>
  );
}

const itemStyle = css({
  marginBottom: '0.5rem',
  display: 'flex',
  gap: '1rem',
});

const inputStyle = css({
  width: '100%',
});

const expectedInputStyle = css({
  width: '180px',
});
