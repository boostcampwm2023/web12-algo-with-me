import { css, cx } from '@style/css';

import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLButtonElement> {}

export function Button({ className, children, ...props }: Props) {
  return (
    <button className={cx(className, style)} type="button" {...props}>
      {children}
    </button>
  );
}

const style = css({
  background: 'surface.brand',
  color: 'text',
  borderRadius: '0.5rem',
  padding: '0.6rem 1.2rem',
  cursor: 'pointer',
  _hover: {
    background: 'surface.brand.alt',
  },
});
