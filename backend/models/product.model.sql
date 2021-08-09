Create extension if not exists "uuid-ossp";

create table product_tbl(
	pro_id uuid primary key default uuid_generate_v4(),
	pro_name varchar(100) not null,
	pro_desc varchar(250) not null,
	cat_id int not null,
	is_active boolean,
	created_by varchar(100),
	created_at DATE DEFAULT CURRENT_DATE,
	constraint fk_cat_id foreign key(cat_id) references category_tbl(cat_id)
)