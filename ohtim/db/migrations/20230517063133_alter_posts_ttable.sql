-- migrate:up
ALTER TABLE posts DROP COLUMN authors;

-- migrate:down
DROP TABLE posts
