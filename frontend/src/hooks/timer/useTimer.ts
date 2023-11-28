import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Socket } from '@/utils/socket';

interface UseTimer {
  socket: Socket;
  endsAt: Date;
  onTimeoutHandler?: () => void;
}

export default function useTimer({ socket, endsAt, onTimeoutHandler }: UseTimer) {
  const timerIntervalId = useRef<NodeJS.Timeout | null>(null);
  const endTime = useMemo(() => endsAt.getTime(), [endsAt]);
  const [remainMiliSeconds, setRemainMiliSeconds] = useState<number>(-1);
  useEffect(() => {
    console.log('타이머 실행');
    // 웹 소켓 대신 사용.
    mockWebSocket();
    if (!socket.hasListeners('ping')) {
      socket.on('ping', handlePingMessage);
    }
  }, [socket]);

  const handlePingMessage = useCallback((time: Date | string) => {
    if (timerIntervalId.current) clearInterval(timerIntervalId.current);

    time = typeof time === 'string' ? new Date(time) : time;
    const remainMiliSec = endTime - time.getTime();
    setRemainMiliSeconds(remainMiliSec);
    timerIntervalId.current = setInterval(() => {
      console.log('1초마다 실행');
      setRemainMiliSeconds((prev) => prev - 1000);
    }, 1000);
  }, []);

  // 웹 소켓 대신 사용.
  // 웹 소켓 연결 후 삭제 예정
  const mockWebSocket = useCallback(() => {
    const delayFactor = 2000;
    setInterval(() => {
      console.log('ping 5초( + 네트워크 지연) 마다 실행');
      const serverTime = new Date();
      handlePingMessage(serverTime);
    }, 5000 + Math.random() * delayFactor);
  }, []);

  useEffect(() => {
    // 초기 값인 -1 => 서버에서 시간이 오지 않았다.
    if (remainMiliSeconds === -1) return;
    if (Math.floor(remainMiliSeconds / 1000) <= 0) {
      if (typeof onTimeoutHandler === 'function') onTimeoutHandler();
      // 나가는 로직
    }
  }, [remainMiliSeconds]);
  return { remainMiliSeconds };
}
