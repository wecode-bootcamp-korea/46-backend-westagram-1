-- migrate:up
ALTER TABLE users
ADD CONSTRAINT unique_email UNIQUE (email);


-- migrate:down
DROP TABLE users
