import { Express } from "express";

import {
  createAct,
  removeAct,
  updateAct,
  createGro,
  listGro,
  doneAct,
  updateGro,
  deliveryAct,
  nameGroup,
  searchAct,
  updatePositionAct,
  deleteGro,
  updatePositionGro,
  registerUser,
  authetication,
  listProject,
} from "../controllers";

export default (app: Express) => {
  app.post("/api/activity", createAct);
  app.post("/api/activity/delete", removeAct);
  app.post("/api/group", createGro);
  app.get("/api/group", listGro);
  app.post("/api/group/update", updateGro);
  app.post("/api/activity/updateAct", updateAct);
  app.post("/api/activity/done", doneAct);
  app.post("/api/activity/delivery", deliveryAct);
  app.post("/api/activity/search", searchAct);
  app.post("/api/groupname", nameGroup);
  app.post("/api/group/delete", deleteGro);
  app.post("/api/activity/updateposition", updatePositionAct);
  app.post("/api/group/updateposition", updatePositionGro);
  app.post("/api/user/create", registerUser);
  app.post("/api/user/auth", authetication);
  app.post("/api/project", listProject);
};
