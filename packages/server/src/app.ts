import cors from "cors";
import express from "express";
import { pinoHttp } from "pino-http";

import { logger } from "./config/logger.js";

export async function build() {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
  app.use(pinoHttp({ logger }));

  return app;
}
