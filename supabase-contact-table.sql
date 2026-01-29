-- Run this in Supabase Dashboard: SQL Editor → New query → paste → Run
-- Creates the table for contact form submissions

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  estate_type text not null,
  submitted_at timestamptz not null default now()
);

-- Optional: enable Row Level Security (RLS) and allow service role to do everything
-- (API uses SUPABASE_SERVICE_ROLE_KEY which bypasses RLS)
alter table public.contact_submissions enable row level security;

-- Policy: allow service role full access (handled by service key)
-- No extra policy needed when using service_role key from API.

-- Optional: add index for listing by date
create index if not exists contact_submissions_submitted_at_idx
  on public.contact_submissions (submitted_at desc);
