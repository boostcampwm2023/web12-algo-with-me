import { css } from '@style/css';

import type { Simulation } from '@/hooks/simulation/useSimulations';

import Simulator from './Simulator';

interface Props {
  simulations: Simulation[];
  onChangeParam: (index: number, param: string) => void;
}

export default function SimulatorList(props: Props) {
  const { simulations, onChangeParam } = props;

  return (
    <div>
      <ul>
        {simulations.map(({ param, result }, index) => (
          <li>
            <Simulator
              param={param}
              result={result}
              onChangeParam={(param: string) => onChangeParam(index, param)}
              key={index}
            ></Simulator>
          </li>
        ))}
      </ul>
    </div>
  );
}
