import cors from "cors";
import express from "express";

import router from "./routes/router.js";

export async function build() {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

  app.use(router);

  return app;
}
