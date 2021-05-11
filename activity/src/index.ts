import express from "express";
import { connection } from "./database";
import middlewares from "./middlewares";

const app = express();

middlewares(app);
connection();

app.listen(3000, () => console.log("Server running on port 3000..."))