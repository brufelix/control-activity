import { Express } from "express";

import create from "../controllers/create";

export default (app: Express) => {
  app.post("/api/create", create);
}