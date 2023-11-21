import type { HTMLAttributes } from 'react';

import type { SimulationResult } from '@/hooks/simulation';

interface Props extends HTMLAttributes<HTMLUListElement> {
  resultList: SimulationResult[];
}

interface SimulResultProps {
  result: SimulationResult;
}

export function SimulationResultList(props: Props) {
  const { resultList = [] } = props;

  return (
    <ul>
      {resultList.map((result) => (
        <li key={result.id}>
          <SimulResult result={result}></SimulResult>
        </li>
      ))}
    </ul>
  );
}

const SimulResult = (props: SimulResultProps) => {
  const { result } = props;

  return (
    <div>
      <p>입력: {result.input}</p>
      <p>결과: {String(result.output)}</p>
      <hr />
    </div>
  );
};
