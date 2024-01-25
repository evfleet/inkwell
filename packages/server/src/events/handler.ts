import { Server, Socket } from "socket.io";

import { createUnusedId } from "../utils/id.js";

export function handler(io: Server, socket: Socket) {
  socket.on("room:create", () => {
    const roomId = createUnusedId(io);

    socket.join(roomId);

    io.to(socket.id).emit("room:create_success", {
      payload: {
        roomId,
      },
    });
  });

  socket.on("room:join", (msg) => {
    const { code, username } = msg.payload;

    console.log("attempt join");

    if (!io.sockets.adapter.rooms.get(code)) {
      console.log("room doesnt exist");
      io.to(socket.id).emit("room:join_jail", {});
      return;
    }

    console.log("room exists, joining");
    socket.join(code);
    io.to(code).emit("room:join_success", {
      payload: {
        username,
        roomId: code,
      },
    });
  });
}
