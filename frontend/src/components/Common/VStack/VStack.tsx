import { css, cx } from '@style/css';

import { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

export function VStack({ children, className, as = 'div', ...props }: Props) {
  const As = as;

  return (
    <As className={cx(className, rowListStyle)} {...props}>
      {children}
    </As>
  );
}

const rowListStyle = css({
  display: 'flex',
});
