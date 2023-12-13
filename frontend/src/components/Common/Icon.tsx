import { css, cva, cx } from '@style/css';

import { HTMLAttributes } from 'react';

import { type Theme } from '../types';
import icons from '/icons.svg?url';

const ICON_NAMES = [
  'chevron-right',
  'check-round',
  'cancel-round',
  'spinner',
  'cancel',
  'minus',
  'plus',
] as const;
type IconName = (typeof ICON_NAMES)[number];

interface Props extends HTMLAttributes<HTMLSpanElement> {
  size?: number;
  color?: Theme;
  spin?: boolean;
  name: IconName;
}

export function Icon({
  className,
  size = 24,
  name = 'cancel',
  color = 'info',
  spin = false,
  ...props
}: Props) {
  const iconPath = `${icons}#${name}`;

  return (
    <span
      className={cx(className, style, themeStyle({ color }), animationStyle({ spin }))}
      {...props}
    >
      <svg width={size} height={size} fill={color}>
        <use href={iconPath}></use>
      </svg>
    </span>
  );
}

Icon.ChevronRight = ({ ...props }: Omit<Props, 'name'>) => (
  <Icon name="chevron-right" {...props}></Icon>
);
Icon.CheckRound = ({ ...props }: Omit<Props, 'name'>) => (
  <Icon name="check-round" {...props}></Icon>
);
Icon.CancelRound = ({ ...props }: Omit<Props, 'name'>) => (
  <Icon name="cancel-round" {...props}></Icon>
);
Icon.Spinner = ({ ...props }: Omit<Props, 'name'>) => <Icon name="spinner" {...props}></Icon>;
Icon.Cancel = ({ ...props }: Omit<Props, 'name'>) => <Icon name="cancel" {...props}></Icon>;
Icon.Minus = ({ ...props }: Omit<Props, 'name'>) => <Icon name="minus" {...props}></Icon>;
Icon.Plus = ({ ...props }: Omit<Props, 'name'>) => <Icon name="plus" {...props}></Icon>;

const style = css({
  display: 'inline-block',
});

const themeStyle = cva({
  variants: {
    color: {
      success: {
        fill: 'alert.success',
      },
      danger: {
        fill: 'alert.danger',
      },
      warning: {
        fill: 'alert.warning',
      },
      info: {
        fill: 'alert.info',
      },
    },
  },
});

const animationStyle = cva({
  variants: {
    spin: {
      true: {
        transformOrigin: 'center',
        animation: 'spin',
      },
    },
  },
});
