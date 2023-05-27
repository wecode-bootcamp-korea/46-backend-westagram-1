-- migrate:up
ALTER TABLE likes ADD CONSTRAINT like_unique UNIQUE KEY (user_id, post_id);

-- migrate:down
ALTER TABLE likes DROP CONSTRAINT like_unique UNIQUE KEY (user_id, post_id);

