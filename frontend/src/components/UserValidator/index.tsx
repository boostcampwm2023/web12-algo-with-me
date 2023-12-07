import { useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { SocketContext } from '../Common/Socket/SocketContext';

export function UserValidator() {
  const { socket, isConnected } = useContext(SocketContext);

  const navigate = useNavigate();

  const handleMessage = useCallback(() => {
    navigate('/');
  }, []);

  useEffect(() => {
    if (!socket) return;

    if (!socket?.hasListeners('message')) {
      socket.on('message', handleMessage);
    }
  }, [socket, isConnected]);
  return <></>;
}
