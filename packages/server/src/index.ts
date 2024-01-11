import { WebSocket, WebSocketServer } from "ws";

import { build } from "./app.js";

const start = async () => {
  const app = await build();
  const port = 8081;

  const server = app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });

  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    ws.on("error", console.error);

    ws.on("message", (msg, isBinary) => {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(msg, { binary: isBinary });
        }
      });
    });

    ws.on("close", () => {
      console.log("Connection closed");
    });
  });
};

start();
