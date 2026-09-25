-- Storage needs SELECT on the object row before it will update or delete it.
-- The bucket is public for reading files by URL; this only lets admins list/manage objects.
create policy "Admins can read media objects"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'media' and (select private.is_admin()));
