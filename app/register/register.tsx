'use client';

import {createAuthClient} from '@neondatabase/auth/next';
import {FormEvent,useState} from 'react';

const auth=createAuthClient();

export default function Register() {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [otp,setOtp]=useState('');
  const [sent,setSent]=useState(false);
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState('');

  async function send(event:FormEvent) {
    event.preventDefault();setBusy(true);setMessage('');
    try {
      const result=await auth.emailOtp.sendVerificationOtp({email,type:'sign-in'});
      if(result.error)throw new Error();
      setSent(true);setMessage('Ověřovací kód jsme poslali na e-mail.');
    } catch {setMessage('Kód se nepodařilo odeslat. Zkontroluj e-mail nebo kontaktuj administrátora.');}
    finally {setBusy(false);}
  }

  async function verify(event:FormEvent) {
    event.preventDefault();setBusy(true);setMessage('');
    try {
      const result=await auth.signIn.emailOtp({email,otp,name});
      if(result.error)throw new Error();
      window.location.assign('/');
    } catch {setMessage('Kód není platný nebo vypršel. Vyžádej si nový.');setBusy(false);}
  }

  return <div className="account-login"><form className="account-form" onSubmit={sent?verify:send}>
    <label htmlFor="register-name">Jméno</label><input id="register-name" required autoComplete="name" value={name} onChange={event=>setName(event.target.value)} disabled={sent}/>
    <label htmlFor="register-email">E-mail</label><input id="register-email" required type="email" autoComplete="email" value={email} onChange={event=>setEmail(event.target.value)} disabled={sent}/>
    {sent&&<><label htmlFor="register-otp">Šestimístný kód</label><input id="register-otp" required inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={otp} onChange={event=>setOtp(event.target.value.replace(/\D/g,''))}/></>}
    <button className="primary-button" disabled={busy}>{busy?'Čekej prosím…':sent?'Dokončit registraci':'Poslat ověřovací kód'}</button>
    {sent&&<button type="button" className="action-link" disabled={busy} onClick={()=>{setSent(false);setOtp('');setMessage('');}}>Změnit údaje nebo poslat nový kód</button>}
    <p role="status" className="account-message">{message}</p>
  </form></div>;
}
