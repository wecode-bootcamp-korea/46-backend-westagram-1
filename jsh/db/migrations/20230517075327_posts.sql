-- migrate:up
alter table posts add column imageUrl varchar(300) null;

-- migrate:down
alter table posts drop column imageUrl;

