import { css, cva, cx } from '@style/css';

import { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  alignItems?: 'flexStart' | 'flexEnd' | 'baseline' | 'stretch' | 'center';
}

export function VStack({
  children,
  className,
  as = 'div',
  alignItems = 'flexStart',
  ...props
}: Props) {
  const As = as;

  return (
    <As className={cx(className, rowListStyle, alignItemStyle({ alignItems }))} {...props}>
      {children}
    </As>
  );
}

const rowListStyle = css({
  display: 'flex',
});

const alignItemStyle = cva({
  defaultVariants: {
    alignItems: 'flexStart',
  },
  variants: {
    alignItems: {
      flexStart: {
        alignItems: 'flex-start',
      },
      flexEnd: {
        alignItems: 'flex-end',
      },
      baseline: {
        alignItems: 'baseline',
      },
      stretch: {
        alignItems: 'stretch',
      },
      center: {
        alignItems: 'center',
      },
    },
  },
});
