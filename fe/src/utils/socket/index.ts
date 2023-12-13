import { isNil } from '@/utils/type';

import type { ManagerOptions, SocketOptions } from 'socket.io-client';
import { io, type Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL;

export type ConnectOptions = Partial<ManagerOptions & SocketOptions>;

export function createSocketInstance(url: string, opts: ConnectOptions = {}) {
  return io(`${SOCKET_URL}${url}`, opts);
}

type SocketDict = Record<string, Socket | undefined>;
const socketDict: SocketDict = {};

export function connect(url: string, opts: ConnectOptions = {}) {
  if (!isNil(socketDict[url])) return socketDict[url] as Socket;
  socketDict[url] = createSocketInstance(url, opts);

  return socketDict[url] as Socket;
}

export function disconnect(url: string) {
  if (isNil(socketDict[url])) return;
  socketDict[url]?.disconnect();
  socketDict[url] = undefined;
}

export type { Socket };
