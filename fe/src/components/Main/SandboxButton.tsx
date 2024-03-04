import { css } from '@style/css';

import { Button, Link, Text } from '@/components/Common';

export function SandboxButton() {
  return (
    <Link to={'/'} underline={false}>
      <Button className={buttonStyle} theme="brand">
        <Text.Body className={LinkTextStyle} size="lg">
          둘러 보기
        </Text.Body>
      </Button>
    </Link>
  );
}

const buttonStyle = css({
  width: '120px',
});

const LinkTextStyle = css({
  color: 'text',
});
