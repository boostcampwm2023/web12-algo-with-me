import { css } from '@style/css';

import MarkdownComponent from './markdownComponent';

const style = css({
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
  padding: '10px',
  overflowY: 'auto',
  whiteSpace: 'pre-wrap',
  width: '500px',
  height: '800px',
});

const ProblemContent = (props) => {
  const { content } = props.content;
  return (
    <div className={style}>
      <MarkdownComponent markdownContent={content} />
    </div>
  );
};

export default ProblemContent;
