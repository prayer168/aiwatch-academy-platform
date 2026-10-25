begin;
create extension if not exists pgtap with schema extensions;
select plan(10);

insert into auth.users(id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
values
 ('10000000-0000-0000-0000-000000000001','authenticated','authenticated','rls-a@example.test','',now(),'{}','{"terms_accepted_at":"2026-10-25T00:00:00Z"}',now(),now()),
 ('10000000-0000-0000-0000-000000000002','authenticated','authenticated','rls-b@example.test','',now(),'{}','{"terms_accepted_at":"2026-10-25T00:00:00Z"}',now(),now())
on conflict (id) do nothing;

set local role anon;
select is((select count(*)::int from public.profiles), 0, 'anon cannot read member profiles');
select is((select count(*)::int from public.subscriptions), 0, 'anon cannot read subscriptions');
reset role;

set local role authenticated;
select set_config('request.jwt.claim.sub','10000000-0000-0000-0000-000000000001',true);
select is((select count(*)::int from public.profiles), 1, 'member reads own profile only');
select is((select count(*)::int from public.subscriptions), 1, 'member reads own FREE subscription');
select is((select count(*)::int from public.profiles where id='10000000-0000-0000-0000-000000000002'), 0, 'member cannot read another profile');
select throws_ok($$update public.profiles set terms_accepted_at=now() where id='10000000-0000-0000-0000-000000000001'$$, '42501', null, 'terms acceptance timestamp is immutable to member');
select throws_ok($$update public.subscriptions set plan_code='PRO' where user_id='10000000-0000-0000-0000-000000000001'$$, '42501', null, 'member cannot update plan');
select throws_ok($$insert into public.entitlements(user_id, entitlement_code) values ('10000000-0000-0000-0000-000000000001','pro_content')$$, '42501', null, 'member cannot grant own entitlement');
select throws_ok($$insert into public.payment_records(user_id,provider,amount_minor,currency,status) values ('10000000-0000-0000-0000-000000000001','fake',1,'TWD','succeeded')$$, '42501', null, 'member cannot forge payment');
select throws_ok($$select * from public.audit_events$$, '42501', null, 'member cannot read audit log');
select * from finish();
rollback;
