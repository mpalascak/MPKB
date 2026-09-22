import {neon} from '@neondatabase/serverless';

export function database() {
  const url=process.env.DATABASE_URL;
  if(!url)throw new Error('DATABASE_URL is not configured');
  return neon(url);
}

export async function ensureAccessSchema() {
  const sql=database();
  await sql`CREATE TABLE IF NOT EXISTS mpkb_access_requests (
    user_id text PRIMARY KEY,
    email text NOT NULL,
    display_name text,
    status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
    requested_at timestamptz NOT NULL DEFAULT now(),
    reviewed_at timestamptz,
    reviewed_by text
  )`;
  return sql;
}

export async function ensureProgressSchema() {
  const sql=database();
  await sql`CREATE TABLE IF NOT EXISTS mpkb_study_progress (
    user_id text PRIMARY KEY,
    data jsonb NOT NULL,
    revision integer NOT NULL DEFAULT 1,
    updated_at timestamptz NOT NULL DEFAULT now()
  )`;
  return sql;
}
