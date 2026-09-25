import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { BlogPostRow } from "@/lib/content";
import { Field, FormSection, ImageField, ListInput } from "../fields";
import { FormShell, useEditingId, useRecordForm, useSubmit } from "../FormShell";
import { RichTextEditor } from "../RichTextEditor";
import { slugify } from "../upload";

type Draft = Omit<BlogPostRow, "id" | "updated_at">;

const EMPTY: Draft = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image_url: "",
  category: "News",
  tags: [],
  author: "",
  author_role: "",
  author_image_url: "",
  read_time: 5,
  published: true,
  published_at: new Date().toISOString().slice(0, 10),
};

const CATEGORIES = ["News", "Investment", "Buying Guide", "Design", "Market Trends", "Company"];

/** ~200 words per minute, based on the article's text */
function estimateReadTime(html: string) {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default function BlogForm() {
  const id = useEditingId();
  const { row, save } = useRecordForm<BlogPostRow>("blog_posts", id);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [initial, setInitial] = useState<Draft>(EMPTY);
  // New posts derive the slug from the title until someone edits it by hand
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (!row.data) return;
    const { id: _id, updated_at: _u, ...rest } = row.data;
    const loaded: Draft = {
      ...EMPTY,
      ...rest,
      author_role: rest.author_role ?? "",
      author_image_url: rest.author_image_url ?? "",
    };
    setDraft(loaded);
    setInitial(loaded);
    setSlugTouched(true);
  }, [row.data]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(initial), [draft, initial]);
  const submit = useSubmit(save, id, "/admin/blog", () => setInitial(draft));

  const onSubmit = () => {
    const slug = slugify(draft.slug || draft.title);
    const error =
      draft.title.trim().length < 3
        ? "Give the article a title (at least 3 characters)."
        : !slug
          ? "Add a web address (slug) for the article."
          : draft.content.replace(/<[^>]+>/g, "").trim().length < 20
            ? "The article body is empty."
            : null;
    submit(
      {
        ...draft,
        title: draft.title.trim(),
        slug,
        read_time: estimateReadTime(draft.content),
        author_role: draft.author_role || null,
        author_image_url: draft.author_image_url || null,
      },
      error,
    );
  };

  return (
    <FormShell
      title={id === null ? "New article" : draft.title || "Edit article"}
      backTo="/admin/blog"
      backLabel="All articles"
      published={draft.published}
      onPublishedChange={(v) => set("published", v)}
      saving={save.isPending}
      dirty={dirty}
      loading={id !== null && row.isLoading}
      viewUrl={id !== null && draft.slug ? `/blog/${draft.slug}` : undefined}
      onSubmit={onSubmit}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <FormSection title="Article">
            <Field label="Title">
              <Input
                value={draft.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setDraft((d) => ({ ...d, title, slug: slugTouched ? d.slug : slugify(title) }));
                }}
                className="h-12 text-lg font-semibold"
                placeholder="5 Key Factors That Influence Property Value in Lagos"
              />
            </Field>
            <Field
              label="Web address"
              hint={`${window.location.host}/blog/${draft.slug || "…"}`}
            >
              <Input
                value={draft.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
                }}
              />
            </Field>
            <Field label="Summary" hint="One or two sentences shown on the blog list and in search results.">
              <Textarea rows={3} value={draft.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
            </Field>
          </FormSection>

          <div className="space-y-2">
            <p className="text-sm font-semibold">Body</p>
            <RichTextEditor value={draft.content} onChange={(html) => set("content", html)} />
            <p className="text-xs text-muted-foreground">
              About {estimateReadTime(draft.content)} min read
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <FormSection title="Cover image">
            <ImageField value={draft.image_url} onChange={(v) => set("image_url", v)} folder="blog" />
          </FormSection>

          <FormSection title="Organise">
            <Field label="Category">
              <Input list="blog-categories" value={draft.category} onChange={(e) => set("category", e.target.value)} />
              <datalist id="blog-categories">
                {CATEGORIES.map((c) => <option key={c} value={c} />)}
              </datalist>
            </Field>
            <Field label="Tags">
              <ListInput value={draft.tags} onChange={(v) => set("tags", v)} placeholder="Add a tag" />
            </Field>
            <Field label="Publish date">
              <Input type="date" value={draft.published_at} onChange={(e) => set("published_at", e.target.value)} />
            </Field>
          </FormSection>

          <FormSection title="Author">
            <Field label="Name">
              <Input value={draft.author} onChange={(e) => set("author", e.target.value)} />
            </Field>
            <Field label="Role">
              <Input value={draft.author_role ?? ""} onChange={(e) => set("author_role", e.target.value)} placeholder="MD/CEO" />
            </Field>
            <Field label="Photo">
              <ImageField
                value={draft.author_image_url ?? ""}
                onChange={(v) => set("author_image_url", v)}
                folder="authors"
                aspect="aspect-square max-w-[140px]"
              />
            </Field>
          </FormSection>
        </div>
      </div>
    </FormShell>
  );
}
