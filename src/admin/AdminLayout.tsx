import { ReactNode, useState } from "react";
import { Link, NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import {
  Building2,
  ExternalLink,
  KeyRound,
  FolderKanban,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  Newspaper,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cmsEnabled } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "./auth";

const LOGO =
  "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2Fd46d2519b50946f6a7f0041e10e1e078?width=240";

const nav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/properties", label: "Properties", icon: Building2 },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/blog", label: "Blog posts", icon: Newspaper },
];

/** Protects every /admin page: must be signed in *and* listed as an admin. */
export function AdminGuard() {
  const { session, isAdmin, loading, signOut } = useAdminAuth();
  const location = useLocation();

  if (!cmsEnabled) return <NotConfigured />;
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }
  if (!session) return <Navigate to="/admin/login" state={{ from: location }} replace />;
  if (!isAdmin) {
    return (
      <CenteredCard title="No admin access">
        <p className="text-sm text-muted-foreground">
          You're signed in as <strong>{session.user.email}</strong>, but this account
          isn't on the website's admin list. Ask the site owner to add you.
        </p>
        <Button className="mt-6 w-full" variant="outline" onClick={signOut}>
          Sign out
        </Button>
      </CenteredCard>
    );
  }
  return <AdminLayout />;
}

function AdminLayout() {
  const { session, signOut } = useAdminAuth();
  const [open, setOpen] = useState(false);

  const sidebar = (
    <div className="flex h-full flex-col">
      <Link to="/admin" className="flex items-center gap-3 px-5 py-5">
        <img src={LOGO} alt="Da'sayonce" className="h-10 w-auto" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
          Admin
        </span>
      </Link>
      <nav className="flex-1 space-y-1 px-3">
        {nav.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-black"
                  : "text-white/70 hover:bg-white/10 hover:text-white",
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="space-y-1 border-t border-white/10 p-3">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/10 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" /> View website
        </a>
        <Link
          to="/admin/reset-password"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/10 hover:text-white"
        >
          <KeyRound className="h-4 w-4" /> Change password
        </Link>
        <button
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
        <p className="truncate px-3 pt-2 text-xs text-white/40">{session?.user.email}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-neutral-950 lg:block">
        {sidebar}
      </aside>

      {/* Mobile top bar + drawer */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-neutral-950 px-4 lg:hidden">
        <img src={LOGO} alt="Da'sayonce" className="h-8 w-auto" />
        <button
          onClick={() => setOpen(true)}
          className="rounded-md p-2 text-white"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-neutral-950">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-4 rounded-md p-2 text-white/70"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <main className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function PageTitle({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function CenteredCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 font-sans">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <img src={LOGO} alt="Da'sayonce" className="mb-6 h-12 w-auto rounded bg-black p-1.5" />
        <h1 className="mb-2 text-xl font-bold">{title}</h1>
        {children}
      </div>
    </div>
  );
}

function NotConfigured() {
  return (
    <CenteredCard title="Content dashboard not connected">
      <p className="text-sm text-muted-foreground">
        The dashboard needs the website's Supabase project. Add{" "}
        <code className="rounded bg-neutral-100 px-1">VITE_SUPABASE_URL</code> and{" "}
        <code className="rounded bg-neutral-100 px-1">VITE_SUPABASE_ANON_KEY</code> to the
        environment (see <code className="rounded bg-neutral-100 px-1">docs/CMS.md</code>), then
        reload.
      </p>
      <Button asChild className="mt-6 w-full">
        <Link to="/">Back to website</Link>
      </Button>
    </CenteredCard>
  );
}
