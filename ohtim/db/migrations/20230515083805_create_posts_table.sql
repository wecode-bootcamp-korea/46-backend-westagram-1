-- migrate:up
CREATE TABLE posts (
  id int NOT NULL,
  title varchar(100) NOT NULL,
  content varchar(3000) DEFAULT NULL,
  user_id int NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  authors varchar(50) NOT NULL,
  like_user varchar(50) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- migrate:down
DROP TABLE posts;

