import { css } from '@style/css';

import Simulator from './Simulator';
import type { TestCase } from './types';

interface Props {
  testCases: TestCase[];
  onTestExec: () => void;
  onChangeParam: (index: number, param: string) => void;
}

export default function SimulatorList(props: Props) {
  const { testCases, onTestExec, onChangeParam } = props;

  return (
    <div>
      <button className={execButtonStyle} onClick={onTestExec}>
        테스트 실행
      </button>
      <ul>
        {testCases.map((tc, index) => (
          <li>
            <Simulator
              param={tc.param}
              result={tc.result}
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
