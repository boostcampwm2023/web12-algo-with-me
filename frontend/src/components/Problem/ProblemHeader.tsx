import { css, cx } from '@style/css';

import { HTMLAttributes } from 'react';

import type { ProblemInfo } from '@/apis/problems';

interface Props extends HTMLAttributes<HTMLElement> {
  problem: ProblemInfo;
}
export function ProblemHeader({ problem, className, ...props }: Props) {
  return (
    <section className={cx(rowListStyle, spaceBetweenStyle, underlineStyle, className)} {...props}>
      <span className={problemTitleStyle}>{problem.title}</span>
    </section>
  );
}

const rowListStyle = css({
  display: 'flex',
});

const underlineStyle = css({
  borderBottom: '1px solid',
  borderColor: 'border',
});

const spaceBetweenStyle = css({
  justifyContent: 'space-between',
});

const problemTitleStyle = css({
  display: 'inline-block',
  padding: '10px',
  borderBottom: '2px solid',
  borderColor: 'brand',
});
