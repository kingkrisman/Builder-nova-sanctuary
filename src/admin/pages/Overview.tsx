import { Link } from "react-router-dom";
import { ArrowRight, Building2, FolderKanban, Newspaper, Plus } from "lucide-react";
import type { BlogPostRow, ProjectRow, PropertyRow } from "@/lib/content";
import { useAdminAuth } from "../auth";
import { PageTitle } from "../AdminLayout";
import { useAdminList } from "../data";

export default function Overview() {
  const { session } = useAdminAuth();
  const properties = useAdminList<PropertyRow>("properties");
  const projects = useAdminList<ProjectRow>("projects");
  const posts = useAdminList<BlogPostRow>("blog_posts");

  const cards = [
    {
      label: "Properties",
      icon: Building2,
      to: "/admin/properties",
      rows: properties.data,
      detail: (r: PropertyRow[]) =>
        `${r.filter((p) => p.published && (p.status === "For Sale" || p.status === "For Rent")).length} active listings`,
    },
    {
      label: "Projects",
      icon: FolderKanban,
      to: "/admin/projects",
      rows: projects.data,
      detail: (r: ProjectRow[]) => `${r.filter((p) => p.project_status === "Ongoing").length} ongoing`,
    },
    {
      label: "Blog posts",
      icon: Newspaper,
      to: "/admin/blog",
      rows: posts.data,
      detail: (r: BlogPostRow[]) => `${r.filter((p) => !p.published).length} hidden drafts`,
    },
  ] as const;

  const name = session?.user.email?.split("@")[0];

  return (
    <>
      <PageTitle
        title={`Welcome back${name ? `, ${name}` : ""}`}
        description="Everything you publish here appears on the website straight away."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map(({ label, icon: Icon, to, rows, detail }) => (
          <Link
            key={label}
            to={to}
            className="group rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-950 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <ArrowRight className="h-4 w-4 text-neutral-300 transition group-hover:translate-x-0.5 group-hover:text-black" />
            </div>
            <p className="mt-5 text-3xl font-bold tabular-nums">{rows ? rows.length : "–"}</p>
            <p className="font-medium">{label}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {rows ? (detail as (r: any[]) => string)(rows) : "Loading…"}
            </p>
          </Link>
        ))}
      </div>

      <h2 className="mb-3 mt-10 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Quick actions
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { to: "/admin/properties/new", label: "List a property" },
          { to: "/admin/projects/new", label: "Add a project" },
          { to: "/admin/blog/new", label: "Write an article" },
        ].map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="flex items-center gap-3 rounded-xl border border-dashed bg-white px-4 py-4 text-sm font-semibold transition hover:border-primary hover:bg-primary/5"
          >
            <Plus className="h-4 w-4 text-primary" /> {a.label}
          </Link>
        ))}
      </div>
    </>
  );
}
