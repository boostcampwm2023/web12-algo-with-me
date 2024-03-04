import { css, cx } from '@style/css';

import { HTMLAttributes } from 'react';

import type { ProblemInfo } from '@/apis/problems';
import { Text } from '@/components/Common';

interface Props extends HTMLAttributes<HTMLDivElement> {
  problem: ProblemInfo;
}

export function ProblemHeader({ problem, className, ...props }: Props) {
  console.log(problem);
  return (
    <div className={cx(className, style)} {...props}>
      <Text.Title className={problemTitleStyle} size="lg" bold>
        {problem.title}
      </Text.Title>
    </div>
  );
}

const style = css({
  borderBottom: '1px solid',
  borderColor: 'border',
});

const problemTitleStyle = css({
  display: 'inline-block',
  paddingY: '1rem',
  paddingX: '1.25rem',
  marginLeft: '4rem',
  color: 'brand',
  borderBottom: '2px solid',
  borderColor: 'brand',
});
