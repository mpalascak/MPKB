const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),ts=require('typescript');
function load(path,imports={}){const module={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{module,exports:module.exports,require:name=>imports[name],process:{env:{}},Set,Date});return module.exports;}
let selected='pending',calls=[];
const sql=async(strings,...values)=>{const text=strings.join('?');calls.push({text,values});return text.startsWith('SELECT')?[{status:selected}]:[];};
const access=load('lib/access.ts',{
 './auth':{authConfigured:()=>false,getAuth:()=>({})},
 './db':{ensureAccessSchema:async()=>sql}
});
(async()=>{
 assert.equal(access.isAdminEmail('mpalascak@gmail.com'),true);
 assert.equal(access.isAdminEmail('student@example.com'),false);
 assert.equal((await access.getAccessState()).status,'anonymous');
 selected='pending';calls=[];
 const regular=await access.accessForUser({id:'student-1',email:'student@example.com',name:'Student'});
 assert.equal(regular.status,'pending');assert.equal(regular.isAdmin,false);
 assert.ok(calls[0].values.includes('pending'));
 selected='approved';calls=[];
 const admin=await access.accessForUser({id:'admin-1',email:'MPALASCAK@GMAIL.COM',name:'Martin'});
 assert.equal(admin.status,'approved');assert.equal(admin.isAdmin,true);
 assert.ok(calls.some(call=>call.text.startsWith('UPDATE')),'Admin approval is enforced server-side');
 console.log('PASS: anonymous gate, pending default, fixed admin identity and server-side admin approval.');
})().catch(error=>{console.error(error);process.exitCode=1});
