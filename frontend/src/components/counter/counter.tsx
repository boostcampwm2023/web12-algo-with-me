import { css } from '@style/css';

const style = css({
  display: 'flex',
  flexDirection: 'column',
  fontWeight: 'semibold',
  color: 'yellow.300',
  textAlign: 'center',
  textStyle: '3xl',
});

export function Counter() {
  return <p className={style}>The Brown Fox Jumps Over The Lazy Dog</p>;
}
