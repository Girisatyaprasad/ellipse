create extension if not exists pgcrypto;

create table if not exists workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists workspace_members (
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'member')),
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  title text not null,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  conversation_id uuid not null references conversations(id) on delete cascade,
  author_name text not null,
  body text not null,
  created_by uuid references auth.users(id) on delete set null,
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table workspaces enable row level security;
alter table workspace_members enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;

drop policy if exists "workspace_select_member" on workspaces;
create policy "workspace_select_member"
on workspaces for select
using (
  exists (
    select 1 from workspace_members
    where workspace_members.workspace_id = workspaces.id
    and workspace_members.user_id = auth.uid()
  )
);

drop policy if exists "workspace_insert_creator" on workspaces;
create policy "workspace_insert_creator"
on workspaces for insert
with check (created_by = auth.uid());

drop policy if exists "workspace_update_owner" on workspaces;
create policy "workspace_update_owner"
on workspaces for update
using (
  exists (
    select 1 from workspace_members
    where workspace_members.workspace_id = workspaces.id
    and workspace_members.user_id = auth.uid()
    and workspace_members.role = 'owner'
  )
);

drop policy if exists "member_select_self_workspace" on workspace_members;
create policy "member_select_self_workspace"
on workspace_members for select
using (
  user_id = auth.uid()
  or exists (
    select 1 from workspace_members owner_members
    where owner_members.workspace_id = workspace_members.workspace_id
    and owner_members.user_id = auth.uid()
    and owner_members.role = 'owner'
  )
);

drop policy if exists "member_insert_owner_self" on workspace_members;
create policy "member_insert_owner_self"
on workspace_members for insert
with check (user_id = auth.uid() and role = 'owner');

drop policy if exists "conversation_select_member" on conversations;
create policy "conversation_select_member"
on conversations for select
using (
  exists (
    select 1 from workspace_members
    where workspace_members.workspace_id = conversations.workspace_id
    and workspace_members.user_id = auth.uid()
  )
);

drop policy if exists "conversation_insert_member" on conversations;
create policy "conversation_insert_member"
on conversations for insert
with check (
  created_by = auth.uid()
  and exists (
    select 1 from workspace_members
    where workspace_members.workspace_id = conversations.workspace_id
    and workspace_members.user_id = auth.uid()
  )
);

drop policy if exists "message_select_member" on messages;
create policy "message_select_member"
on messages for select
using (
  exists (
    select 1 from workspace_members
    where workspace_members.workspace_id = messages.workspace_id
    and workspace_members.user_id = auth.uid()
  )
);

drop policy if exists "message_insert_member" on messages;
create policy "message_insert_member"
on messages for insert
with check (
  created_by = auth.uid()
  and exists (
    select 1 from workspace_members
    where workspace_members.workspace_id = messages.workspace_id
    and workspace_members.user_id = auth.uid()
  )
);

create index if not exists workspace_members_user_idx on workspace_members(user_id);
create index if not exists conversations_workspace_idx on conversations(workspace_id, created_at desc);
create index if not exists messages_conversation_idx on messages(conversation_id, occurred_at asc);
