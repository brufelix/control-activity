import express from "express";
import { connection } from "./database";
import middlewares from "./middlewares";
import routes from "./routes";

const app = express();

middlewares(app);
connection();
routes(app);

app.listen(3001, () => console.log("Server running on port 3001..."));
