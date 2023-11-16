import { css } from '@style/css';

import MarkdownComponent from './MarkdownComponent';

interface Props {
  content: { content: string };
}

export default function ProblemContent(props: Props) {
  const { content } = props.content;

  return (
    <div className={style}>
      <MarkdownComponent markdownContent={content} />
    </div>
  );
}

const style = css({
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
  padding: '10px',
  overflowY: 'auto',
  whiteSpace: 'pre-wrap',
  width: '500px',
  height: '800px',
});
