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
  backgroundColor: 'surface',
  color: 'text',
  padding: '1rem',
  overflowY: 'auto',
  whiteSpace: 'pre-wrap',
  width: '50%',
  height: '100%',
});
