import type { ManagerOptions, SocketOptions } from 'socket.io-client';
import { io } from 'socket.io-client';

export type { Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL;

export type ConnectOptions = Partial<ManagerOptions & SocketOptions>;

export function createSocketInstance(url: string, opts: ConnectOptions = {}) {
  console.log('소켓 인스턴스 생성');
  return io(`${SOCKET_URL}${url}`, { ...opts, reconnectionDelay: 1000 });
}
