require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const { DataSource } = require("typeorm");

//미들웨어
app.use(cors());
app.use(logger("combined"));
app.use(express.json());

const port = process.env.PORT;

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

app.get("/ping", function (req, res, next) {
  res.json({ message: "pong" });
});

//create a users

app.post("/users", async (req, res) => {
  const { name, email, profileImage, password } = req.body; //구조분해할당

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

app.listen(8000, function () {
  console.log("server listening on port 8000");
});
