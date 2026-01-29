# Supabase setup for contact form

Contact form submissions are saved to Supabase. Follow these steps once.

## 1. Create the table in Supabase

1. Open [Supabase Dashboard](https://supabase.com/dashboard) and select your project.
2. Go to **SQL Editor** → **New query**.
3. Copy the contents of **supabase-contact-table.sql** (in this repo) and paste into the editor.
4. Click **Run**. The `contact_submissions` table will be created.

## 2. Get your API keys

1. In Supabase, go to **Project Settings** (gear icon) → **API**.
2. Copy:
   - **Project URL** → use as `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role** key (under "Project API keys") → use as `SUPABASE_SERVICE_ROLE_KEY`  
   ⚠️ Keep the service role key secret. Do not expose it in the browser or commit it to git.

## 3. Set environment variables

**Local (`.env.local`):**

1. Copy `.env.local.example` to `.env.local`.
2. Paste your Project URL and service_role key:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
```

**Vercel (production):**

1. Vercel project → **Settings** → **Environment Variables**.
2. Add the same two variables (same names and values).

## 4. Install dependency (if needed)

```bash
npm install
```

## 5. View submissions

In Supabase: **Table Editor** → **contact_submissions**. New rows appear when someone submits the contact form.

---

## Troubleshooting: "No form submitted" or errors

**1. You see an error message on the form after submitting**  
The API now returns the real error. Common ones:

- **"relation \"contact_submissions\" does not exist"** → Run the SQL in **supabase-contact-table.sql** in Supabase **SQL Editor** (step 1 above).
- **"new row violates row-level security policy"** → Run the SQL again; it now includes a policy that allows inserts. Or in Supabase: **Table Editor** → **contact_submissions** → **Policies** → add a policy: **INSERT** with check `true`.
- **"Missing Supabase env..."** → Add `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` (local) or Vercel **Environment Variables** (production). Use the **service_role** key from Supabase **Project Settings** → **API**, not the anon key.

**2. Form shows success but no row in Supabase**  
- Confirm you’re looking at **Table Editor** → **contact_submissions** in the same project whose URL/key you used.
- On Vercel: redeploy after adding or changing env vars (they only apply to new deployments).

**3. Local vs production**  
- Local: `.env.local` must have the two variables; restart `npm run dev` after changing them.
- Production: set the same two variables in Vercel and redeploy.
