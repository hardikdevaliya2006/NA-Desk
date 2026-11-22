-- Auth feature: application user details.
-- The `create-user`, `update-user` and `delete-user` Supabase Edge Functions
-- keep this table in sync with auth.users when employees are created/updated.
create table public.roles (
  id bigint generated always as identity not null,
  user_id uuid not null,
  role text not null default 'user'::text,
  created_at timestamp with time zone null default now(),
  name text null,
  email text null,
  password text null,
  constraint roles_pkey primary key (id),
  constraint roles_user_id_key unique (user_id),
  constraint fk_user foreign key (user_id) references auth.users (id) on delete cascade
) tablespace pg_default;
