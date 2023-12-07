import { css, cx } from '@style/css';

import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: Props) {
  return (
    <div className={cx(className, style)} {...props}>
      {children}
    </div>
  );
}

const style = css({
  padding: '1rem',
  background: 'surface.alt',
  borderRadius: '0.5rem',
});
