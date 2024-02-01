import { Server, Socket } from "socket.io";

import { redis } from "../config/redis.js";
import { createUnusedId } from "../utils/id.js";

export function roomHandler(io: Server, socket: Socket) {
  socket.on("disconnecting", async () => {
    try {
      for (const room of socket.rooms) {
        if (room !== socket.id) {
          const roomKey = `room:${room}`;
          const roomState = await redis.get(roomKey);

          if (!roomState) {
            return;
          }

          const { players } = JSON.parse(roomState);
          const newPlayerList = players.filter(
            (player: any) => player.id !== socket.id
          );

          if (newPlayerList.length === 0) {
            return redis.del(roomKey);
          }

          io.to(room).emit("room:leave", {
            payload: {
              id: socket.id,
              username: socket.data.username,
            },
          });
        }
      }
    } catch (err) {
      console.log("something went wrong");
    }
  });

  socket.on("room:create", async (message) => {
    try {
      const { username } = message.payload;
      const roomId = createUnusedId(io);
      const gameState = {
        roomId,
        players: [
          {
            id: socket.id,
            username,
          },
        ],
      };

      await redis.set(`room:${roomId}`, JSON.stringify(gameState));

      socket.data.username = username;
      socket.join(roomId);

      io.to(socket.id).emit("room:create_success", {
        payload: {
          roomId,
        },
      });
    } catch (err) {
      io.to(socket.id).emit("room:create_fail");
    }
  });

  socket.on("room:join", (msg) => {
    const { code, username } = msg.payload;

    if (!io.sockets.adapter.rooms.get(code)) {
      return io.to(socket.id).emit("room:join_jail", {});
    }

    socket.join(code);
    io.to(code).emit("room:join_success", {
      payload: {
        username,
        roomId: code,
      },
    });
  });
}
