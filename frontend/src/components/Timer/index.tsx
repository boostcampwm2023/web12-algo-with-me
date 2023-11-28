import { css } from '@style/css';

import Loading from '@/components/Common/Loading';
import useTimer from '@/hooks/timer/useTimer';
import { formatMilliSecond } from '@/utils/date';
import type { Socket } from '@/utils/socket';

interface Props {
  socket: Socket;
  endsAt: Date;
  isConnected?: boolean;
}

export default function Timer(props: Props) {
  let { socket, endsAt, isConnected } = props;
  // api 연결이 X endsAt 대신 임시로 만들어놓은 것.
  endsAt = new Date('2023-11-29T13:10:10.000Z');
  const { remainMiliSeconds } = useTimer({ socket, endsAt });

  if (isConnected && remainMiliSeconds !== -1) {
    // 연결도 되어있고, 서버 시간도 도착해서 count down을 시작할 수 있을 때
    return (
      <section className={wrapperStyle}>
        <div>
          <span className={timeTextStyle}>{formatMilliSecond(remainMiliSeconds, 'hh:mm:ss')}</span>
        </div>
      </section>
    );
  }

  return (
    <section className={wrapperStyle}>
      <div>
        <section className={loadingBoxStyle}>
          <span className={disconnectedStyle}>연결 중...</span>
          <Loading color="darkred" size="24px" />
        </section>
      </div>
    </section>
  );
}

const wrapperStyle = css({
  display: 'flex',
  alignItems: 'center',
});

const disconnectedStyle = css({
  color: 'darkred',
});

const loadingBoxStyle = css({
  display: 'flex',
  gap: '1rem',
});

const timeTextStyle = css({
  color: 'lightgray',
  fontWeight: 'bold',
});
