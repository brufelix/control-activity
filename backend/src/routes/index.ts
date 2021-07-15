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
  createProject,
  addUserProject
} from "../controllers";

export default (app: Express) => {
  // activity
  app.post("/api/activity", createAct);
  app.post("/api/activity/delete", removeAct);
  app.post("/api/activity/delivery", deliveryAct);
  app.post("/api/activity/updateAct", updateAct);
  app.post("/api/activity/done", doneAct);
  app.post("/api/activity/search", searchAct);
  app.post("/api/activity/updateposition", updatePositionAct);
  // group
  app.post("/api/group", createGro);
  app.post("/api/group/list", listGro);
  app.post("/api/group/update", updateGro);
  app.post("/api/groupname", nameGroup);
  app.post("/api/group/delete", deleteGro);
  app.post("/api/group/updateposition", updatePositionGro);
  // user
  app.post("/api/user/create", registerUser);
  app.post("/api/user/auth", authetication);
  // project
  app.post("/api/projects", listProject);
  app.post("/api/project/create", createProject);
  app.post("/api/project/add_user", addUserProject);
};
