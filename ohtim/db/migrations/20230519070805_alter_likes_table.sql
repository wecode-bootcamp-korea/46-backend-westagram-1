-- migrate:up
ALTER TABLE likes
ADD CONSTRAINT unique_user_post UNIQUE (user_id, post_id);


-- migrate:down
DROP TABLE likes
