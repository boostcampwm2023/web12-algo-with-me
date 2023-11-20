import { css } from '@style/css';

import Tester from './Tester';
import type { TestCase } from './types';

interface Props {
  testCases: TestCase[];
  onTestExec: () => void;
  onChangeParam: (index: number, param: string) => void;
}

export default function TestResult(props: Props) {
  const { testCases, onTestExec, onChangeParam } = props;

  return (
    <div>
      <button className={execButtonStyle} onClick={onTestExec}>
        테스트 실행
      </button>
      {testCases.map((tc, index) => (
        <Tester
          param={tc.param}
          result={tc.result}
          onChangeParam={(param: string) => onChangeParam(index, param)}
          key={index}
        ></Tester>
      ))}
    </div>
  );
}

const execButtonStyle = css({
  color: 'black',
});
