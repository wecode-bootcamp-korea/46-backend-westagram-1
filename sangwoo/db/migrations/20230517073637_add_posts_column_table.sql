-- migrate:up
ALTER TABLE posts ADD image_url VARCHAR(300) NULL;

-- migrate:down
ALTER TABLE posts DROP image_url VARCHAR(300) NULL;
