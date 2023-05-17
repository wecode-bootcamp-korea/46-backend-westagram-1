require("dotenv").config(); //환경변수

const express = require("express");
const cors = require("cors");
const logger = require("morgan"); // morgan 모듈 추가하기
const app = express();
const { DataSource } = require("typeorm");

//미들웨어
app.use(cors());
app.use(logger("combined"));
app.use(express.json());

const PORT = process.env.PORT;

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

app.get("/ping", function (req, res) {
  res.json({ message: "pong" });
});

//create a users

app.post("/users", async (req, res) => {
  const { name, email, profileImage, password } = req.body;
  console.log(name);

  await appDataSource.query(
    `INSERT INTO users(
              name,
              email,
              profile_image,
              password
          ) VALUES (?, ?, ?, ?);
          `,
    [name, email, profileImage, password]
  );
  res.status(201).json({ message: "usersCreated" });
});

app.listen(PORT, function () {
  console.log("server listening on port ${port}");
});
