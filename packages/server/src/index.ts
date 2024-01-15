import "dotenv/config";
import { WebSocket, WebSocketServer } from "ws";

import { build } from "./app.js";
import { logger } from "./config/logger.js";

const start = async () => {
  const app = await build();
  const port = 8081;

  const server = app.listen(port, () => {
    logger.info(`Server running on port: ${port}`);
  });

  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    ws.on("error", logger.error);

    ws.on("message", (msg, isBinary) => {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(msg, { binary: isBinary });
        }
      });
    });

    ws.on("close", () => {
      logger.info("Connection closed");
    });
  });
};

start();
