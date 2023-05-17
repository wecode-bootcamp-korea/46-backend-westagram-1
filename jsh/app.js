require("dotenv").config();

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const { DataSource } = require('typeorm');

const app = express();
// 미들웨어 등록
app.use(cors());
app.use(logger('combined'));
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
    console.log("Data Source has been initialized!");
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

// 서버 실행
app.listen(6000, function() {
  console.log('server listening on port 6000');
});