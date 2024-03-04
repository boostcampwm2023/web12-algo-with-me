import { css } from '@style/css';

import { Sandbox } from '@/components/Sandbox';

export function SandboxPage() {
  return (
    <>
      <div className={style}>
        <Sandbox />
      </div>
    </>
  );
}

const style = css({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});
