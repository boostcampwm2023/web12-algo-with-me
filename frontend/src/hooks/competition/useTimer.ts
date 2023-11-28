import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Socket } from 'socket.io-client';

interface UseTimer {
  socket: Socket;
  endsAt: Date;
}

export default function useTimer({ socket, endsAt }: UseTimer) {
  const timerIntervalId = useRef<NodeJS.Timeout | null>(null);
  const endTime = useMemo(() => endsAt.getTime(), [endsAt]);
  const [remainTime, setRemainTime] = useState<number>(-1);
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
    const remainSec = endTime - time.getTime();
    setRemainTime(remainSec);
    timerIntervalId.current = setInterval(() => {
      console.log('1초마다 실행');
      setRemainTime((prev) => prev - 1000);
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
    // TODO time 0이면 대시보드로 이동하는 로직
    // 해당 PR에서 해결할 문제는 아니라 PASS
    if (remainTime === 0) {
      // 나가는 로직
    }
  }, [remainTime]);
  return { remainTime };
}
