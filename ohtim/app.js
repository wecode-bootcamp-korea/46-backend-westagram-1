import express from "express";
import cors from "cors";
import morgan from "morgan";
import * as http from "http";
import { myDataSource } from "./env.js";
import { PORT } from "./db.js";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const server = http.createServer(app);

const start = async () => {
  server.listen(PORT, () => {
    console.log(`server is listening on port:${PORT}`);
  });
};
