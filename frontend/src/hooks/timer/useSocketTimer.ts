import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Socket } from '@/utils/socket';
import { isNil } from '@/utils/type';

interface Props {
  socket: Socket | null;
  endsAt: Date;
  socketEvent: string;
  pingTime: number;
  disconnect: () => void;
}

export default function useSocketTimer({
  socket,
  endsAt,
  socketEvent,
  pingTime,
  disconnect,
}: Props) {
  const timerIntervalId = useRef<NodeJS.Timeout | null>(null);
  const pingIntervalId = useRef<NodeJS.Timeout | null>(null);

  const endTime = useMemo(() => endsAt.getTime(), [endsAt]);
  const [isTimeout, setIsTimeout] = useState(false);
  const [remainMiliSeconds, setRemainMiliSeconds] = useState<number>(-1);

  useEffect(() => {
    console.log(socket);
    if (pingIntervalId.current) clearInterval(pingIntervalId.current);
    if (isNil(socket)) return;
    socket.emit(socketEvent);
    if (!socket.hasListeners(socketEvent)) {
      socket.on(socketEvent, handlePingMessage);
    }
    pingIntervalId.current = setInterval(() => {
      socket.emit(socketEvent);
    }, pingTime);
  }, [socket]);

  const handlePingMessage = useCallback(
    (time: Date) => {
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

  useEffect(() => {
    return () => {
      if (!isNil(socket)) disconnect();
      if (pingIntervalId.current) clearInterval(pingIntervalId.current);
      if (timerIntervalId.current) clearInterval(timerIntervalId.current);
    };
  }, []);

  return { remainMiliSeconds, isTimeout };
}
