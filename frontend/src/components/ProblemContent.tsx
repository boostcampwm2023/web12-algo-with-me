import { css } from '@style/css';

import MarkdownComponent from './MarkdownComponent';

interface Props {
  content: string;
}

export default function ProblemContent(props: Props) {
  const { content } = props;

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
  width: '450px',
  height: '500px',
});
