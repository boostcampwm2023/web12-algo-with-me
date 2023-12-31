import { cva, cx } from '@style/css';

import type { HTMLAttributes, MouseEvent, ReactElement } from 'react';

import { isNil } from '@/utils/type';

type Theme = 'brand' | 'danger' | 'success' | 'warning' | 'transparent' | 'none';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  theme?: Theme;
  selected?: boolean;
  disabled?: boolean;
  leading?: ReactElement;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  className,
  children,
  theme = 'none',
  onClick,
  leading,
  selected = false,
  disabled = false,
  type = 'button',
  ...props
}: Props) {
  const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (isNil(onClick)) return;

    onClick(evt);
  };

  const hasLeading = !isNil(leading);

  return (
    <button
      className={cx(
        className,
        style({ disabled, hasLeading }),
        themeStyle({ theme, selected, disabled }),
      )}
      type={type}
      onClick={isNil(onClick) ? undefined : handleClick}
      {...props}
    >
      {leading}
      {children}
    </button>
  );
}

const style = cva({
  base: {
    display: 'flex',
    gap: '0.25rem',
    alignItems: 'center',
    justifyContent: 'center',
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
    hasLeading: {
      true: {
        paddingLeft: '0.5rem',
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
      danger: {
        background: 'alert.danger',
      },
      success: {
        background: 'alert.success',
      },
      warning: {
        background: 'alert.warning',
      },
      transparent: {
        background: 'transparent',
      },
    },
    selected: {
      true: {
        outline: '2px solid',
        outlineColor: 'brand',
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
  compoundVariants: [
    {
      selected: true,
      theme: 'transparent',
      css: {
        background: 'surface',
      },
    },
  ],
});
