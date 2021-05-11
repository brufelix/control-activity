import { Express } from "express";

import { create, list, remove } from "../controllers";

export default (app: Express) => {
  app.get("/api", list);
  app.post("/api", create);
  app.post("/api/delete", remove);
};