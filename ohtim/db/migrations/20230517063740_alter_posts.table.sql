-- migrate:up
ALTER TABLE posts DROP COLUMN like_user;

-- migrate:down
DROP TABLE posts


