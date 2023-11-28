import { css } from '@style/css';

import Loading from '@/components/Common/Loading';

interface Props {
  isConnected: boolean;
}

export default function Connecting(props: Props) {
  if (!props.isConnected) return null;

  return (
    <div className={rowStyle}>
      <span>연결 중...</span>
      <Loading color="darkorange" size="24px" />
    </div>
  );
}
const rowStyle = css({
  display: 'flex',
  gap: '0.5rem',
});
