import { css } from '@style/css';

import type { ChangeEvent, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  param: string;
  onChangeParam: (newParam: string) => void;
}

export default function Simulator(props: Props) {
  const { param, onChangeParam } = props;

  const handleParamChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newParam = e.target.value;
    onChangeParam(newParam);
  };

  return (
    <div>
      <input className={inputStyle} onChange={handleParamChange} value={param}></input>
    </div>
  );
}

const inputStyle = css({
  border: '1px solid black',
  color: 'black',
});
