-- migrate:up
create table likes (
  id int not null auto_increment,
  user_id int not null,
  post_id int not null,
    PRIMARY KEY(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (post_id) REFERENCES posts(id)
  -- user_id, post_id 동시중복을 피하는 sql제약문을 걸어야 한다. 
);
-- migrate:down
drop table likes;