// Appended after app.js: shares its state, rendering and persistence functions.
(() => {
  const keys=['progress','courseProgress','productTrainingProgress','notes'];
  const originalSave=saveState;
  const bar=document.createElement('section');bar.className='cloud-status';bar.setAttribute('aria-live','polite');
  document.querySelector('.workspace').prepend(bar);
  const overlay=document.createElement('div');overlay.className='cloud-loading';overlay.textContent='Načítám tvůj studijní postup…';document.body.append(overlay);
  let user=null,revision=0,pending=false,saving=false,conflict=false,timer,ready=false;
  const snapshot=()=>Object.fromEntries(keys.map(k=>[k,structuredClone(state[k])]));
  const apply=data=>{keys.forEach(k=>state[k]=data[k]||{});render();};
  const cacheKey=()=>`infrabase-account-${user.id}`;
  const persist=()=>localStorage.setItem(cacheKey(),JSON.stringify({data:snapshot(),revision,pending}));
  const status=message=>{bar.innerHTML=`<span>${escapeHtml(message)}</span> <a href="/account">${user?'Účet':'Přihlášení'}</a>${user?' <button type="button" data-import-local>Importovat staré výsledky</button>':''}${conflict?' <button type="button" data-resolve-cloud>Sloučit změny z druhého zařízení</button>':''}`;};
  function merge(remote,local){
    const result=structuredClone(remote);
    for(const [id,yes]of Object.entries(local.progress||{}))result.progress[id]=Boolean(result.progress[id]||yes);
    for(const kind of ['courseProgress','productTrainingProgress'])for(const [id,score]of Object.entries(local[kind]||{})){
      const old=result[kind][id]||{best:0,passed:false};result[kind][id]={...old,...score,best:Math.max(old.best,score.best),passed:old.passed||score.passed};
    }
    for(const [id,note]of Object.entries(local.notes||{})){
      const old=result.notes[id];result.notes[id]=old&&note&&old!==note?`${old}\n\n--- Poznámka z tohoto zařízení ---\n${note}`:note||old||'';
    }
    return result;
  }
  async function read(){const r=await fetch('/api/progress',{cache:'no-store',signal:AbortSignal.timeout(12000)});if(!r.ok)throw new Error();return r.json();}
  async function upload(){
    if(!user||saving||conflict||!pending)return;
    saving=true;const sent=snapshot();status('Ukládám…');
    try{
      const r=await fetch('/api/progress',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({revision,data:sent}),signal:AbortSignal.timeout(12000)});
      if(r.status===409){conflict=true;status('Jiné zařízení změnilo postup. Sloučením zachováš nejlepší výsledky i obě verze poznámek.');return;}
      if(r.status===401){status('Přihlášení vypršelo. Změny jsou uložené na tomto zařízení.');return;}
      if(!r.ok)throw new Error();
      revision=(await r.json()).revision;pending=JSON.stringify(sent)!==JSON.stringify(snapshot());persist();status(pending?'Čeká na uložení…':'Synchronizováno s účtem '+user.email);
    }catch{status('Cloud není dostupný. Změny zůstávají na tomto zařízení; uložení zkusím znovu.');}
    finally{saving=false;if(pending&&!conflict){clearTimeout(timer);timer=setTimeout(upload,15000);}}
  }
  saveState=function(){
    if(!user){originalSave();return;}
    pending=true;persist();updateProgressUI();status('Čeká na uložení…');clearTimeout(timer);timer=setTimeout(upload,400);
  };
  bar.addEventListener('click',async e=>{
    if(e.target.closest('[data-import-local]')){
      if(!confirm('Připojit výsledky a poznámky dříve uložené v tomto prohlížeči k právě přihlášenému účtu? Lepší výsledky se zachovají a rozdílné poznámky se spojí.'))return;
      try{
        const local={progress:JSON.parse(localStorage.getItem('infrabase-progress')||'{}'),courseProgress:JSON.parse(localStorage.getItem('infrabase-course-progress')||'{}'),productTrainingProgress:JSON.parse(localStorage.getItem('infrabase-product-training')||'{}'),notes:JSON.parse(localStorage.getItem('infrabase-notes')||'{}')};
        apply(merge(snapshot(),local));saveState();
      }catch{status('Import se nezdařil. Původní data zůstala zachovaná.');}
    }
    if(e.target.closest('[data-resolve-cloud]')){
      try{const remote=await read();if(remote.user?.id!==user.id){location.reload();return;}apply(merge(remote.data,snapshot()));revision=remote.revision;conflict=false;saveState();}catch{status('Cloud není dostupný. Zkus sloučení později.');}
    }
  });
  async function refresh(){
    if(!user||saving||conflict)return;if(pending){upload();return;}
    try{const remote=await read();if(remote.user?.id!==user.id){location.reload();return;}
      // Never replace edits made while the request was in flight.
      if(!pending&&!saving){apply(remote.data);revision=remote.revision;persist();status('Synchronizováno s účtem '+user.email);}
    }catch{status('Cloud není dostupný. Zobrazuji poslední načtený postup.');}
  }
  window.addEventListener('focus',refresh);window.addEventListener('online',refresh);
  read().then(remote=>{
    ready=true;
    if(!remote.user){status(remote.configured?'Postup je zatím pouze v tomto prohlížeči. Přihlas se pro synchronizaci.':'Synchronizace čeká na nastavení Neon Auth. Postup se ukládá v tomto prohlížeči.');return;}
    user=remote.user;revision=remote.revision;
    let local;try{local=JSON.parse(localStorage.getItem(cacheKey())||'null');}catch{}
    if(local?.pending){apply(local.data);pending=true;revision=local.revision;conflict=revision!==remote.revision;persist();if(conflict)status('Máš neodeslané změny i novější data v cloudu. Sloučením zachováš obě poznámky a nejlepší výsledky.');else upload();}
    else{apply(remote.data);persist();status('Synchronizováno s účtem '+user.email);}
  }).catch(()=>{
    // Do not write authenticated edits into anonymous storage when identity is unknown.
    saveState=function(){updateProgressUI();status('Připojení k účtu nelze ověřit. Obnov stránku před dalším studiem.');};
    status('Připojení k účtu nelze ověřit. Obnov stránku po připojení k internetu.');
      overlay.textContent='Připojení k účtu se nepodařilo ověřit. Pro ochranu tvého postupu obnov stránku.';
    const retry=document.createElement('button');retry.textContent='Zkusit znovu';retry.className='primary-button';retry.onclick=()=>location.reload();overlay.append(retry);
  }).finally(()=>{if(ready)overlay.remove();});
})();
