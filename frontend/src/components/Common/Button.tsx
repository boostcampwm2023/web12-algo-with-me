import { cva, cx } from '@style/css';

import type { HTMLAttributes, MouseEvent } from 'react';

import { isNil } from '@/utils/type';

type Theme = 'brand' | 'error' | 'success' | 'warning' | 'none';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  theme?: Theme;
  selected?: boolean;
  disabled?: boolean;
}

export function Button({
  className,
  children,
  theme = 'none',
  onClick,
  selected = false,
  disabled = false,
  ...props
}: Props) {
  const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (isNil(onClick)) return;

    onClick(evt);
  };

  return (
    <button
      className={cx(className, style({ disabled }), themeStyle({ theme, selected, disabled }))}
      type="button"
      onClick={isNil(onClick) ? undefined : handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

const style = cva({
  base: {
    borderRadius: '0.5rem',
    padding: '0.6rem 1.2rem',
    cursor: 'pointer',
    _hover: {
      background: 'surface.brand.alt',
    },
  },
  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
    },
  },
});

const themeStyle = cva({
  base: {
    color: 'text',
    _hover: {
      filter: 'brightness(1.2)',
    },
  },
  variants: {
    theme: {
      none: {
        background: 'surface',
      },
      brand: {
        background: 'brand',
      },
      error: {
        background: 'alert.error',
      },
      success: {
        background: 'alert.success',
      },
      warning: {
        background: 'alert.warning.warning',
      },
    },
    selected: {
      true: {
        filter: 'brightness(1.2)',
      },
    },
    disabled: {
      true: {
        opacity: '0.5',
        _hover: {
          filter: 'brightness(1)',
        },
      },
    },
  },
});
