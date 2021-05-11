import { Express } from "express";

import { create, list } from "../controllers";

export default (app: Express) => {
  app.get("/api/activities", list);
  app.post("/api/create", create);
}