import {authConfigured,getAuth} from './auth';
import {ensureAccessSchema} from './db';

export type AccessStatus='anonymous'|'pending'|'approved'|'rejected';
export type AccessIdentity={id:string;email:string;name?:string|null};
export type AccessState={status:AccessStatus;user:AccessIdentity|null;isAdmin:boolean};

const fallbackAdmin='mpalascak@gmail.com';

export function adminEmails() {
  return new Set([fallbackAdmin,...(process.env.MPKB_ADMIN_EMAILS||'').split(',')]
    .map(value=>value.trim().toLowerCase()).filter(Boolean));
}

export function isAdminEmail(email?:string|null) {
  return Boolean(email&&adminEmails().has(email.toLowerCase()));
}

export async function sessionIdentity():Promise<AccessIdentity|null> {
  if(!authConfigured())return null;
  const {data}=await getAuth().getSession();
  const user=data?.user;
  if(!user?.id||!user.email)return null;
  return {id:user.id,email:user.email,name:user.name};
}

export async function accessForUser(user:AccessIdentity):Promise<AccessState> {
  const sql=await ensureAccessSchema();
  const admin=isAdminEmail(user.email);
  const initialStatus=admin?'approved':'pending';
  await sql`INSERT INTO mpkb_access_requests (user_id,email,display_name,status,reviewed_at,reviewed_by)
    VALUES (${user.id},${user.email.toLowerCase()},${user.name||null},${initialStatus},${admin?new Date().toISOString():null},${admin?'system-admin-bootstrap':null})
    ON CONFLICT (user_id) DO UPDATE SET email=EXCLUDED.email,display_name=COALESCE(EXCLUDED.display_name,mpkb_access_requests.display_name)`;
  if(admin)await sql`UPDATE mpkb_access_requests SET status='approved',reviewed_at=COALESCE(reviewed_at,now()),reviewed_by=COALESCE(reviewed_by,'system-admin-bootstrap') WHERE user_id=${user.id}`;
  const rows=await sql`SELECT status FROM mpkb_access_requests WHERE user_id=${user.id}`;
  return {status:(rows[0]?.status||initialStatus) as AccessStatus,user,isAdmin:admin};
}

export async function getAccessState():Promise<AccessState> {
  const user=await sessionIdentity();
  if(!user)return {status:'anonymous',user:null,isAdmin:false};
  return accessForUser(user);
}

export async function requireApproved() {
  const access=await getAccessState();
  if(access.status!=='approved')return null;
  return access;
}

export async function requireAdmin() {
  const access=await getAccessState();
  if(access.status!=='approved'||!access.isAdmin)return null;
  return access;
}
