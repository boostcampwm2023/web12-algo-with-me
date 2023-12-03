import type { ConnectOptions, Socket } from '@/utils/socket';
import { createSocketInstance } from '@/utils/socket';
import { isNil } from '@/utils/type';

interface SocketId {
  [key: string]: Socket | undefined;
}
const socketId: SocketId = {};

export function connect(url: string, opts: ConnectOptions = {}) {
  if (socketId[url] !== undefined) return socketId[url] as Socket;
  socketId[url] = createSocketInstance(url, opts);

  return socketId[url] as Socket;
}

export function disconnect(url: string) {
  return function () {
    if (isNil(socketId[url])) return;
    socketId[url]?.disconnect();
    socketId[url] = undefined;
  };
}
