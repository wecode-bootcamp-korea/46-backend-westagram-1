-- migrate:up
SET FOREIGN_KEY_CHECKS=0;
ALTER TABLE comments MODIFY id INT AUTO_INCREMENT NOT NULL;

-- migrate:down
DROP TABLE comments
