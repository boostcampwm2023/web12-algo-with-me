import { css, cx } from '@style/css';

import { HTMLAttributes } from 'react';

import Markdown from './Markdown';

interface Props extends HTMLAttributes<HTMLDivElement> {
  content: string;
}

export default function ProblemViewer({ content, className, ...props }: Props) {
  return (
    <div className={cx(style, className)} {...props}>
      <Markdown markdownContent={content} />
    </div>
  );
}

const style = css({
  backgroundColor: 'surface',
  color: 'text',
  padding: '1rem',
  overflow: 'auto',
  whiteSpace: 'pre-wrap',
});
