'use client';

import {createAuthClient} from '@neondatabase/auth/next';
import {FormEvent, useEffect, useState} from 'react';

const auth = createAuthClient();

function describeError(error:unknown):string {
  if(!error) return '';
  const e=error as {code?:string;message?:string;statusText?:string;status?:number};
  const parts=[e.code,e.message||e.statusText].filter(Boolean);
  return parts.length?parts.join(': '):'neznámá chyba';
}

export default function Login({signedIn}:{signedIn:boolean}) {
  const [message,setMessage]=useState('');
  const [busy,setBusy]=useState(false);
  const [email,setEmail]=useState('');
  const [otp,setOtp]=useState('');
  const [otpSent,setOtpSent]=useState(false);

  // Chyba z Google OAuth callbacku se vrací až po redirectu z Googlu jako parametr v URL.
  useEffect(()=>{
    const params=new URLSearchParams(window.location.search);
    const err=params.get('error')||params.get('error_description')||params.get('error_code');
    if(err){
      setMessage('Google se vrátil s chybou: '+err+'. Pokud jde o kontrolu state (STATE_INTEGRITY_CHECK_FAILED), použij níže přihlášení jednorázovým kódem.');
      const url=new URL(window.location.href);
      ['error','error_description','error_code'].forEach(k=>url.searchParams.delete(k));
      window.history.replaceState({},'',url.toString());
    }
  },[]);

  async function googleOrSignOut() {
    setBusy(true);setMessage('');
    try {
      if(signedIn) {
        const result=await auth.signOut();
        if(result.error){setMessage('Odhlášení se nepodařilo: '+describeError(result.error));setBusy(false);return;}
        window.location.assign('/');
      } else {
        const origin=window.location.origin;
        const result=await auth.signIn.social({provider:'google',callbackURL:origin+'/',errorCallbackURL:origin+'/account'});
        if(result.error){setMessage('Přihlášení přes Google se nepodařilo: '+describeError(result.error)+'. Na mobilu použij jednorázový kód na e-mail.');setBusy(false);return;}
        // Někteří klienti přesměrují sami, jiní jen vrátí URL — přesměrujeme explicitně.
        const url=(result as {data?:{url?:string}}).data?.url;
        if(url){window.location.assign(url);return;}
        setMessage('Google nevrátil adresu k přesměrování — v Neon Auth zřejmě není zapnutý poskytovatel Google. Zatím použij jednorázový kód na e-mail.');
        setBusy(false)
      }
    } catch(e) {
      setMessage('Přihlášení přes Google se nepodařilo: '+describeError(e)+'. Na mobilu použij jednorázový kód na e-mail.');
      setBusy(false);
    }
  }

  async function sendOtp(event:FormEvent) {
    event.preventDefault();setBusy(true);setMessage('');
    try {
      const result=await auth.emailOtp.sendVerificationOtp({email,type:'sign-in'});
      if(result.error)throw new Error(describeError(result.error));
      setOtpSent(true);
      setMessage('Jednorázový kód jsme poslali na e-mail.');
    } catch(e) {
      setMessage('Kód se nepodařilo odeslat ('+describeError(e)+'). V Neon Auth musí být zapnuté Email OTP a odesílání e-mailů.');
    } finally { setBusy(false); }
  }

  async function verifyOtp(event:FormEvent) {
    event.preventDefault();setBusy(true);setMessage('');
    try {
      const result=await auth.signIn.emailOtp({email,otp});
      if(result.error)throw new Error(describeError(result.error));
      window.location.assign('/');
    } catch {
      setMessage('Kód není platný nebo už vypršel. Vyžádej si nový kód.');
      setBusy(false);
    }
  }

  if(signedIn)return <><button className="primary-button" disabled={busy} onClick={googleOrSignOut}>{busy?'Čekej prosím…':'Odhlásit se'}</button><p role="status">{message}</p></>;

  return <div className="account-login">
    <section>
      <h2>Google</h2>
      <button className="primary-button" disabled={busy} onClick={googleOrSignOut}>{busy?'Čekej prosím…':'Přihlásit se přes Google'}</button>
      <p className="account-help">Pokud Neon na mobilu zobrazí chybu kontroly state, použij přihlášení kódem. Obě cesty pracují se stejnou e-mailovou identitou.</p>
    </section>
    <div className="account-divider"><span>nebo</span></div>
    <section>
      <h2>Jednorázový kód na e-mail</h2>
      {!otpSent?<form onSubmit={sendOtp} className="account-form">
        <label htmlFor="account-email">E-mail</label>
        <input id="account-email" type="email" autoComplete="email" required value={email} onChange={event=>setEmail(event.target.value)} placeholder="mpalascak@gmail.com"/>
        <button className="secondary-button" disabled={busy}>Poslat kód</button>
      </form>:<form onSubmit={verifyOtp} className="account-form">
        <p>Kód byl odeslán na <strong>{email}</strong>.</p>
        <label htmlFor="account-otp">Šestimístný kód</label>
        <input id="account-otp" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required value={otp} onChange={event=>setOtp(event.target.value.replace(/\D/g,''))}/>
        <button className="primary-button" disabled={busy}>Ověřit a přihlásit</button>
        <button type="button" className="action-link" disabled={busy} onClick={()=>{setOtpSent(false);setOtp('');setMessage('');}}>Poslat nový kód</button>
      </form>}
    </section>
    <p role="status" className="account-message">{message}</p>
  </div>;
}
