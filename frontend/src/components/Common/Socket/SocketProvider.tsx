import { ReactNode, useEffect, useRef, useState } from 'react';

import { connect, disconnect } from './index';
import { SocketContext } from './SocketContext';

interface Props {
  namespace: string;
  query: Record<string, string>;
  transports: string[];
  token?: string;
  children: ReactNode;
}

export function SocketProvider({
  namespace = '',
  transports = ['websocket'],
  query = {},
  token = '',
  children,
}: Props) {
  const socket = useRef(
    connect(`/${namespace}`, {
      transports,
      query,
      auth: {
        token: `Bearer ${token}`,
      },
    }),
  );

  const [isConnected, setIsConnected] = useState<boolean>(false);

  const onUnmounted = disconnect(`/${namespace}`);

  const handleConnect = () => {
    console.log('connected!');
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  useEffect(() => {
    if (!socket.current.hasListeners('connect')) {
      socket.current.on('connect', handleConnect);
    }
    if (!socket.current.hasListeners('disconnect')) {
      socket.current.on('disconnect', handleDisconnect);
    }
  }, []);

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        socket: socket.current,
        onUnmounted,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
