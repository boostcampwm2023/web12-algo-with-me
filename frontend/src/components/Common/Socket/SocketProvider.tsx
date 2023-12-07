import { ReactNode, useEffect, useRef, useState } from 'react';

import { connect, disconnect } from '@/utils/socket';

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
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const socket = useRef(
    connect(`/${namespace}`, {
      transports,
      query,
      auth: {
        token: `Bearer ${token}`,
      },
    }),
  );

  const handleConnect = () => {
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
  }, [socket.current]);

  useEffect(() => {
    if (!socket.current) return;
    return () => {
      disconnect(`/${namespace}`);
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        socket: socket.current,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
