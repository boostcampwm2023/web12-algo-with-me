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
  const isRight = String(result.output) === String(result.expected);

  return (
    <VStack className={resultContainerStyle}>
      <Status isDone={result.isDone} isRight={isRight}></Status>
      <HStack className={resultDescriptionStyle}>
        <p>입력: {result.input}</p>
        <p>기댓값: {result.expected}</p>
        <p>출력: {String(result.output)}</p>
        {result.logs.length > 0 && <p>로그: </p>}
        {result.logs.map((log, index) => {
          return (
            <p key={index} className={css({ color: 'text.light' })}>
              {log}
            </p>
          );
        })}
      </HStack>
    </VStack>
  );
}

function Status({ isDone, isRight }: { isDone: boolean; isRight: boolean }) {
  if (!isDone) {
    return <Icon.Spinner spin />;
  }

  if (isRight) {
    return <Icon.CheckRound color="success" />;
  }

  return <Icon.CancelRound color="danger" />;
}

const listStyle = css({
  borderBottom: '1px solid',
  borderColor: 'border',
  _last: {
    borderBottom: 'none',
  },
});

const resultContainerStyle = css({
  alignItems: 'flex-start',
  padding: '1rem',
  gap: '0.625rem',
});

const resultDescriptionStyle = css({
  gap: '0.5rem',
});
