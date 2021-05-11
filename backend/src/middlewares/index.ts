import { Express } from "express";
import bodyparser from "body-parser";

export default (app: Express) => {
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));
}