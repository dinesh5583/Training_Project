create table category_tbl(
	cat_id serial primary key,
	parent_id serial not null,
	cat_name varchar(100) not null,
	created_by varchar(100),
	created_at DATE DEFAULT CURRENT_DATE
)