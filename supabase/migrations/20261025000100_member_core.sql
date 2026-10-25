-- Local member platform foundation. Authorization is never derived from user metadata.
create extension if not exists pgcrypto with schema extensions;

create table public.membership_plans (
  code text primary key check (code in ('FREE', 'STARTER', 'PRO')),
  name text not null,
  description text not null default '',
  is_paid boolean not null default false,
  created_at timestamptz not null default now()
);
insert into public.membership_plans(code, name, description, is_paid) values
 ('FREE', '免費會員', '公開教學與精選資源', false),
 ('STARTER', '入門會員', '方案規格待核定', true),
 ('PRO', '進階會員', '方案規格待核定', true);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '' check (char_length(display_name) <= 100),
  terms_accepted_at timestamptz not null,
  terms_version text not null check (terms_version = 'pending-announcement'),
  marketing_email_opt_in boolean not null default false,
  marketing_email_updated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_code text not null references public.membership_plans(code),
  status text not null check (status in ('active','pending','past_due','cancelled','expired')),
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint subscription_dates_valid check (ends_at is null or starts_at is null or ends_at >= starts_at)
);
create index subscriptions_user_status_idx on public.subscriptions(user_id, status);

create table public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  entitlement_code text not null,
  source_subscription_id uuid references public.subscriptions(id) on delete set null,
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  constraint entitlement_dates_valid check (ends_at is null or ends_at >= starts_at),
  constraint entitlement_user_code_start_unique unique(user_id, entitlement_code, starts_at)
);
create index entitlements_user_active_idx on public.entitlements(user_id, ends_at);

create table public.payment_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subscription_id uuid references public.subscriptions(id) on delete set null,
  provider text not null,
  provider_reference text,
  amount_minor bigint not null check (amount_minor >= 0),
  currency char(3) not null,
  status text not null check (status in ('pending','succeeded','failed','refunded')),
  created_at timestamptz not null default now(),
  unique(provider, provider_reference)
);
create index payment_records_user_created_idx on public.payment_records(user_id, created_at desc);

create table public.audit_events (
  id bigint generated always as identity primary key,
  actor_user_id uuid references auth.users(id) on delete set null,
  subject_user_id uuid references auth.users(id) on delete set null,
  event_type text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index audit_events_subject_created_idx on public.audit_events(subject_user_id, created_at desc);

create function public.create_member_profile()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles(id, display_name, terms_accepted_at, terms_version, marketing_email_opt_in)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name',''),
    coalesce((new.raw_user_meta_data->>'terms_accepted_at')::timestamptz, now()),
    'pending-announcement', coalesce((new.raw_user_meta_data->>'marketing_email_opt_in')::boolean, false));
  insert into public.subscriptions(user_id, plan_code, status, starts_at)
  values (new.id, 'FREE', 'active', now());
  return new;
end;
$$;
revoke all on function public.create_member_profile() from public, anon, authenticated;
create trigger on_auth_user_created_member after insert on auth.users
for each row execute function public.create_member_profile();

alter table public.membership_plans enable row level security;
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.entitlements enable row level security;
alter table public.payment_records enable row level security;
alter table public.audit_events enable row level security;

grant select on public.membership_plans to anon, authenticated;
grant select, insert on public.profiles to authenticated;
grant update(display_name, marketing_email_opt_in, marketing_email_updated_at, updated_at) on public.profiles to authenticated;
grant select on public.subscriptions, public.entitlements, public.payment_records to authenticated;

create policy plans_read on public.membership_plans for select to anon, authenticated using (true);
create policy profile_read_own on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy profile_insert_own on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
create policy profile_update_own on public.profiles for update to authenticated
using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy subscriptions_read_own on public.subscriptions for select to authenticated using ((select auth.uid()) = user_id);
create policy entitlements_read_own on public.entitlements for select to authenticated using ((select auth.uid()) = user_id);
create policy payments_read_own on public.payment_records for select to authenticated using ((select auth.uid()) = user_id);
-- audit_events intentionally has no client policies or grants: default deny.
