-- Run this in Supabase Dashboard: SQL Editor → New query → paste → Run
-- Creates the table for contact form submissions

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  estate_type text not null,
  submitted_at timestamptz not null default now()
);

-- Enable Row Level Security (RLS)
alter table public.contact_submissions enable row level security;

-- Policy: allow inserts from API (anon or service_role key)
-- Without this, inserts fail if using anon key; service_role bypasses RLS.
create policy "Allow insert contact submissions"
  on public.contact_submissions
  for insert
  with check (true);

-- Optional: add index for listing by date
create index if not exists contact_submissions_submitted_at_idx
  on public.contact_submissions (submitted_at desc);
