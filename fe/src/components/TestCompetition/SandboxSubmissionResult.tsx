import { css, cx } from '@style/css';

import type { HTMLAttributes } from 'react';

import { Icon, VStack } from '@/components/Common';
import type { SimulationResult } from '@/hooks/simulation';

interface Props extends HTMLAttributes<HTMLUListElement> {
  resultList: SimulationResult[];
}

export function SandboxSubmissionResult({ resultList = [], className, ...props }: Props) {
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
      <p className={isRight ? successTextStyle : errorTextStyle}>
        {isRight ? '정답입니다' : '오답입니다'}
      </p>
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

const successTextStyle = css({
  color: 'alert.success',
});

const errorTextStyle = css({
  color: 'alert.danger',
});
