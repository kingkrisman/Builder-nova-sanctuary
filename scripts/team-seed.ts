/** Prints SQL that seeds public.team_members from src/lib/data.ts. Run: npx tsx scripts/team-seed.ts */
import { leadershipTeam } from "../src/lib/data";

const DEPARTMENTS: Record<keyof typeof leadershipTeam, string> = {
  executiveManagement: "Executive Management",
  projectConstruction: "Project & Construction",
  realEstate: "Real Estate",
  designPlanning: "Design & Planning",
  supportServices: "Support Services",
  securityLogistics: "Security & Logistics",
};
// Photo that was previously hard-coded in TeamCard
const PHOTO_OVERRIDES: Record<string, string> = {
  "Engr. David Adediran":
    "https://cdn.builder.io/api/v1/image/assets%2Faeee31fcf1114fceb0dea40aa0430358%2F84f63fab8ef94516ad5d1f51db95731f",
};
const q = (v: string) => `'${v.replace(/'/g, "''")}'`;

const rows = (Object.keys(DEPARTMENTS) as (keyof typeof leadershipTeam)[]).flatMap((key) =>
  leadershipTeam[key].map(
    (m, i) =>
      `  (${m.id}, ${q(m.name)}, ${q(m.position)}, ${q(m.qualifications ?? "")}, ${q(DEPARTMENTS[key])}, ${q(m.imageUrl || PHOTO_OVERRIDES[m.name] || "")}, ${i})`,
  ),
);

console.log(
  `insert into public.team_members (id, name, position, qualifications, department, image_url, sort_order) overriding system value values\n${rows.join(",\n")}\non conflict (id) do nothing;\n` +
    `select setval(pg_get_serial_sequence('public.team_members', 'id'), (select max(id) from public.team_members));`,
);
