'use client';
import {createAuthClient} from '@neondatabase/auth/next';
import {useState} from 'react';
const auth = createAuthClient();
export default function Login({signedIn}:{signedIn:boolean}){
  const [message,setMessage]=useState('');
  const [busy,setBusy]=useState(false);
  async function act(){setBusy(true);setMessage('');try{
    if(signedIn){const result=await auth.signOut();if(result.error)throw new Error();window.location.assign('/');}
    else {const result=await auth.signIn.social({provider:'google',callbackURL:window.location.origin+'/'});if(result.error)throw new Error();}
  }catch{setMessage('Přihlášení se nepodařilo. Ověř nastavení Google přihlášení a povolené domény v Neon Auth.');setBusy(false);}}
  return <><button className="primary-button" disabled={busy} onClick={act}>{busy?'Čekej prosím…':signedIn?'Odhlásit se':'Přihlásit se přes Google'}</button><p role="status">{message}</p></>;
}
