import { neon } from '@neondatabase/serverless';
import { authConfigured, getAuth } from '../../../lib/auth';
import { emptyProgress, validProgress } from '../../../lib/progress';
export const dynamic = 'force-dynamic';
const json=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store'}});
async function identity(){
  if(!authConfigured())return null;
  const {data}=await getAuth().getSession();
  return data?.user || null;
}
async function database(){
  const url=process.env.DATABASE_URL;
  if(!url)throw new Error('Database unavailable');
  const sql=neon(url);
  await sql`CREATE TABLE IF NOT EXISTS mpkb_study_progress (user_id text PRIMARY KEY, data jsonb NOT NULL, revision integer NOT NULL DEFAULT 1, updated_at timestamptz NOT NULL DEFAULT now())`;
  return sql;
}
export async function GET(){
  try {
    if(!authConfigured())return json({configured:false,user:null});
    const user=await identity();
    if(!user)return json({configured:true,user:null});
    const sql=await database();
    const rows=await sql`SELECT data, revision FROM mpkb_study_progress WHERE user_id=${user.id}`;
    return json({configured:true,user:{id:user.id,email:user.email},data:rows[0]?.data||emptyProgress,revision:rows[0]?.revision||0});
  }catch{return json({error:'Synchronizace není dostupná. Lokální výsledky zůstávají zachované.'},503);}
}
export async function PUT(request: Request){
  // Cookie-authenticated mutations must originate on this application.
  if(request.headers.get('origin')!==new URL(request.url).origin)return json({error:'Invalid origin'},403);
  try {
    const user=await identity(); if(!user)return json({error:'Přihlas se.'},401);
    const raw=await request.text();if(raw.length>300000)return json({error:'Data jsou příliš velká.'},413);
    let body;try{body=JSON.parse(raw);}catch{return json({error:'Neplatná data.'},400);}
    if(!validProgress(body?.data)||!Number.isSafeInteger(body?.revision)||body.revision<0)return json({error:'Neplatná data.'},400);
    const sql=await database();
    const rows=body.revision===0
      ? await sql`INSERT INTO mpkb_study_progress (user_id,data) VALUES (${user.id},${JSON.stringify(body.data)}::jsonb) ON CONFLICT DO NOTHING RETURNING revision`
      : await sql`UPDATE mpkb_study_progress SET data=${JSON.stringify(body.data)}::jsonb,revision=revision+1,updated_at=now() WHERE user_id=${user.id} AND revision=${body.revision} RETURNING revision`;
    if(!rows.length)return json({error:'Postup mezitím změnilo jiné zařízení.'},409);
    return json({revision:rows[0].revision});
  }catch{return json({error:'Uložení se nezdařilo. Výsledky zůstávají na zařízení.'},503);}
}
