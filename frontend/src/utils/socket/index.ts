import type { ManagerOptions, SocketOptions } from 'socket.io-client';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL;

export type ConnectOptions = Partial<ManagerOptions & SocketOptions>;

export function createSocketInstance(url: string, opts: ConnectOptions = {}) {
  return io(`${SOCKET_URL}${url}`, opts);
}
