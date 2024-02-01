import { Server, Socket } from "socket.io";

import { roomHandler } from "./room.handler.js";

export function handler(io: Server, socket: Socket) {
  roomHandler(io, socket);
}
