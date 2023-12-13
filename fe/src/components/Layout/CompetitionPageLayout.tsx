import { css, cx } from '@style/css';

import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {}

export function CompetitionPageLayout({ children, className, ...props }: Props) {
  return (
    <main {...props} className={cx(style, className)}>
      {children}
    </main>
  );
}

const style = css({
  width: '100%',
  color: 'text',
  background: 'background',
});
