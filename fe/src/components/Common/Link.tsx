import { cva, cx } from '@style/css';

import type { RefAttributes } from 'react';
import type { LinkProps } from 'react-router-dom';
import { Link as _Link } from 'react-router-dom';

import { Text } from './Text';

interface Props extends LinkProps, RefAttributes<HTMLAnchorElement> {
  underline?: boolean;
}

export function Link({ className, children, underline = true, ...props }: Props) {
  return (
    <_Link className={cx(className, style({ underline }))} {...props}>
      <Text underline={underline}>{children}</Text>
    </_Link>
  );
}

const style = cva({
  base: {
    color: 'brand',
    _hover: {
      color: 'brand.alt',
    },
  },
  variants: {
    underline: {
      true: {
        textDecoration: 'underline',
      },
      false: {
        textDecoration: 'none',
      },
    },
  },
});
