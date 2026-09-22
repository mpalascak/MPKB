import Link from 'next/link';
import {requireAdmin} from '../../../lib/access';
import {ensureAccessSchema} from '../../../lib/db';
import {reviewUser} from './actions';

export const dynamic='force-dynamic';

type RequestRow={user_id:string;email:string;display_name:string|null;status:'pending'|'approved'|'rejected';requested_at:string;reviewed_at:string|null;reviewed_by:string|null};

export default async function UsersAdminPage() {
  const admin=await requireAdmin();
  if(!admin)return <main className="access-page"><section className="access-card"><h1>Přístup odepřen</h1><p>Tato stránka je pouze pro administrátora.</p><Link href="/">Zpět</Link></section></main>;
  const sql=await ensureAccessSchema();
  const rows=await sql`SELECT user_id,email,display_name,status,requested_at,reviewed_at,reviewed_by FROM mpkb_access_requests ORDER BY CASE status WHEN 'pending' THEN 0 WHEN 'approved' THEN 1 ELSE 2 END,requested_at DESC` as unknown as RequestRow[];
  return <main className="admin-page"><header className="admin-head"><div><p className="eyebrow">Administrace přístupu</p><h1>Uživatelé InfraBase</h1><p>Přístup k celé KB získá uživatel až po schválení.</p></div><Link className="secondary-button" href="/">Zpět do KB</Link></header>
    <div className="admin-users">{rows.map(row=><article key={row.user_id} className="admin-user">
      <div><span className={`access-status ${row.status}`}>{row.status==='pending'?'Čeká':row.status==='approved'?'Schválený':'Zamítnutý'}</span><h2>{row.display_name||'Bez uvedeného jména'}</h2><p>{row.email}</p><small>Registrace: {new Date(row.requested_at).toLocaleString('cs-CZ',{timeZone:'Europe/Prague'})}</small>{row.reviewed_by&&<small> · Posoudil: {row.reviewed_by}</small>}</div>
      <div className="admin-actions">
        {row.status!=='approved'&&<form action={reviewUser}><input type="hidden" name="userId" value={row.user_id}/><input type="hidden" name="decision" value="approved"/><button className="primary-button">Schválit</button></form>}
        {row.status!=='rejected'&&row.email.toLowerCase()!=='mpalascak@gmail.com'&&<form action={reviewUser}><input type="hidden" name="userId" value={row.user_id}/><input type="hidden" name="decision" value="rejected"/><button className="secondary-button">Zamítnout</button></form>}
      </div>
    </article>)}</div>
  </main>;
}
