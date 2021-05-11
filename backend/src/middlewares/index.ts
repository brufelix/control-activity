import { Express } from "express";
import bodyparser from "body-parser";
import cors from "cors";

export default (app: Express) => {
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(cors({ origin: "*" }));
}