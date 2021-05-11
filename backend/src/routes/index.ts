import { Express } from "express";

import {
  createAct,
  removeAct,
  updateGro,
  createGro,
  listGro,
} from "../controllers";

export default (app: Express) => {
  app.post("/api/activity", createAct);
  app.post("/api/activity/delete", removeAct);
  app.post("/api/group", createGro);
  app.get("/api/group", listGro);
  app.post("/api/activity/updateAct", updateGro);
};