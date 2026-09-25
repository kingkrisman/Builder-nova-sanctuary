import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipProps,
} from "recharts";
import { ArrowDownRight, ArrowUpRight, Loader2, Minus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { PageTitle } from "../AdminLayout";

// Chart accent: a deeper step of the brand gold. The bright brand gold (#FFAE00) fails
// the lightness and 3:1 contrast checks on a white surface; this step passes both.
const ACCENT = "#B87B00";
const GRID = "#ececea";

interface Summary {
  totals: {
    pageviews: number;
    visits: number;
    contacts: number;
    prev_pageviews: number;
    prev_visits: number;
    prev_contacts: number;
    live: number;
  };
  daily: { day: string; visits: number; pageviews: number }[];
  top_pages: { path: string; views: number }[];
  top_properties: { id: number; title: string; views: number }[];
  sources: { source: string; visits: number }[];
  devices: { device: string; visits: number }[];
  locations: { timezone: string; visits: number }[];
  actions: { name: string; count: number }[];
}

const RANGES = [
  { days: 7, label: "7 days" },
  { days: 30, label: "30 days" },
  { days: 90, label: "90 days" },
];

const ACTION_LABELS: Record<string, string> = {
  call_click: "Phone taps",
  email_click: "Email taps",
  whatsapp_click: "WhatsApp taps",
  share: "Property shares",
  contact_submit: "Contact form sends",
};

const PAGE_LABELS: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/services": "Services",
  "/projects": "Projects",
  "/properties": "Properties",
  "/team": "Team",
  "/blog": "Blog",
  "/contact": "Contact",
};

const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
const whole = new Intl.NumberFormat("en");

const pageLabel = (path: string, propertyTitles: Map<string, string>) => {
  if (PAGE_LABELS[path]) return PAGE_LABELS[path];
  if (path.startsWith("/blog/")) return `Blog: ${path.slice(6).replace(/-/g, " ")}`;
  const property = path.match(/^\/properties\/(\d+)$/);
  if (property) return propertyTitles.get(property[1]) ?? `Property #${property[1]}`;
  return path;
};

// "Africa/Lagos" -> "Lagos"; "America/New_York" -> "New York"
const placeLabel = (tz: string) => (tz === "Unknown" ? tz : tz.split("/").pop()!.replace(/_/g, " "));

const dayLabel = (iso: string, long = false) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    ...(long ? { weekday: "short" } : {}),
  });

export default function Analytics() {
  const [days, setDays] = useState(30);
  const [showTable, setShowTable] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "analytics", days],
    refetchInterval: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase!.rpc("analytics_summary", { days });
      if (error) throw error;
      return data as Summary;
    },
  });

  const t = data?.totals;
  const pagesPerVisit = t && t.visits ? t.pageviews / t.visits : 0;
  const empty = !isLoading && !!t && t.pageviews === 0;

  return (
    <>
      <PageTitle
        title="Analytics"
        description="Anonymous visits to the public website. No cookies or personal data are collected."
        actions={
          <div role="tablist" aria-label="Date range" className="flex rounded-full border bg-white p-1">
            {RANGES.map((r) => (
              <button
                key={r.days}
                role="tab"
                aria-selected={days === r.days}
                onClick={() => setDays(r.days)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  days === r.days ? "bg-neutral-900 text-white" : "text-neutral-600 hover:text-black",
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
        }
      />

      {isLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : error ? (
        <p className="rounded-xl border bg-white p-6 text-sm text-destructive">
          {(error as Error).message}
        </p>
      ) : (
        t && (
          <div className="space-y-6">
            {/* KPI row */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatTile label="Visits" value={t.visits} previous={t.prev_visits} days={days} />
              <StatTile label="Page views" value={t.pageviews} previous={t.prev_pageviews} days={days} />
              <StatTile
                label="Contact actions"
                value={t.contacts}
                previous={t.prev_contacts}
                days={days}
                hint="Calls, emails, WhatsApp, shares & form sends"
              />
              <div className="rounded-xl border bg-white p-5 shadow-sm">
                <p className="text-sm text-neutral-500">On the site right now</p>
                <p className="mt-2 flex items-center gap-3 text-3xl font-semibold">
                  {t.live}
                  <span className="relative flex h-2.5 w-2.5">
                    {t.live > 0 && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                    )}
                    <span
                      className={cn(
                        "relative inline-flex h-2.5 w-2.5 rounded-full",
                        t.live > 0 ? "bg-emerald-500" : "bg-neutral-300",
                      )}
                    />
                  </span>
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  Active in the last 5 minutes · {pagesPerVisit.toFixed(1)} pages per visit
                </p>
              </div>
            </div>

            {empty && (
              <div className="rounded-xl border border-dashed bg-white p-6 text-sm text-neutral-600">
                No visits recorded in this period yet. Data starts appearing once the live site gets
                traffic (visits from your own computer while testing locally aren't counted).
              </div>
            )}

            {/* Visits over time */}
            <section className="rounded-xl border bg-white p-5 shadow-sm md:p-6">
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <div>
                  <h2 className="font-semibold">Visits per day</h2>
                  <p className="text-sm text-neutral-500">Last {days} days, Lagos time</p>
                </div>
                <button
                  onClick={() => setShowTable((s) => !s)}
                  className="text-sm font-medium text-neutral-500 underline-offset-4 hover:text-black hover:underline"
                >
                  {showTable ? "Show chart" : "View as table"}
                </button>
              </div>
              {showTable ? (
                <div className="max-h-80 overflow-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-white text-left text-neutral-500">
                      <tr>
                        <th className="py-2 font-medium">Day</th>
                        <th className="py-2 text-right font-medium">Visits</th>
                        <th className="py-2 text-right font-medium">Page views</th>
                      </tr>
                    </thead>
                    <tbody className="tabular-nums">
                      {[...data.daily].reverse().map((d) => (
                        <tr key={d.day} className="border-t">
                          <td className="py-2">{dayLabel(d.day, true)}</td>
                          <td className="py-2 text-right">{whole.format(d.visits)}</td>
                          <td className="py-2 text-right">{whole.format(d.pageviews)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <VisitsChart daily={data.daily} />
              )}
            </section>

            <div className="grid gap-6 lg:grid-cols-2">
              <BarList
                title="Top pages"
                caption="Page views"
                rows={data.top_pages.map((r) => ({
                  label: pageLabel(r.path, new Map(data.top_properties.map((p) => [String(p.id), p.title]))),
                  value: r.views,
                }))}
              />
              <BarList
                title="Most viewed properties"
                caption="Page views"
                rows={data.top_properties.map((r) => ({ label: r.title, value: r.views }))}
                emptyText="No property pages viewed yet."
              />
              <BarList
                title="Where visitors come from"
                caption="Visits"
                rows={data.sources.map((r) => ({ label: r.source, value: r.visits }))}
              />
              <BarList
                title="Contact actions"
                caption="Count"
                rows={data.actions.map((r) => ({ label: ACTION_LABELS[r.name] ?? r.name, value: r.count }))}
                emptyText="No calls, emails or messages yet."
              />
              <BarList
                title="Devices"
                caption="Visits"
                rows={data.devices.map((r) => ({
                  label: r.device.charAt(0).toUpperCase() + r.device.slice(1),
                  value: r.visits,
                }))}
              />
              <BarList
                title="Locations"
                caption="Visits, by time zone"
                rows={data.locations.map((r) => ({ label: placeLabel(r.timezone), value: r.visits }))}
              />
            </div>
          </div>
        )
      )}
    </>
  );
}

function StatTile({
  label,
  value,
  previous,
  days,
  hint,
}: {
  label: string;
  value: number;
  previous: number;
  days: number;
  hint?: string;
}) {
  const change = previous > 0 ? (value - previous) / previous : null;
  const up = change !== null && change > 0.005;
  const down = change !== null && change < -0.005;
  const Icon = up ? ArrowUpRight : down ? ArrowDownRight : Minus;

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value >= 10_000 ? compact.format(value) : whole.format(value)}</p>
      <p
        className={cn(
          "mt-1 flex items-center gap-1 text-xs",
          up ? "text-emerald-700" : down ? "text-red-700" : "text-neutral-500",
        )}
        title={hint}
      >
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {change === null
          ? previous === 0 && value > 0
            ? `New vs previous ${days} days`
            : `No change vs previous ${days} days`
          : `${up ? "+" : ""}${Math.round(change * 100)}% vs previous ${days} days`}
      </p>
    </div>
  );
}

function ChartTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as Summary["daily"][number];
  return (
    <div className="rounded-lg border bg-white px-3 py-2 text-sm shadow-lg">
      <p className="font-medium">{dayLabel(d.day, true)}</p>
      <p className="mt-1 flex items-center gap-2 text-neutral-700">
        <span className="h-2 w-2 rounded-full" style={{ background: ACCENT }} />
        {whole.format(d.visits)} visits
      </p>
      <p className="text-neutral-500">{whole.format(d.pageviews)} page views</p>
    </div>
  );
}

function VisitsChart({ daily }: { daily: Summary["daily"] }) {
  const max = useMemo(() => Math.max(0, ...daily.map((d) => d.visits)), [daily]);
  const tickEvery = daily.length > 45 ? 14 : daily.length > 14 ? 5 : 1;

  return (
    <div className="h-72" role="img" aria-label={`Daily visits over the last ${daily.length} days`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={daily} margin={{ top: 8, right: 12, bottom: 0, left: -12 }}>
          <defs>
            <linearGradient id="visitsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ACCENT} stopOpacity={0.14} />
              <stop offset="100%" stopColor={ACCENT} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={GRID} strokeWidth={1} />
          <XAxis
            dataKey="day"
            tickFormatter={(v) => dayLabel(v)}
            interval={tickEvery - 1}
            tickLine={false}
            axisLine={{ stroke: GRID }}
            tick={{ fontSize: 12, fill: "#737373" }}
            minTickGap={12}
          />
          <YAxis
            allowDecimals={false}
            domain={[0, max < 4 ? 4 : "auto"]}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#737373" }}
            tickFormatter={(v) => whole.format(v)}
            width={48}
          />
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ stroke: "#a3a3a3", strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="visits"
            stroke={ACCENT}
            strokeWidth={2}
            fill="url(#visitsFill)"
            strokeLinecap="round"
            strokeLinejoin="round"
            activeDot={{ r: 5, fill: ACCENT, stroke: "#fff", strokeWidth: 2 }}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function BarList({
  title,
  caption,
  rows,
  emptyText = "Nothing recorded yet.",
}: {
  title: string;
  caption: string;
  rows: { label: string; value: number }[];
  emptyText?: string;
}) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <section className="rounded-xl border bg-white p-5 shadow-sm md:p-6">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="font-semibold">{title}</h2>
        <span className="text-xs text-neutral-500">{caption}</span>
      </div>
      {rows.length === 0 ? (
        <p className="py-6 text-center text-sm text-neutral-500">{emptyText}</p>
      ) : (
        <ul className="space-y-3">
          {rows.map((r) => (
            <li key={r.label} title={`${r.label}: ${whole.format(r.value)}`}>
              <div className="mb-1 flex items-baseline justify-between gap-4 text-sm">
                <span className="truncate text-neutral-800">{r.label}</span>
                <span className="shrink-0 tabular-nums text-neutral-600">{whole.format(r.value)}</span>
              </div>
              <div className="h-2 rounded-full bg-neutral-100">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${(r.value / max) * 100}%`, background: ACCENT }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
