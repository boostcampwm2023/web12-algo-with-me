import { css } from '@style/css';

export default function CheckCircle() {
  return (
    <section className={circleStyle}>
      <div className={checkStyle}>ㄴ</div>
    </section>
  );
}

const circleStyle = css({
  background: 'alert.success',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const checkStyle = css({
  color: 'black',
  fontSize: '24px',
  fontWeight: '900',
  transform: 'rotate(-50deg)',
  marginTop: '-5px',
  marginLeft: '-1px',
});
