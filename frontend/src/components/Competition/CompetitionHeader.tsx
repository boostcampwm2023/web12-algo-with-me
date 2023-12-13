import { css, cx } from '@style/css';

import { VStack, type VStackProps } from '../Common';

interface Props extends VStackProps {}

export default function CompetitionHeader({ className, children, ...props }: Props) {
  return (
    <VStack alignItems="center" className={cx(className, headerStyle)} as="header" {...props}>
      {children}
    </VStack>
  );
}

const headerStyle = css({
  height: '4rem',
  paddingY: '0.5rem',
  borderBottom: '1px solid',
  borderColor: 'border',
  gap: '1rem',
  placeItems: 'center',
});
