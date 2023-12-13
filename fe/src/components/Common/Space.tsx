import { css } from '@style/css';

export function Space() {
  return <div className={style}></div>;
}

const style = css({
  flexGrow: '1',
});
