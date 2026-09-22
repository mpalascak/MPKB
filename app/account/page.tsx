import {authConfigured,getAuth} from '../../lib/auth';
import {getAccessState} from '../../lib/access';
import Link from 'next/link';
import Login from './login';
export const dynamic='force-dynamic';
export default async function Account(){
  const configured=authConfigured();
  let email:string|undefined;
  let failed=false;
  try{if(configured)email=(await getAuth().getSession()).data?.user.email;}catch{failed=true;}
  const access=email?await getAccessState():null;
  return <main className="access-page"><section className="access-card"><p className="eyebrow">MP Knowledge Base · tvůj účet</p><h1>Studuj na všech zařízeních</h1><p>Po přihlášení se výsledky a poznámky ukládají k tvému schválenému účtu.</p>{email&&<><p>Přihlášen: <strong>{email}</strong></p><p>Stav přístupu: <strong>{access?.status==='approved'?'schválený':access?.status==='pending'?'čeká na schválení':'zamítnutý'}</strong></p></>}{configured&&!failed?<Login signedIn={Boolean(email)}/>:<p role="status">{failed?'Přihlašovací služba nyní není dostupná. Zkus to později.':'Přihlašování ještě čeká na aktivaci Neon Auth.'}</p>}<p><Link href="/">← Zpět</Link>{!email&&<> · <Link href="/register">Vytvořit účet</Link></>}</p></section></main>;
}
