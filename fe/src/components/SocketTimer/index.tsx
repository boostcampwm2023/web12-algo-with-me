import { css } from '@style/css';

import { useContext, useEffect } from 'react';

import { Loading } from '@/components/Common';
import useSocketTimer from '@/hooks/timer/useSocketTimer';
import { formatMilliSecond } from '@/utils/date';

import { SocketContext } from '../Common/Socket/SocketContext';

interface Props {
  onTimeout?: () => void;
  endsAt: string;
}

const COMPEITION_PING_TIME = 5 * 1000;
const COMPEITION_SOCKET_EVENT = 'ping';

export default function SocketTimer(props: Props) {
  const { socket, isConnected } = useContext(SocketContext);
  const { onTimeout, endsAt } = props;

  const { remainMiliSeconds, isTimeout } = useSocketTimer({
    socket,
    endsAt,
    socketEvent: COMPEITION_SOCKET_EVENT,
    pingTime: COMPEITION_PING_TIME,
  });

  useEffect(() => {
    if (isTimeout && typeof onTimeout === 'function') onTimeout();
  }, [isTimeout, onTimeout]);

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
