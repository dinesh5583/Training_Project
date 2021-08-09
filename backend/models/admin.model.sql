Create extension if not exists "uuid-ossp";
create table admin_tbl(
	admin_id uuid primary key default uuid_generate_v4(),
	admin_name varchar(50) not null,
	admin_email varchar(155) not null,
	password varchar(255) not null,
	role_id int,
	is_active boolean not null,
	created_at DATE DEFAULT CURRENT_DATE,
	constraint fk_admin_role foreign key(role_id) references role_tbl(role_id)
)

create table role_tbl(
	role_id serial primary key,
	role_name varchar(100) not null,
	created_at DATE DEFAULT CURRENT_DATE
)
