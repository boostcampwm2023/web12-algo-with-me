import { css, cx } from '@style/css';

import { type HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function CompetitionHeader({ className, children, ...props }: Props) {
  return (
    <div className={cx(className, headerStyle)} {...props}>
      {children}
    </div>
  );
}

const headerStyle = css({
  height: '3.125rem',
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '1px solid',
  borderColor: 'border',
});
