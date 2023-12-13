import { css, cva, cx } from '@style/css';

import { Text, type TextProps } from './Text';

type Theme = 'success' | 'danger' | 'warning' | 'info';

interface Props extends TextProps {
  theme: Theme;
}

export function Chip({ className, children, theme = 'info', ...props }: Props) {
  return (
    <Text.Label size="sm" className={cx(themeStyle({ theme }), className, style)} {...props}>
      {children}
    </Text.Label>
  );
}

const style = css({
  borderRadius: '9999px',
  paddingX: '1rem',
  paddingY: '0.25rem',
});

const themeStyle = cva({
  base: {
    border: '1px solid',
  },
  variants: {
    theme: {
      success: {
        borderColor: 'alert.success !important',
        background: 'alert.success.dark',
      },
      warning: {
        borderColor: 'alert.warning !important',
        background: 'alert.warning.dark',
      },
      danger: {
        borderColor: 'alert.danger !important',
        background: 'alert.danger.dark',
      },
      info: {
        borderColor: 'alert.info !important',
        background: 'alert.info.dark',
      },
    },
  },
});
