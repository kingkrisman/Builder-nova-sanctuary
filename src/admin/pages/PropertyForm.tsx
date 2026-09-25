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
import type { PropertyRow } from "@/lib/content";
import { Field, FormSection, GalleryField, ListInput } from "../fields";
import { FormShell, useEditingId, useRecordForm, useSubmit } from "../FormShell";

type Draft = Omit<PropertyRow, "id" | "updated_at" | "image_url">;

const EMPTY: Draft = {
  title: "",
  type: "Residential",
  status: "For Sale",
  price: 0,
  location: "",
  address: "",
  bedrooms: null,
  bathrooms: null,
  size: "",
  description: "",
  features: [],
  images: [],
  year_built: null,
  parking: null,
  furnished: null,
  agent_name: "",
  agent_phone: "",
  agent_email: "",
  featured: false,
  published: true,
  date_added: new Date().toISOString().slice(0, 10),
};

const FEATURE_SUGGESTIONS = [
  "24/7 Security",
  "Power Backup",
  "Swimming Pool",
  "Fitted Kitchen",
  "BQ Apartment",
  "Air Conditioning",
  "Gym",
  "Covered Parking",
  "Garden/Landscaping",
  "Smart Home Features",
  "Borehole",
  "Gated Estate",
  "C of O",
  "Governor's Consent",
];

const num = (v: string) => (v.trim() === "" ? null : Number(v));

export default function PropertyForm() {
  const id = useEditingId();
  const { row, save } = useRecordForm<PropertyRow>("properties", id);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [initial, setInitial] = useState<Draft>(EMPTY);

  useEffect(() => {
    if (!row.data) return;
    const { id: _id, updated_at: _u, image_url, ...rest } = row.data;
    const loaded: Draft = {
      ...EMPTY,
      ...rest,
      images: rest.images?.length ? rest.images : image_url ? [image_url] : [],
    };
    setDraft(loaded);
    setInitial(loaded);
  }, [row.data]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(initial), [draft, initial]);
  const submit = useSubmit(save, id, "/admin/properties", () => setInitial(draft));

  const onSubmit = () => {
    const error =
      draft.title.trim().length < 3
        ? "Give the property a title (at least 3 characters)."
        : !draft.location.trim()
          ? "Add the location (e.g. Lekki Phase 1, Lagos)."
          : !(draft.price >= 0)
            ? "Enter a valid price."
            : null;
    submit({ ...draft, title: draft.title.trim(), image_url: draft.images[0] ?? "" }, error);
  };

  return (
    <FormShell
      title={id === null ? "New property" : draft.title || "Edit property"}
      backTo="/admin/properties"
      backLabel="All properties"
      published={draft.published}
      onPublishedChange={(v) => set("published", v)}
      saving={save.isPending}
      dirty={dirty}
      loading={id !== null && row.isLoading}
      viewUrl={id !== null ? `/properties/${id}` : undefined}
      onSubmit={onSubmit}
    >
      <FormSection title="Photos" description="Add at least one. Drag to reorder with the arrows; the first is the cover shown on listings.">
        <GalleryField value={draft.images} onChange={(v) => set("images", v)} folder="properties" />
      </FormSection>

      <FormSection title="Basics">
        <Field label="Title" htmlFor="title">
          <Input
            id="title"
            value={draft.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Luxury 4-Bedroom Duplex in Lekki Phase 1"
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Type">
            <Select value={draft.type} onValueChange={(v) => set("type", v as Draft["type"])}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Residential", "Commercial", "Land", "Mixed-Use"].map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Status">
            <Select value={draft.status} onValueChange={(v) => set("status", v as Draft["status"])}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["For Sale", "For Rent", "Sold", "Rented"].map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field
            label={draft.status === "For Rent" ? "Price per year (₦)" : "Price (₦)"}
            hint={draft.price ? `₦${Number(draft.price).toLocaleString()}` : undefined}
          >
            <Input
              inputMode="numeric"
              value={draft.price ? String(draft.price) : ""}
              onChange={(e) => set("price", Number(e.target.value.replace(/[^\d]/g, "")) || 0)}
              placeholder="150000000"
            />
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Area / city" hint="Shown on cards and used for the location filter.">
            <Input value={draft.location} onChange={(e) => set("location", e.target.value)} placeholder="Lekki Phase 1, Lagos" />
          </Field>
          <Field label="Full address">
            <Input value={draft.address} onChange={(e) => set("address", e.target.value)} placeholder="12 Admiralty Way, Lekki Phase 1, Lagos" />
          </Field>
        </div>
        <Field label="Description">
          <Textarea
            rows={6}
            value={draft.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="What makes this property special?"
          />
        </Field>
      </FormSection>

      <FormSection title="Details" description="Leave anything that doesn't apply empty (for example, bedrooms on land).">
        <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-6">
          <Field label="Bedrooms">
            <Input inputMode="numeric" value={draft.bedrooms ?? ""} onChange={(e) => set("bedrooms", num(e.target.value))} />
          </Field>
          <Field label="Bathrooms">
            <Input inputMode="numeric" value={draft.bathrooms ?? ""} onChange={(e) => set("bathrooms", num(e.target.value))} />
          </Field>
          <Field label="Parking">
            <Input inputMode="numeric" value={draft.parking ?? ""} onChange={(e) => set("parking", num(e.target.value))} />
          </Field>
          <Field label="Size">
            <Input value={draft.size} onChange={(e) => set("size", e.target.value)} placeholder="450 sqm" />
          </Field>
          <Field label="Year built">
            <Input inputMode="numeric" value={draft.year_built ?? ""} onChange={(e) => set("year_built", num(e.target.value))} />
          </Field>
          <Field label="Furnished">
            <Select
              value={draft.furnished === null ? "unset" : draft.furnished ? "yes" : "no"}
              onValueChange={(v) => set("furnished", v === "unset" ? null : v === "yes")}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="unset">Not stated</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field label="Features & amenities" hint="Type and press Enter, or tap a suggestion.">
          <ListInput
            value={draft.features}
            onChange={(v) => set("features", v)}
            placeholder="e.g. Swimming Pool"
            suggestions={FEATURE_SUGGESTIONS}
          />
        </Field>
      </FormSection>

      <FormSection title="Agent" description="Who buyers should contact about this property.">
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Name">
            <Input value={draft.agent_name} onChange={(e) => set("agent_name", e.target.value)} />
          </Field>
          <Field label="Phone">
            <Input type="tel" value={draft.agent_phone} onChange={(e) => set("agent_phone", e.target.value)} placeholder="+234…" />
          </Field>
          <Field label="Email">
            <Input type="email" value={draft.agent_email} onChange={(e) => set("agent_email", e.target.value)} />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Display">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex items-start gap-3">
            <Switch checked={draft.featured} onCheckedChange={(v) => set("featured", v)} />
            <span>
              <span className="block text-sm font-semibold">Featured</span>
              <span className="text-xs text-muted-foreground">Shown first on the home page and listings.</span>
            </span>
          </label>
          <Field label="Date listed">
            <Input type="date" value={draft.date_added} onChange={(e) => set("date_added", e.target.value)} />
          </Field>
        </div>
      </FormSection>
    </FormShell>
  );
}
