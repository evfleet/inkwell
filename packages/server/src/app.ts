import express from "express";

import router from "./routes/router.js";

export async function build() {
  const app = express();

  app.use(router);

  return app;
}
