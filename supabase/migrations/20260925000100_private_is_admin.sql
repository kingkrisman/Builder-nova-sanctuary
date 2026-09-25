-- Move is_admin() out of the API-exposed public schema so it can't be called via /rpc.
-- Policies still use it; only the schema changes.

create schema if not exists private;
grant usage on schema private to anon, authenticated;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_users where user_id = (select auth.uid())
  );
$$;

revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to anon, authenticated;

do $$
declare
  t text;
begin
  foreach t in array array['properties', 'projects', 'blog_posts'] loop
    execute format('drop policy "Published rows are public" on public.%I', t);
    execute format('drop policy "Admins can insert" on public.%I', t);
    execute format('drop policy "Admins can update" on public.%I', t);
    execute format('drop policy "Admins can delete" on public.%I', t);

    execute format(
      'create policy "Published rows are public" on public.%I for select to anon, authenticated using (published or (select private.is_admin()))',
      t
    );
    execute format(
      'create policy "Admins can insert" on public.%I for insert to authenticated with check ((select private.is_admin()))',
      t
    );
    execute format(
      'create policy "Admins can update" on public.%I for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()))',
      t
    );
    execute format(
      'create policy "Admins can delete" on public.%I for delete to authenticated using ((select private.is_admin()))',
      t
    );
  end loop;
end;
$$;

drop policy "Admins can upload media" on storage.objects;
drop policy "Admins can update media" on storage.objects;
drop policy "Admins can delete media" on storage.objects;

create policy "Admins can upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and (select private.is_admin()));

create policy "Admins can update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and (select private.is_admin()));

create policy "Admins can delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and (select private.is_admin()));

drop function public.is_admin();
