# Managing website content

Properties, projects and blog posts are edited in the website's admin dashboard at
**`/admin`** (for example `https://your-domain.com/admin`). Changes appear on the live site as
soon as you press **Save**; there's no rebuild or redeploy.

Everything else on the site (services, team, testimonials, page copy) is still edited in code in
`src/lib/data.ts` and the page files.

---

## For the website manager

### Signing in

1. Go to `/admin` and sign in with the email and password you were given.
2. Forgot your password? Type your email on the sign-in screen and click **Forgot password?**.
   You'll get an email with a link to set a new one.

### Adding a property

1. **Properties → Add property**.
2. Drag photos into the photo box (or click *browse*). Large phone photos are shrunk
   automatically. Use the arrows to reorder; the **first photo is the cover** shown on listing
   cards. The ★ button makes any photo the cover.
3. Fill in the title, type, status and price. Price is in naira without commas (`150000000`); the
   formatted amount appears under the box so you can check it.
4. Add details (bedrooms, size, etc.). Leave anything that doesn't apply empty.
5. Add features by typing and pressing **Enter**, or tap the suggestions.
6. Fill in the agent's name, phone and email: buyers use these to call or email.
7. **Save**.

Turn on **Featured** to show a property first on the home page and listings.

### Projects and blog posts

These work the same way.

- **Projects**: the *Category* controls which filter tab a project appears under on the
  Projects page. Mark one project **Featured** to give it the large spotlight section.
- **Blog posts**: write the article in the editor; use the toolbar for headings, bold, lists,
  quotes, links and images. The web address (slug) is filled in from the title automatically,
  and reading time is calculated for you.

### Team

**Team → Add team member** (or click someone to edit). Pick their **Department** to choose
which tab they appear under on the Team page; **Order** controls their position within it
(lower numbers first). Departments with nobody in them are hidden automatically.

### Analytics

**Analytics** shows visits to the public website: visits and page views per day, top pages,
most viewed properties, where visitors come from, devices, rough location (from the browser's
time zone), and contact actions (phone, email and WhatsApp taps, shares, contact form sends).

It's anonymous: no cookies, no IP addresses, nothing that identifies a person, and it honours
browsers' "do not track" setting. Visits from `localhost` and automated bots aren't counted.

### Hiding vs deleting

- The **Live / Hidden** switch takes something off the website without losing it. Use this for
  sold properties you may want back, or drafts you're still writing.
- **Delete** (bin icon) removes it permanently.

---

## For the developer: one-time setup

### 1. Create the Supabase project

Create a project at [supabase.com](https://supabase.com) (the free plan is enough). Pick the
London region (`eu-west-2`); it's the closest to Nigeria.

### 2. Create the database

Run the migration, then the seed, in **SQL Editor** (or with the Supabase CLI):

1. Every file in `supabase/migrations/`, in filename order: tables, security rules and the
   `media` storage bucket.
2. `supabase/seed.sql`: copies the content currently bundled in the site into the database.
   Regenerate it any time with `npx tsx scripts/generate-seed.ts`.

### 3. Connect the site

Copy `.env.example` to `.env` and fill in the two values from **Project Settings → API**:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=...
```

Add the same two variables in **Vercel → Project → Settings → Environment Variables**, then
redeploy.

Until these are set, the site keeps showing the bundled content from `src/lib/data.ts` and
`/admin` shows a "not connected" notice. If the database is ever unreachable, the site falls
back to the bundled content instead of breaking.

### 4. Lock down sign-ups and set redirect URLs

In **Authentication → Sign In / Providers**, turn **off** "Allow new users to sign up". Only
people you invite should have accounts.

In **Authentication → URL Configuration**, set the **Site URL** to the live domain and add
`https://your-domain.com/admin/reset-password` (and `http://localhost:8080/admin/reset-password`
for local work) to **Redirect URLs**.

### 5. Give someone admin access

Being signed in isn't enough: a user must also be listed in `admin_users`.

1. **Authentication → Users → Invite user** and enter their email. They'll receive an email to
   set a password.
2. In **SQL Editor**, run:

   ```sql
   insert into public.admin_users (user_id, email)
   select id, email from auth.users where email = 'manager@example.com';
   ```

To remove access: `delete from public.admin_users where email = 'manager@example.com';`

### How access is enforced

Row level security on every table does the enforcement, not the dashboard's UI:

- Anyone can **read** rows where `published = true`.
- Only users in `admin_users` can read hidden rows, or create, edit and delete anything,
  including uploading to the `media` storage bucket.

The anon key in the browser can't bypass this.
