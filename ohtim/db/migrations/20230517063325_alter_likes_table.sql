-- migrate:up
SET FOREIGN_KEY_CHECKS=0;
ALTER TABLE likes MODIFY id INT AUTO_INCREMENT NOT NULL;
SET FOREIGN_KEY_CHECKS=0;
-- migrate:down
DROP TABLE likes
