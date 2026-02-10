create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  encrypted_password text not null default '',
  full_name text not null default '',
  profile_type text default 'standard' check (profile_type in ('standard','premium')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.users (id, email, encrypted_password, full_name, profile_type, created_at, updated_at)
  values (
    new.id,
    new.email,
    '',
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'standard',
    now(),
    now()
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();

create or replace function public.handle_user_update()
returns trigger
language plpgsql
security definer
as $$
begin
  update public.users
    set email = new.email,
        full_name = coalesce(new.raw_user_meta_data->>'full_name', public.users.full_name),
        updated_at = now()
  where id = new.id;
  return new;
end;
$$;

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update on auth.users
  for each row
  execute procedure public.handle_user_update();

alter table public.users enable row level security;

drop policy if exists "Users can view own data" on public.users;
create policy "Users can view own data"
  on public.users
  for select
  using (auth.uid() = id);

drop policy if exists "Users can update own data" on public.users;
create policy "Users can update own data"
  on public.users
  for update
  using (auth.uid() = id);

grant select, update on public.users to authenticated;
