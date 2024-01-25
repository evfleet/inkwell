import { customAlphabet } from "nanoid";
import { Server } from "socket.io";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
);

export function createId(length = 12) {
  return nanoid(length);
}

export function createUnusedId(io: Server) {
  const id = createId();

  if (!io.sockets.adapter.rooms.get(id)) {
    console.log("return id");
    return id;
  }

  console.log("id used, generating new");
  return createUnusedId(io);
}
