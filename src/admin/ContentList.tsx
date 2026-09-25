import { resizeImage } from "@/lib/image";
import { ReactNode, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImageOff, Loader2, Pencil, Plus, Search, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { PageTitle } from "./AdminLayout";
import {
  ContentTable,
  useAdminList,
  useDeleteRow,
  useSetPublished,
} from "./data";

interface BaseRow {
  id: number;
  title: string;
  published: boolean;
  image_url?: string;
}

interface ContentListProps<T extends BaseRow> {
  table: ContentTable;
  title: string;
  description: string;
  singular: string;
  basePath: string;
  thumbnail: (row: T) => string | undefined;
  meta: (row: T) => ReactNode;
  searchText: (row: T) => string;
}

export function ContentList<T extends BaseRow>({
  table,
  title,
  description,
  singular,
  basePath,
  thumbnail,
  meta,
  searchText,
}: ContentListProps<T>) {
  const navigate = useNavigate();
  const { data, isLoading, error } = useAdminList<T>(table);
  const setPublished = useSetPublished(table);
  const remove = useDeleteRow(table);
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState<T | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (data ?? []).filter((r) => !q || searchText(r).toLowerCase().includes(q));
  }, [data, query, searchText]);

  return (
    <>
      <PageTitle
        title={title}
        description={description}
        actions={
          <Button asChild className="bg-primary text-black hover:bg-primary/90">
            <Link to={`${basePath}/new`}>
              <Plus className="mr-1.5 h-4 w-4" /> Add {singular}
            </Link>
          </Button>
        }
      />

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${title.toLowerCase()}…`}
          className="bg-white pl-9"
        />
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : error ? (
          <p className="p-6 text-sm text-destructive">{(error as Error).message}</p>
        ) : rows.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-semibold">
              {query ? "Nothing matches your search." : `No ${title.toLowerCase()} yet.`}
            </p>
            {!query && (
              <Button asChild variant="outline" className="mt-4">
                <Link to={`${basePath}/new`}>Add your first {singular}</Link>
              </Button>
            )}
          </div>
        ) : (
          <ul className="divide-y">
            {rows.map((row) => {
              const thumb = thumbnail(row);
              return (
                <li
                  key={row.id}
                  className="flex cursor-pointer items-center gap-4 px-4 py-3 transition-colors hover:bg-neutral-50"
                  onClick={() => navigate(`${basePath}/${row.id}`)}
                >
                  <div className="h-14 w-20 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                    {thumb ? (
                      <img src={resizeImage(thumb, 240)} alt="" className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-neutral-300">
                        <ImageOff className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{row.title}</p>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      {meta(row)}
                    </div>
                  </div>
                  <label
                    className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Switch
                      checked={row.published}
                      onCheckedChange={(published) =>
                        setPublished.mutate({ id: row.id, published })
                      }
                    />
                    {row.published ? "Live" : "Hidden"}
                  </label>
                  <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                    <Button asChild size="icon" variant="ghost" title="Edit">
                      <Link to={`${basePath}/${row.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      title="Delete"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => setPendingDelete(row)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <AlertDialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete “{pendingDelete?.title}”?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes it from the website permanently. To take it down temporarily,
              switch it to Hidden instead.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={() => pendingDelete && remove.mutate(pendingDelete.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
