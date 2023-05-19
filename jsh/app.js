require("dotenv").config();

const express = require('express');
const app=express()
const cors = require('cors');
const { DataSource } = require('typeorm');


// 미들웨어 등록
app.use(cors());
app.use(express.json());
const port = process.env.port

// 환경 변수를 사용하여 데이터베이스 연결 설정
const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// 데이터 소스 초기화
appDataSource.initialize()
  .then(() => {
  });


// 라우팅 설정
app.get('/ping', function(req, res, next) {
  res.json({ message: 'pong' });
});



app.post('/users/signup', async(req, res, next) => {
  const { name, email, profileImage, password } = req.body

  await appDataSource.query(
      `INSERT INTO users(
          name, 
          email,
          profile_image,
          password
      ) VALUES (?, ?, ?, ?);
      `, [name, email, profileImage, password]
  );

  res.status(201).json({ message : "userCreated"});
}) 

app.post('/posts/signup', async(req, res, next) => {
  const { title, content, imageUrl, user_id } = req.body

  await appDataSource.query(
      `INSERT INTO posts(
          title, 
          content,
          imageUrl,
          user_id
      ) VALUES (?, ?, ?, ?);
      `, [title, content, imageUrl, user_id]
  );

  res.status(201).json({ message : "postCreated"});
}) 

app.get("/posts/lookup", async(req, res, next) => {
  await appDataSource.manager.query(
      `SELECT 
              users.id as userId, 
              users.profile_image as userProfileImage, 
              posts.id as postingId, 
              posts.imageurl as postingImageUrl, 
              posts.content as postingContent 
          FROM users 
          INNER JOIN posts 
          ON users.id = posts.user_id
      `, (err, rows) => {
          res.status(200).json({ "data" : rows });
      });
})

app.get("/posts/lookup_1user", async(req, res, next) => {
  const userId = req.params.id;
  await appDataSource.manager.query(
      `SELECT 
              users.id as userId, 
              users.profile_image as userProfileImage, 
              posts.id as postingId, 
              posts.imageurl as postingImageUrl, 
              posts.content as postingContent 
          FROM users 
          INNER JOIN posts 
          ON users.id = posts.user_id
          WHERE users.id = 1
      `, (err, rows) => {
          res.status(200).json({ "data" : rows });
      });
})
서버 실행
app.listen(6000, function() {
});