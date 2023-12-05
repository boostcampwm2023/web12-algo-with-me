import { css } from '@style/css';

import { HTMLAttributes } from 'react';

import { Button, HStack } from '../Common';

interface Props extends HTMLAttributes<HTMLMenuElement> {
  problemIds: number[];
  currentIndex: number;
  onChangeProblemIndex: (index: number) => void;
}

export default function CompetitionProblemSelector({
  problemIds,
  currentIndex,
  onChangeProblemIndex,
  ...props
}: Props) {
  function handleChangeProblemIndex(index: number) {
    onChangeProblemIndex(index);
  }

  return (
    <HStack as="menu" className={listStyle} {...props}>
      {problemIds.map((id: number, index: number) => (
        <li key={id}>
          <Button
            className={buttonStyle}
            selected={currentIndex === index}
            onClick={() => handleChangeProblemIndex(index)}
          >
            {index + 1}
          </Button>
        </li>
      ))}
    </HStack>
  );
}

const listStyle = css({
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const buttonStyle = css({
  width: '3rem',
  height: '3rem',
});
