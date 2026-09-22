const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),ts=require('typescript'),nodePath=require('node:path');
function load(path,imports={}){const module={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,{module,exports:module.exports,require:name=>imports[name],Response,process:{cwd:()=>'/app'}});return module.exports;}
(async()=>{
 let approved=false,reads=0;
 const legacy=load('app/legacy-app/route.ts',{
  'node:fs/promises':{readFile:async()=>{reads++;return 'secret-course-content';}},
  'node:path':nodePath,
  '../../lib/access':{requireApproved:async()=>approved?{status:'approved'}:null}
 });
 let response=await legacy.GET();assert.equal(response.status,403);assert.equal(reads,0,'Protected content must not be read for denied users');
 approved=true;response=await legacy.GET();assert.equal(response.status,200);assert.equal(response.headers.get('Cache-Control'),'private, no-store');assert.ok((await response.text()).includes('secret-course-content'));

 let admin=false,dbCalls=0;
 const actions=load('app/admin/users/actions.ts',{
  'next/cache':{revalidatePath(){}},
  '../../../lib/access':{requireAdmin:async()=>admin?{user:{email:'mpalascak@gmail.com'}}:null,isAdminEmail:email=>email==='mpalascak@gmail.com'},
  '../../../lib/db':{ensureAccessSchema:async()=>async(strings,...values)=>{dbCalls++;return strings[0].startsWith('SELECT')?[{email:'student@example.com'}]:[];}}
 });
 const form=new FormData();form.set('userId','student-1');form.set('decision','approved');
 await assert.rejects(()=>actions.reviewUser(form));assert.equal(dbCalls,0,'Non-admin must be rejected before database mutation');
 admin=true;await actions.reviewUser(form);assert.equal(dbCalls,2);
 console.log('PASS: protected course payload, private cache policy, denied self-approval and authorized admin mutation.');
})().catch(error=>{console.error(error);process.exitCode=1});
