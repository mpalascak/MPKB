'use server';

import {revalidatePath} from 'next/cache';
import {isAdminEmail,requireAdmin} from '../../../lib/access';
import {ensureAccessSchema} from '../../../lib/db';

export async function reviewUser(formData:FormData) {
  const admin=await requireAdmin();
  if(!admin?.user)throw new Error('Nemáš oprávnění schvalovat uživatele.');
  const userId=String(formData.get('userId')||'');
  const decision=String(formData.get('decision')||'');
  if(!/^[A-Za-z0-9_:-]{1,200}$/.test(userId)||!['approved','rejected'].includes(decision))throw new Error('Neplatný požadavek.');
  const sql=await ensureAccessSchema();
  const rows=await sql`SELECT email FROM mpkb_access_requests WHERE user_id=${userId}`;
  const email=rows[0]?.email as string|undefined;
  if(!email)throw new Error('Uživatel neexistuje.');
  if(isAdminEmail(email)&&decision!=='approved')throw new Error('Administrátorský účet nelze zamítnout.');
  await sql`UPDATE mpkb_access_requests SET status=${decision},reviewed_at=now(),reviewed_by=${admin.user.email} WHERE user_id=${userId}`;
  revalidatePath('/admin/users');
}
