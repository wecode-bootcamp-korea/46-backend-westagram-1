require("dotenv").config();

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const { DataSource } = require('typeorm');

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT;


app.use(cors());
app.use(logger('combined'));
app.use(express.json());
app.use(routes);


const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

appDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  });


// app.get('/ping', function(req, res, next) {
//   res.json({ message: 'pong' });
// });

//과제 3번===================================================

app.post('/users/signup', async(req, res, next) => {
  const { name, email, password } = req.body;

  await appDataSource.query(
      `INSERT INTO users(
          name, 
          email,
          password
      ) VALUES (?, ?, ?);
      `, [name, email, password]
  );
  res.status(201).json({ message : "userCreated"});
}) ;


//과제 4번===================================================

  app.get("/posts/lookup", async(req, res, next) => {
    await appDataSource.query(
        `SELECT 
                users.id as userId, 
                users.profile_image as userProfileImage, 
                posts.id as postingId, 
                posts.image_url as postingImageUrl, 
                posts.content as postingContent 
            FROM users 
            INNER JOIN posts 
            ON users.id = posts.user_id
        `, (err, rows) => {
            res.status(200).json({ "data" : rows });
        });
})

// 과제 5번======================================================

app.get("/users/posts/lookup/:id", async(req, res, next) => {
  const { id } = req.params;
  
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
          WHERE users.id = ${id}; 
      `, 
      (err, rows) => { 
          //console.log(rows);
          let postings
          res.status(200).json(
              { "data" : {
                      "userId" : rows[0].userId, 
                      "userProfileImage" : rows[0].userProfileImage,
                      "postings" : postArr(rows)
                  }
              });
      });
})

const postArr = rows => {
  for(let i=0; i<rows.length; i++){
      delete rows[i].userId;
      delete rows[i].userProfileImage;
  }
  return rows;
}

//과제 6번===================================================

app.patch("/posts/update/:userId/:postId", async(req, res, next) => {
  const { userId, postId } = req.params;
  const { content } = req.body;
  await appDataSource.manager.query(
      ` UPDATE 
              posts 
          SET content=? 
          WHERE user_id=${userId} and id=${postId};
      `, [content]
  );

  await appDataSource.manager.query(    
      `SELECT 
              users.id as userId, 
              users.name as userName, 
              posts.id as postingId, 
              posts.title as postingTitle, 
              posts.content as postingContent 
          FROM users 
          INNER JOIN posts 
          ON users.id = posts.user_id
          WHERE users.id=${userId} and posts.id=${postId};
      `, (err, rows) => { 
          console.log(rows)
          res.status(200).json({"data" : rows});
  });
})

//과제 7번===================================================


app.delete('/posts/:postId', async (req, res) => {
  const { postId } = req.params
  await appDataSource.query(`DELETE FROM posts WHERE posts.id = ${postId}`)
  res.status(204).json({ message: 'successfully deleted' })
})



//과제 8번===================================================

app.post("/likes/:userId/:postId", async(req, res, next) => {
  const { userId, postId } = req.params;

  await appDataSource.query(
    `INSERT INTO likes(
      user_id,
      post_id       
    ) VALUES (${userId}, ${postId});
    `);
  res.status(200).json({masage:"likeCreated"});
})


//과제 종료=================================================

app.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}`);
});
