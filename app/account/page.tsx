import {authConfigured,getAuth} from '../../lib/auth';
import Login from './login';
export const dynamic='force-dynamic';
export default async function Account(){
  const configured=authConfigured();
  let email:string|undefined;
  let failed=false;
  try{if(configured)email=(await getAuth().getSession()).data?.user.email;}catch{failed=true;}
  return <main style={{maxWidth:620,margin:'60px auto',padding:24}}><p className="eyebrow">InfraBase · tvůj účet</p><h1>Studuj na všech zařízeních</h1><p>Po přihlášení se výsledky a poznámky ukládají k tvému účtu. Na dalším zařízení použij stejný Google účet.</p>{email&&<p>Přihlášen: <strong>{email}</strong></p>}{configured&&!failed?<Login signedIn={Boolean(email)}/>:<p role="status">{failed?'Přihlašovací služba nyní není dostupná. Zkus to později.':'Přihlašování ještě čeká na aktivaci Neon Auth. Dosavadní výsledky v prohlížeči zůstávají zachované.'}</p>}<p><a href="/">← Zpět ke studiu</a></p></main>;
}
