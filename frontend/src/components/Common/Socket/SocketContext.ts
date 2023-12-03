import { createContext } from 'react';

import type { Socket } from '@/utils/socket';

export interface SocketContextProps {
  socket: Socket | null;
  isConnected: boolean;
  onUnmounted: () => void;
}

export const SocketContext = createContext<SocketContextProps>({
  socket: null,
  isConnected: false,
  onUnmounted: () => {},
});
