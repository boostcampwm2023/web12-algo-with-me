import { css } from '@style/css';

import type { ChangeEvent, HTMLAttributes } from 'react';
import { useEffect, useState } from 'react';

import evaluator, { type EvalResult } from '@/modules/evaluator';

interface Props extends HTMLAttributes<HTMLDivElement> {
  code: string;
}

export default function Tester(props: Props) {
  const { code } = props;

  const [result, setResult] = useState<string | number>();
  const [param, setParam] = useState<string>('');

  const handleParamChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newParam = e.target.value;
    setParam(newParam);
  };

  const handleEvalResult = (response: EvalResult) => {
    if (!response) return;

    const result = response.result as string;
    setResult(result);
  };

  useEffect(() => {
    return evaluator.subscribe(handleEvalResult);
  }, []);

  const handleTestExec = () => {
    evaluator.safeEval(code, param);
  };

  return (
    <div>
      <input className={inputStyle} onChange={handleParamChange} value={param}></input>
      <button onClick={handleTestExec}>테스트 실행</button>
      <p>result: {result}</p>
    </div>
  );
}

const inputStyle = css({
  border: '1px solid black',
});
