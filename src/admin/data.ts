import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export type ContentTable = "properties" | "projects" | "blog_posts";

const ORDER: Record<ContentTable, string> = {
  properties: "date_added",
  projects: "sort_order",
  blog_posts: "published_at",
};

export function useAdminList<T>(table: ContentTable) {
  return useQuery({
    queryKey: ["admin", table],
    queryFn: async () => {
      const { data, error } = await supabase!
        .from(table)
        .select("*")
        .order(ORDER[table], { ascending: table === "projects" })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as T[];
    },
  });
}

export function useAdminRow<T>(table: ContentTable, id: number | null) {
  return useQuery({
    queryKey: ["admin", table, id],
    enabled: id !== null,
    queryFn: async () => {
      const { data, error } = await supabase!.from(table).select("*").eq("id", id!).single();
      if (error) throw error;
      return data as T;
    },
  });
}

function useInvalidate(table: ContentTable) {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: ["admin", table] });
    // Refresh what visitors see on the public pages too
    qc.invalidateQueries({ queryKey: ["content", table] });
  };
}

/** Insert when there's no id, update otherwise. Resolves to the saved row's id. */
export function useSaveRow<T extends Record<string, unknown>>(table: ContentTable) {
  const invalidate = useInvalidate(table);
  return useMutation({
    mutationFn: async ({ id, values }: { id: number | null; values: T }) => {
      const query =
        id === null
          ? supabase!.from(table).insert(values as never).select("id").single()
          : supabase!.from(table).update(values as never).eq("id", id).select("id").single();
      const { data, error } = await query;
      if (error) throw error;
      return (data as { id: number }).id;
    },
    onSuccess: invalidate,
    onError: (e: Error) => toast.error(friendlyError(e)),
  });
}

export function useDeleteRow(table: ContentTable) {
  const invalidate = useInvalidate(table);
  return useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase!.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      invalidate();
      toast.success("Deleted");
    },
    onError: (e: Error) => toast.error(friendlyError(e)),
  });
}

export function useSetPublished(table: ContentTable) {
  const invalidate = useInvalidate(table);
  return useMutation({
    mutationFn: async ({ id, published }: { id: number; published: boolean }) => {
      const { error } = await supabase!.from(table).update({ published }).eq("id", id);
      if (error) throw error;
      return published;
    },
    onSuccess: (published) => {
      invalidate();
      toast.success(published ? "Now visible on the website" : "Hidden from the website");
    },
    onError: (e: Error) => toast.error(friendlyError(e)),
  });
}

function friendlyError(e: Error & { code?: string }) {
  if (e.code === "23505") return "Something with that web address (slug) already exists.";
  if (e.code === "23514") return "One of the values isn't allowed. Check the highlighted fields.";
  if (e.code === "42501") return "Your account doesn't have permission to do that.";
  return e.message;
}
