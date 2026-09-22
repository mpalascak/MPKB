const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const source=fs.readFileSync('dist/cloud-sync.js','utf8');
const empty=()=>({progress:{},courseProgress:{},productTrainingProgress:{},chapterProgress:{},notes:{}});
const tick=()=>new Promise(resolve=>setImmediate(resolve));
(async()=>{
 const store=new Map([['infrabase-notes','{"powervault":"old anonymous note"}']]),timers=[];let writes=[],events={},remote={configured:true,user:{id:'alice',email:'alice@example.com'},revision:2,data:empty()};
 const bar={setAttribute(){},addEventListener(type,fn){events[type]=fn},innerHTML:''};
 const overlay={remove(){},append(){}};let created=0;
 const ctx={state:{...empty(),notes:{powervault:'old anonymous note'}},saveState(){throw new Error('Anonymous store must not be used')},render(){},updateProgressUI(){},escapeHtml:x=>x,structuredClone,AbortSignal,JSON,console,confirm:()=>true,location:{reload(){}},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},document:{createElement:()=>created++===0?bar:overlay,querySelector:()=>({prepend(){}}),body:{append(){}}},window:{addEventListener(){}},setTimeout:fn=>{timers.push(fn);return timers.length},clearTimeout(){},fetch:async(url,opts)=>{if(opts.method==='PUT'){writes.push(JSON.parse(opts.body));return {ok:false,status:409};}return {ok:true,json:async()=>structuredClone(remote)};}};
 vm.createContext(ctx);vm.runInContext(source,ctx);await tick();
 assert.equal(ctx.state.notes.powervault,undefined,'Anonymous notes not imported automatically');
 ctx.state.notes.powervault='new account note';ctx.saveState();assert.ok(store.has('infrabase-account-alice'));assert.equal(store.get('infrabase-notes'),'{"powervault":"old anonymous note"}');
 await timers.at(-1)();assert.equal(writes[0].revision,2);assert.ok(bar.innerHTML.includes('Sloučit'));
 remote.revision=3;remote.data.notes.powervault='phone note';
 await events.click({target:{closest:selector=>selector==='[data-resolve-cloud]'?{}:null}});
 assert.ok(ctx.state.notes.powervault.includes('phone note'));assert.ok(ctx.state.notes.powervault.includes('new account note'));
 console.log('PASS: account isolation, explicit import, pending local persistence, concurrent revision conflict, note preservation.');
})().catch(e=>{console.error(e);process.exitCode=1});
