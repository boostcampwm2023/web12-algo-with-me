import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Socket } from '@/utils/socket';

interface Props {
  socket: Socket;
  endsAt: Date;
  socketEvent: string;
}

export default function useSocketTimer({ socket, endsAt, socketEvent }: Props) {
  const timerIntervalId = useRef<NodeJS.Timeout | null>(null);
  const endTime = useMemo(() => endsAt.getTime(), [endsAt]);
  const [isTimeout, setIsTimeout] = useState(false);
  const [remainMiliSeconds, setRemainMiliSeconds] = useState<number>(-1);

  useEffect(() => {
    console.log('타이머 실행');
    // 웹 소켓 대신 사용.
    mockWebSocket();
    socket.emit(socketEvent);
    if (socket.hasListeners(socketEvent)) {
      socket.on(socketEvent, handlePingMessage);
    }
  }, [socket]);

  const handlePingMessage = useCallback((time: Date | string) => {
    console.log(time);
    if (timerIntervalId.current) clearInterval(timerIntervalId.current);

    time = typeof time === 'string' ? new Date(time) : time;
    const remainMiliSec = endTime - time.getTime();
    setRemainMiliSeconds(remainMiliSec);
    timerIntervalId.current = setInterval(() => {
      setRemainMiliSeconds((prev) => prev - 1000);
    }, 1000);
  }, []);

  // 웹 소켓 대신 사용.
  // 웹 소켓 연결 후 삭제 예정
  const mockWebSocket = useCallback(() => {
    const delayFactor = 2000;
    const serverTime = new Date();
    handlePingMessage(serverTime);
    setInterval(() => {
      const serverTime = new Date();
      handlePingMessage(serverTime);
    }, 5000 + Math.random() * delayFactor);
  }, []);

  useEffect(() => {
    // 초기 값인 -1 => 서버에서 시간이 오지 않았다.
    if (remainMiliSeconds === -1) return;
    if (Math.floor(remainMiliSeconds / 1000) <= 0) {
      setIsTimeout(true);
    }
  }, [remainMiliSeconds]);
  return { remainMiliSeconds, isTimeout };
}
