import { css } from '@style/css';

import Loading from '@/components/Common/Loading';

export default function Connection() {
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
