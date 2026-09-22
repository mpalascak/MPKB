import Link from 'next/link';
import Login from '../account/login';
import type {AccessState} from '../../lib/access';

export function AccessShell({access}:{access:AccessState}) {
  if(access.status==='anonymous')return <main className="access-page"><section className="access-card">
    <div className="brand access-brand"><div className="brand-mark" aria-hidden="true"><span/><span/><span/></div><div><strong>InfraBase</strong><small>SDM Knowledge Base</small></div></div>
    <p className="eyebrow">Chráněná studijní databáze</p><h1>Přihlas se pro pokračování</h1>
    <p>Obsah, testy i studijní postup jsou dostupné pouze schváleným uživatelům.</p>
    <div className="access-actions"><Link className="primary-button" href="/account">Přihlásit se</Link><Link className="secondary-button" href="/register">Vytvořit účet</Link></div>
  </section></main>;

  return <main className="access-page"><section className="access-card">
    <div className="brand access-brand"><div className="brand-mark" aria-hidden="true"><span/><span/><span/></div><div><strong>InfraBase</strong><small>SDM Knowledge Base</small></div></div>
    <p className="eyebrow">{access.status==='pending'?'Čeká na schválení':'Přístup zamítnut'}</p>
    <h1>{access.status==='pending'?'Registrace byla přijata':'Účet nyní nemá přístup'}</h1>
    <p>{access.status==='pending'?'Administrátor musí účet schválit. Potom stačí tuto stránku obnovit.':'Pokud má jít o aktivní účet, kontaktuj administrátora.'}</p>
    <p>Přihlášený účet: <strong>{access.user?.email}</strong></p>
    <Login signedIn/>
  </section></main>;
}
