import { css } from '@style/css';

const style = css({
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
  padding: '10px',
  overflowY: 'auto',
  whiteSpace: 'pre-wrap',
  width: '300px',
  height: '200px',
});

const ProblemContent = (props) => {
  const { content } = props.content;
  return (
    <div className={style}>
      <p>{content}</p>
    </div>
  );
};

export default ProblemContent;
