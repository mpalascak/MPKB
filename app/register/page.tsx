import Link from 'next/link';
import {getAccessState} from '../../lib/access';
import Register from './register';

export const dynamic='force-dynamic';

export default async function RegisterPage() {
  const access=await getAccessState();
  if(access.status!=='anonymous')return <main className="access-page"><section className="access-card"><h1>Účet už je přihlášený</h1><p>{access.user?.email}</p><Link className="primary-button" href="/">Pokračovat</Link></section></main>;
  return <main className="access-page"><section className="access-card">
    <p className="eyebrow">Nový účet</p><h1>Registrace do MP Knowledge Base</h1>
    <p>Po ověření e-mailu bude registrace čekat na schválení administrátorem.</p>
    <Register/>
    <p><Link href="/account">Už máš účet? Přihlásit se</Link></p>
  </section></main>;
}
