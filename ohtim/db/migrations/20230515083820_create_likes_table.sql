-- migrate:up
CREATE TABLE likes (
  id int NOT NULL,
  user_id int NOT NULL,
  post_id int NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (post_id) REFERENCES posts (id)
);

-- migrate:down
DROP TABLE likes;

