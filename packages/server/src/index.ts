import "dotenv/config";
import http from "http";
import { Server } from "socket.io";

import { build } from "./app.js";
import { logger } from "./config/logger.js";

const start = async () => {
  const app = await build();
  const port = 8081;
  const server = http.createServer(app);
  const io = new Server(server);

  server.listen(port, () => {
    logger.info(`Server running on port: ${port}`);
  });

  io.on("connection", (socket) => {
    logger.info("a user connected");
  });
};

start();
