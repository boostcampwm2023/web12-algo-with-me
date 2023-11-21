import type { HTMLAttributes } from 'react';

import type { SimulationResult } from '@/hooks/simulation';

interface Props extends HTMLAttributes<HTMLUListElement> {
  resultList: SimulationResult[];
}

export function SimulationResultList(props: Props) {
  const { resultList = [] } = props;

  return (
    <ul>
      {resultList.map((result) => (
        <li key={result.id}>
          <div>
            <p>입력: {result.input}</p>
            <p>결과: {String(result.output)}</p>
            <hr />
          </div>
        </li>
      ))}
    </ul>
  );
}
