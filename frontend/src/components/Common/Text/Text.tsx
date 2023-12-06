import { cva, cx } from '@style/css';

import type { HTMLAttributes } from 'react';

type TextType = 'display' | 'title' | 'body' | 'label';
type SizeType = 'lg' | 'md' | 'sm';

export interface Props extends HTMLAttributes<HTMLSpanElement> {
  type?: TextType;
  size?: SizeType;
  bold?: boolean;
  underline?: boolean;
}

export function Text({
  className,
  children,
  type = 'body',
  size = 'md',
  bold = false,
  underline = false,
  ...props
}: Props) {
  return (
    <span
      className={cx(className, fontStyle({ type, size }), style({ bold, underline }))}
      {...props}
    >
      {children}
    </span>
  );
}

Text.Display = function ({ children, ...props }: Omit<Props, 'type'>) {
  return (
    <Text type="display" {...props}>
      {children}
    </Text>
  );
};

Text.Title = function ({ children, ...props }: Omit<Props, 'type'>) {
  return (
    <Text type="title" {...props}>
      {children}
    </Text>
  );
};

Text.Body = function ({ children, ...props }: Omit<Props, 'type'>) {
  return (
    <Text type="body" {...props}>
      {children}
    </Text>
  );
};

Text.Label = function ({ children, ...props }: Omit<Props, 'type'>) {
  return (
    <Text type="label" {...props}>
      {children}
    </Text>
  );
};

const style = cva({
  base: {
    fontWeight: 'normal',
  },
  variants: {
    bold: {
      true: {
        fontWeight: 'bold',
      },
    },
    underline: {
      true: {
        textDecoration: 'underline',
      },
    },
  },
});

const fontStyle = cva({
  compoundVariants: [
    {
      type: 'display',
      size: 'lg',
      css: {
        fontSize: 'display.lg',
        lineHeight: '64px',
      },
    },
    {
      type: 'display',
      size: 'md',
      css: {
        fontSize: 'display.md',
        lineHeight: '52px',
      },
    },
    {
      type: 'display',
      size: 'sm',
      css: {
        fontSize: 'display.sm',
        lineHeight: '44px',
      },
    },
    {
      type: 'title',
      size: 'lg',
      css: {
        fontSize: 'title.lg',
        lineHeight: '28px',
      },
    },
    {
      type: 'title',
      size: 'md',
      css: {
        fontSize: 'title.md',
        lineHeight: '24px',
      },
    },
    {
      type: 'title',
      size: 'sm',
      css: {
        fontSize: 'title.sm',
        lineHeight: '20px',
      },
    },
    {
      type: 'body',
      size: 'lg',
      css: {
        fontSize: 'body.lg',
        lineHeight: '24px',
      },
    },
    {
      type: 'body',
      size: 'md',
      css: {
        fontSize: 'body.md',
        lineHeight: '20px',
      },
    },
    {
      type: 'body',
      size: 'sm',
      css: {
        fontSize: 'body.sm',
        lineHeight: '16px',
      },
    },
    {
      type: 'label',
      size: 'lg',
      css: {
        fontSize: 'label.lg',
        lineHeight: '20px',
      },
    },
    {
      type: 'label',
      size: 'md',
      css: {
        fontSize: 'label.md',
        lineHeight: '16px',
      },
    },
    {
      type: 'label',
      size: 'sm',
      css: {
        fontSize: 'label.sm',
        lineHeight: '16px',
      },
    },
  ],
});
