import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Socket } from '@/utils/socket';

interface Props {
  socket: Socket;
  endsAt: Date;
  socketEvent: string;
  pingTime: number;
}

export default function useSocketTimer({ socket, endsAt, socketEvent, pingTime }: Props) {
  const timerIntervalId = useRef<NodeJS.Timeout | null>(null);
  const pingIntervalId = useRef<NodeJS.Timeout | null>(null);

  const endTime = useMemo(() => endsAt.getTime(), [endsAt]);
  const [isTimeout, setIsTimeout] = useState(false);
  const [remainMiliSeconds, setRemainMiliSeconds] = useState<number>(-1);

  useEffect(() => {
    if (pingIntervalId.current) clearInterval(pingIntervalId.current);

    socket.emit(socketEvent);
    socket.on(socketEvent, handlePingMessage);

    pingIntervalId.current = setInterval(() => {
      socket.emit(socketEvent);
    }, pingTime);
  }, [socket]);

  const handlePingMessage = useCallback(
    (time: Date) => {
      console.log('서버에서 온 시간 websocket 연결 확인 용', time);
      if (timerIntervalId.current) clearInterval(timerIntervalId.current);

      time = typeof time === 'string' ? new Date(time) : time;

      const remainMiliSec = endTime - time.getTime();
      setRemainMiliSeconds(remainMiliSec);

      timerIntervalId.current = setInterval(() => {
        setRemainMiliSeconds((prev) => prev - 1000);
      }, 1000);
    },
    [endTime],
  );

  useEffect(() => {
    // 초기 값인 -1 => 서버에서 시간이 오지 않았다.
    if (remainMiliSeconds === -1) return;
    if (Math.floor(remainMiliSeconds / 1000) <= 0) {
      setIsTimeout(true);
    }
  }, [remainMiliSeconds]);

  return { remainMiliSeconds, isTimeout };
}
