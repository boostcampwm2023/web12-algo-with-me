import { css, cva, cx } from '@style/css';

import { Text, type TextProps } from './Text';

type Theme = 'success' | 'danger' | 'warning' | 'info';

interface Props extends TextProps {
  theme: Theme;
}

export function Chip({ className, children, theme = 'info', ...props }: Props) {
  return (
    <Text.Label size="sm" className={cx(className, style, themeStyle({ theme }))} {...props}>
      {children}
    </Text.Label>
  );
}

const style = css({
  borderRadius: 'full',
  border: '1px solid',
  paddingX: '1rem',
  paddingY: '0.25rem',
});

const themeStyle = cva({
  variants: {
    theme: {
      success: {
        borderColor: 'alert.success',
        background: 'alert.success.dark',
      },
      warning: {
        borderColor: 'alert.warning',
        background: 'alert.warning.dark',
      },
      danger: {
        borderColor: 'alert.danger',
        background: 'alert.danger.dark',
      },
      info: {
        borderColor: 'alert.info',
        background: 'alert.info.dark',
      },
    },
  },
});
