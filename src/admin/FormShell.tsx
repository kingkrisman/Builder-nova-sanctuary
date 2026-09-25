import { FormEvent, ReactNode, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ContentTable, useAdminRow, useSaveRow } from "./data";

/** Reads :id from the route; "new" means create. */
export function useEditingId() {
  const { id } = useParams();
  return id && id !== "new" ? Number(id) : null;
}

/**
 * Loads an existing row (or defaults), then renders the form with a sticky save bar.
 * `toValues` turns the form state into the row to save and returns an error string if invalid.
 */
export function useRecordForm<Row>(table: ContentTable, id: number | null) {
  const row = useAdminRow<Row>(table, id);
  const save = useSaveRow<Record<string, unknown>>(table);
  return { row, save };
}

export function FormShell({
  title,
  backTo,
  backLabel,
  published,
  onPublishedChange,
  saving,
  dirty,
  loading,
  viewUrl,
  onSubmit,
  children,
}: {
  title: string;
  backTo: string;
  backLabel: string;
  published: boolean;
  onPublishedChange: (v: boolean) => void;
  saving: boolean;
  dirty: boolean;
  loading?: boolean;
  viewUrl?: string;
  onSubmit: () => void;
  children: ReactNode;
}) {
  // Warn before closing the tab with unsaved edits
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="pb-28">
      <Link
        to={backTo}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-black"
      >
        <ArrowLeft className="h-4 w-4" /> {backLabel}
      </Link>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
        {viewUrl && (
          <Button asChild variant="outline" size="sm">
            <a href={viewUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> View on website
            </a>
          </Button>
        )}
      </div>

      <div className="space-y-6">{children}</div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-white/95 backdrop-blur lg:left-64">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <label className="flex items-center gap-3 text-sm">
            <Switch checked={published} onCheckedChange={onPublishedChange} />
            <span>
              <span className="font-semibold">{published ? "Visible on website" : "Hidden"}</span>
              <span className="hidden text-muted-foreground sm:inline">
                {published ? " · visitors can see this" : " · only admins can see this"}
              </span>
            </span>
          </label>
          <div className="flex items-center gap-2">
            {dirty && <span className="hidden text-xs text-muted-foreground md:inline">Unsaved changes</span>}
            <Button asChild variant="ghost">
              <Link to={backTo}>Cancel</Link>
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="min-w-24 bg-black text-white hover:bg-black/85"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

/** Shared save flow: validate, save, toast, and go back to the list. */
export function useSubmit(
  save: ReturnType<typeof useSaveRow<Record<string, unknown>>>,
  id: number | null,
  backTo: string,
  onSaved?: () => void,
) {
  const navigate = useNavigate();
  return (values: Record<string, unknown>, error?: string | null) => {
    if (error) {
      toast.error(error);
      return;
    }
    save.mutate(
      { id, values },
      {
        onSuccess: () => {
          onSaved?.();
          toast.success(id === null ? "Created and saved" : "Changes saved");
          navigate(backTo);
        },
      },
    );
  };
}
