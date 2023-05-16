require("dotenv").config(); //환경변수

const express = require("express");
const cors = require("cors");
const logger = require("morgan"); // morgan 모듈 추가하기
const app = express();
const { DataSource } = require("typeorm");

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

appDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});

//미들웨어
app.use(cors());
app.use(logger("combined"));
app.get("/create_users_table", function (req, res, next) {
  res.json({ message: "userCreated" });
});

const port = process.env.PORT;

app.listen(8000, function () {
  console.log("server listening on port 8000");
});
