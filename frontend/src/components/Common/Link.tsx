import { css, cx } from '@style/css';

import type { RefAttributes } from 'react';
import type { LinkProps } from 'react-router-dom';
import { Link as _Link } from 'react-router-dom';

import { Text } from './Text';

interface Props extends LinkProps, RefAttributes<HTMLAnchorElement> {}

export function Link({ className, children, ...props }: Props) {
  return (
    <_Link className={cx(className, style)} {...props}>
      <Text underline>{children}</Text>
    </_Link>
  );
}

const style = css({
  color: 'brand',
  _hover: {
    color: 'brand.alt',
  },
});
