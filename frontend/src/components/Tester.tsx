import { css } from '@style/css';

import type { ChangeEvent, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  param: string;
  result: unknown;
  onChangeParam: (newParam: string) => void;
}

export default function Tester(props: Props) {
  const { param, result, onChangeParam } = props;

  const handleParamChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newParam = e.target.value;
    onChangeParam(newParam);
  };

  return (
    <div>
      <input className={inputStyle} onChange={handleParamChange} value={param}></input>
      <p>result: {String(result)}</p>
    </div>
  );
}

const inputStyle = css({
  border: '1px solid black',
});
