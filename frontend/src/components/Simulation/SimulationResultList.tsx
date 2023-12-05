import { css, cx } from '@style/css';

import type { HTMLAttributes } from 'react';

import { HStack, Icon, VStack } from '@/components/Common';
import type { SimulationResult } from '@/hooks/simulation';

interface Props extends HTMLAttributes<HTMLUListElement> {
  resultList: SimulationResult[];
}

export function SimulationResultList({ resultList = [], className, ...props }: Props) {
  return (
    <ul className={cx(className)} {...props}>
      {resultList.map((result) => (
        <li key={result.id} className={cx(listStyle)}>
          <SimulationResult result={result}></SimulationResult>
        </li>
      ))}
    </ul>
  );
}

function SimulationResult({ result }: { result: SimulationResult }) {
  return (
    <>
      <VStack className={resultContainerStyle}>
        {result.isDone ? <Icon.CheckRound color="success" /> : <Icon.Spinner />}
        <HStack className={resultDescriptionStyle}>
          <p>입력: {result.input}</p>
          <p>출력: {String(result.output)}</p>
        </HStack>
      </VStack>
    </>
  );
}

const listStyle = css({
  borderBottom: '1px solid',
  borderColor: 'border',
  _last: {
    borderBottom: 'none',
  },
});

const resultContainerStyle = css({
  padding: '1rem',
  gap: '0.625rem',
});

const resultDescriptionStyle = css({
  gap: '0.5rem',
});
