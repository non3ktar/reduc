-- 1. Create Tables
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  name text not null,
  avatar text
);

create table public.posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content text,
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  likes uuid[] default '{}'::uuid[],
  comments jsonb default '[]'::jsonb
);

create table public.user_settings (
  user_id uuid references public.profiles(id) on delete cascade not null primary key,
  active_widgets text[] default '{"quem-seguir"}'::text[]
);

create table public.custom_widgets (
  id text primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  url text not null,
  image text
);

-- 2. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.user_settings enable row level security;
alter table public.custom_widgets enable row level security;

-- 3. Create Policies (Permissive for prototyping)
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

create policy "Posts are viewable by everyone." on public.posts for select using (true);
create policy "Authenticated users can create posts." on public.posts for insert with check (auth.role() = 'authenticated');
create policy "Users can update own posts or add likes/comments." on public.posts for update using (auth.role() = 'authenticated');
create policy "Users can delete own posts." on public.posts for delete using (auth.uid() = user_id);

create policy "Settings viewable by owner." on public.user_settings for select using (auth.uid() = user_id);
create policy "Settings insertable by owner." on public.user_settings for insert with check (auth.uid() = user_id);
create policy "Settings updatable by owner." on public.user_settings for update using (auth.uid() = user_id);

create policy "Custom widgets viewable by owner." on public.custom_widgets for select using (auth.uid() = user_id);
create policy "Custom widgets insertable by owner." on public.custom_widgets for insert with check (auth.uid() = user_id);
create policy "Custom widgets updatable by owner." on public.custom_widgets for update using (auth.uid() = user_id);
create policy "Custom widgets deletable by owner." on public.custom_widgets for delete using (auth.uid() = user_id);

-- 4. Enable Realtime on posts
alter publication supabase_realtime add table public.posts;
