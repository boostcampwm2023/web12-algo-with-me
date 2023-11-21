import { css } from '@style/css';

import type { Simulation } from '@/hooks/simulation/useSimulations';

import Simulator from './Simulator';

interface Props {
  simulations: Simulation[];
  onSimulate: () => void;
  onSimulationCancel: () => void;
  onChangeParam: (index: number, param: string) => void;
}

export default function SimulatorList(props: Props) {
  const { simulations, onSimulate, onSimulationCancel, onChangeParam } = props;

  return (
    <div>
      <button className={execButtonStyle} onClick={onSimulate}>
        테스트 실행
      </button>
      <button className={execButtonStyle} onClick={onSimulationCancel}>
        실행 취소
      </button>
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

const execButtonStyle = css({
  color: 'black',
});
