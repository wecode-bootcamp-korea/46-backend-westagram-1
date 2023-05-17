-- migrate:up
ALTER TABLE posts ADD COLUMN image_url varchar(1000) NOT NULL;

-- migrate:down
DROP TABLE posts

