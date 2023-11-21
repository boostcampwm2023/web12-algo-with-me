import type { HTMLAttributes } from 'react';

import type { SimulationResult } from '@/hooks/simulation/useSimulations';

interface Props extends HTMLAttributes<HTMLDivElement> {
  result: SimulationResult;
}

export function SimulationResult(props: Props) {
  const { result } = props;

  return (
    <div>
      <p>입력: {result.input}</p>
      <p>결과: {String(result.output)}</p>
      <hr />
    </div>
  );
}
