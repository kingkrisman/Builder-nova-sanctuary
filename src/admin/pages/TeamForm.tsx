import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TEAM_DEPARTMENTS, type TeamMemberRow } from "@/lib/content";
import { Field, FormSection, ImageField } from "../fields";
import { FormShell, useEditingId, useRecordForm, useSubmit } from "../FormShell";

type Draft = Omit<TeamMemberRow, "id" | "updated_at">;

const EMPTY: Draft = {
  name: "",
  position: "",
  qualifications: "",
  department: "Executive Management",
  image_url: "",
  sort_order: 0,
  published: true,
};

export default function TeamForm() {
  const id = useEditingId();
  const { row, save } = useRecordForm<TeamMemberRow>("team_members", id);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [initial, setInitial] = useState<Draft>(EMPTY);

  useEffect(() => {
    if (!row.data) return;
    const { id: _id, updated_at: _u, ...rest } = row.data;
    const loaded = { ...EMPTY, ...rest };
    setDraft(loaded);
    setInitial(loaded);
  }, [row.data]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(initial), [draft, initial]);
  const submit = useSubmit(save, id, "/admin/team", () => setInitial(draft));

  const onSubmit = () => {
    const error = draft.name.trim().length < 2 ? "Enter the person's name." : null;
    submit({ ...draft, name: draft.name.trim(), position: draft.position.trim() }, error);
  };

  return (
    <FormShell
      title={id === null ? "New team member" : draft.name || "Edit team member"}
      backTo="/admin/team"
      backLabel="All team members"
      published={draft.published}
      onPublishedChange={(v) => set("published", v)}
      saving={save.isPending}
      dirty={dirty}
      loading={id !== null && row.isLoading}
      viewUrl={id !== null ? "/team" : undefined}
      onSubmit={onSubmit}
    >
      <div className="grid gap-6 md:grid-cols-[260px_1fr]">
        <FormSection title="Photo" description="A clear head-and-shoulders photo works best.">
          <ImageField
            value={draft.image_url}
            onChange={(v) => set("image_url", v)}
            folder="team"
            aspect="aspect-[4/5]"
          />
        </FormSection>

        <FormSection title="Details">
          <Field label="Full name">
            <Input
              value={draft.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Engr. Olusayo Taiwo Okusanya"
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Position">
              <Input
                value={draft.position}
                onChange={(e) => set("position", e.target.value)}
                placeholder="Project Manager"
              />
            </Field>
            <Field label="Qualifications" hint="Optional, e.g. MNSE, COREN">
              <Input
                value={draft.qualifications}
                onChange={(e) => set("qualifications", e.target.value)}
              />
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Department" hint="Decides which tab they appear under on the Team page.">
              <Select
                value={draft.department}
                onValueChange={(v) => set("department", v as Draft["department"])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TEAM_DEPARTMENTS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Order" hint="Lower numbers appear first within the department.">
              <Input
                inputMode="numeric"
                value={draft.sort_order}
                onChange={(e) => set("sort_order", Number(e.target.value) || 0)}
              />
            </Field>
          </div>
        </FormSection>
      </div>
    </FormShell>
  );
}
