import { css } from '@style/css';

import { SandboxLayout } from '@/components/Layout/SandboxLayout';
import { Sandbox } from '@/components/Sandbox';
export function SandboxPage() {
  return (
    <>
      <SandboxLayout className={style}>
        <Sandbox />
      </SandboxLayout>
    </>
  );
}

const style = css({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});
