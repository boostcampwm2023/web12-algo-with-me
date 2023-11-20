import { css } from '@style/css';

import Markdown from './Markdown';

interface Props {
  content: string;
}

export default function ProblemViewer(props: Props) {
  const { content } = props;

  return (
    <div className={style}>
      <Markdown markdownContent={content} />
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
