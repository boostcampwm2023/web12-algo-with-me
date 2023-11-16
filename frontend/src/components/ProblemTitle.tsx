import { css } from '@style/css';

export default function ProblemTitle(props) {
  const { problemName } = props;

  return (
    <div className={titleContainer}>
      <div className={bottomLineOfTitle}>
        <div>{problemName}</div>
      </div>
    </div>
  );
}

const titleContainer = css({
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
  width: '850x',
  height: '50px',
});

const bottomLineOfTitle = css({
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
  padding: '10px',
  height: '50px',
  display: 'inline-block',
  border: '2px solid white',
  borderTop: '1px solid transparent',
  borderLeft: '1px solid transparent',
  borderRight: '1px solid transparent',
});
