-- Allow a signed-in user to read their own row from the roles table.
-- Without this policy the client-side query in getUserRole() returns no rows
-- (RLS filters them out), so the sidebar falls back to the email prefix.
-- Run this in the Supabase SQL editor.

alter table public.roles enable row level security;

drop policy if exists "Users can read own role" on public.roles;

create policy "Users can read own role"
  on public.roles
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Optional: also allow lookups by email for accounts whose roles row was
-- created outside the create-user flow (user_id may not match auth.uid()).
drop policy if exists "Users can read role by email" on public.roles;

create policy "Users can read role by email"
  on public.roles
  for select
  to authenticated
  using (
    email is not null
    and email = coalesce(auth.jwt() ->> 'email', '')
  );
