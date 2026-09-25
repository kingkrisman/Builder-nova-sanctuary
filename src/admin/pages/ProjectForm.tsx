import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProjectRow } from "@/lib/content";
import { Field, FormSection, GalleryField, ListInput } from "../fields";
import { FormShell, useEditingId, useRecordForm, useSubmit } from "../FormShell";

type Draft = Omit<ProjectRow, "id" | "updated_at" | "image_url">;

const EMPTY: Draft = {
  title: "",
  description: "",
  location: "",
  category: "Residential",
  project_status: "Completed",
  gallery: [],
  completion_year: null,
  size: "",
  features: [],
  featured: false,
  published: true,
  sort_order: 0,
};

export default function ProjectForm() {
  const id = useEditingId();
  const { row, save } = useRecordForm<ProjectRow>("projects", id);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [initial, setInitial] = useState<Draft>(EMPTY);

  useEffect(() => {
    if (!row.data) return;
    const { id: _id, updated_at: _u, image_url, ...rest } = row.data;
    const loaded: Draft = {
      ...EMPTY,
      ...rest,
      gallery: rest.gallery?.length ? rest.gallery : image_url ? [image_url] : [],
    };
    setDraft(loaded);
    setInitial(loaded);
  }, [row.data]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(initial), [draft, initial]);
  const submit = useSubmit(save, id, "/admin/projects", () => setInitial(draft));

  const onSubmit = () => {
    const error =
      draft.title.trim().length < 3 ? "Give the project a name (at least 3 characters)." : null;
    submit({ ...draft, title: draft.title.trim(), image_url: draft.gallery[0] ?? "" }, error);
  };

  return (
    <FormShell
      title={id === null ? "New project" : draft.title || "Edit project"}
      backTo="/admin/projects"
      backLabel="All projects"
      published={draft.published}
      onPublishedChange={(v) => set("published", v)}
      saving={save.isPending}
      dirty={dirty}
      loading={id !== null && row.isLoading}
      viewUrl={id !== null ? "/projects" : undefined}
      onSubmit={onSubmit}
    >
      <FormSection title="Photos" description="The first photo is the cover. Add more to build the project gallery.">
        <GalleryField value={draft.gallery} onChange={(v) => set("gallery", v)} folder="projects" />
      </FormSection>

      <FormSection title="About the project">
        <Field label="Project name">
          <Input value={draft.title} onChange={(e) => set("title", e.target.value)} placeholder="Da'sayonce Mini-Estate" />
        </Field>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Category" hint="Used for the filter tabs on the Projects page.">
            <Select value={draft.category} onValueChange={(v) => set("category", v as Draft["category"])}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Residential", "Commercial", "Mixed-Use", "Renovation"].map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Stage">
            <Select value={draft.project_status} onValueChange={(v) => set("project_status", v as Draft["project_status"])}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Completed", "Ongoing", "Upcoming"].map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Location">
            <Input value={draft.location} onChange={(e) => set("location", e.target.value)} placeholder="Mowe, Ogun State" />
          </Field>
        </div>
        <Field label="Description">
          <Textarea rows={5} value={draft.description} onChange={(e) => set("description", e.target.value)} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Size" hint="e.g. 20 Units, 3,500 sqm">
            <Input value={draft.size} onChange={(e) => set("size", e.target.value)} />
          </Field>
          <Field label="Completion year">
            <Input
              inputMode="numeric"
              value={draft.completion_year ?? ""}
              onChange={(e) => set("completion_year", e.target.value ? Number(e.target.value) : null)}
            />
          </Field>
        </div>
        <Field label="Key features">
          <ListInput value={draft.features} onChange={(v) => set("features", v)} placeholder="e.g. 24/7 Security" />
        </Field>
      </FormSection>

      <FormSection title="Display">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex items-start gap-3">
            <Switch checked={draft.featured} onCheckedChange={(v) => set("featured", v)} />
            <span>
              <span className="block text-sm font-semibold">Featured project</span>
              <span className="text-xs text-muted-foreground">Gets the large spotlight section on the Projects page.</span>
            </span>
          </label>
          <Field label="Order" hint="Lower numbers appear first.">
            <Input inputMode="numeric" value={draft.sort_order} onChange={(e) => set("sort_order", Number(e.target.value) || 0)} />
          </Field>
        </div>
      </FormSection>
    </FormShell>
  );
}
