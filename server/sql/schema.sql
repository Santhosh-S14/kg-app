create extension if not exists "uuid-ossp";

create table if not exists items (
  id uuid primary key default uuid_generate_v4(),
  url text not null,
  title text,
  status text not null default 'inbox',
  created_at timestamptz not null default now()
);
