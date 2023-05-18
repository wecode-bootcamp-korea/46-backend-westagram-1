require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { DataSource } = require("typeorm");

const app = express();

//미들웨어
app.use(cors());
app.use(logger("combined"));
app.use(express.json());

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

app.get("/ping", function (req, res) {
  res.json({ message: "pong" });
});

//create a users
app.post("/users/signup", async (req, res) => {
  const { name, email, profileImage, password } = req.body;

  await appDataSource.query(
    `
    INSERT INTO users(
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

app.post("/posts", async (req, res) => {
  const { title, content, userId, imageUrl } = req.body; //

  await appDataSource.query(
    `INSERT INTO posts(
                title,
                content,
                user_id,
                image_url
            ) VALUES (?, ?, ?, ?);
            `,
    [title, content, userId, imageUrl]
  );
  res.status(201).json({ message: "postsCreated" });
});

const PORT = process.env.PORT;

app.listen(PORT, function () {
  console.log("server listening on port ${port}");
});
