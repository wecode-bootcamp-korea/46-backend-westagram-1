require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { DataSource } = require("typeorm");

const app = express();

app.use(cors());
app.use(logger("dev"));
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
  const { title, content, userId, imageUrl } = req.body;
  await appDataSource.query(
    `
    INSERT INTO posts(
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

app.get("/posts", async (req, res) => {
  await appDataSource.posts.query(
    `
    SELECT 
      users.id as userId, 
      users.profile_image as userProfileImage, 
      posts.id as postingId, 
      posts.image_url as postingImageUrl, 
      posts.content as postingContent 
      FROM users 
      INNER JOIN posts 
      ON users.id = posts.user_id
    `,
    (err, rows) => {
      res.status(200).json({ data: rows });
    }
  );
});

app.get("/posts/posting/:id", async (req, res) => {
  const { id } = req.params;
  const userPosting = await appDataSource.query(
    `
    SELECT 
      users.id as userId, 
      users.profile_image as userProfileImage, 
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "postingId", posts.id,
          "postingImageUrl", posts.image_url,
          "postingContent", posts.content
          )
          ) AS postings
      FROM posts 
      JOIN  users
      ON users.id = posts.user_id
      WHERE users.id = ?;
    `,
    [id]
  );
  res.status(200).json({ data: userPosting });
});

app.patch("/posts/:userId/:postId", async (req, res) => {
  const { userId, postId } = req.params;
  const { content } = req.body;
  const updateContent = await appDataSource.query(
    `
    UPDATE posts
    SET content= ?
    WHERE user_id=${userId} and id=${postId}
    `,
    [content]
  );
  const updatePost = await appDataSource.query(
    `
    SELECT
      users.id as userId, 
      users.name as userName,
      posts.id as postingID,
      posts.title as postingTitle,
      posts.content as postingContent
    FROM users 
    INNER JOIN posts
    ON posts.user_id = users.id
    WHERE users.id=${userId} and posts.id=${postId} 
    `
  );
  res.status(200).json({ data: updatePost });
});

app.delete("/posts/delete/:postId", async (req, res) => {
  const { postId } = req.params;
  const result = await appDataSource.query(
    `
    DELETE 
    FROM posts
    WHERE id = ?
    `,
    [postId]
  );
  res.status(204).json({ message: "successfully deleted" });
});

app.post("/likes/:userId/:postId", async (req, res) => {
  const { userId, postId } = req.params;
  await appDataSource.query(
    `
      INSERT INTO likes(
        user_id,
        post_id
      ) VALUES (?,?)
      `,
    [userId, postId]
  );
  res.status(201).json({ message: "likesCreated" });
});

const PORT = process.env.PORT;

app.listen(PORT, function () {
  console.log(`server listening on port ${PORT}`);
});
