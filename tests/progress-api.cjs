const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),ts=require('typescript');
function load(path,imports={}){const module={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{module,exports:module.exports,require:name=>imports[name],Response,URL,process:{env:{DATABASE_URL:'test'}}});return module.exports;}
const model=load('lib/progress.ts');
assert.ok(model.validProgress(model.emptyProgress));
assert.ok(!model.validProgress({...model.emptyProgress,notes:{a:34}}));
assert.ok(!model.validProgress({...model.emptyProgress,courseProgress:{a:{best:101,passed:true}}}));
assert.ok(!model.validProgress({...model.emptyProgress,progress:{constructor:true,'__proto__':true}}));
let approved=false,configured=true,queries=[],rows=[];
const sql=async(strings,...values)=>{queries.push({text:strings.join('?'),values});return rows;};
const api=load('app/api/progress/route.ts',{
 '../../../lib/auth':{authConfigured:()=>configured,localAccessEnabled:()=>false},
 '../../../lib/access':{requireApproved:async()=>approved?{status:'approved',user:{id:'verified-user',email:'user@example.com'}}:null},
 '../../../lib/db':{ensureProgressSchema:async()=>sql},
 '../../../lib/progress':model
});
const request=(data,origin='https://kb.test')=>new Request('https://kb.test/api/progress',{method:'PUT',headers:{origin},body:JSON.stringify(data)});
(async()=>{
 assert.equal((await api.PUT(request({data:model.emptyProgress,revision:0}))).status,403);
 assert.equal(queries.length,0);
 approved=true;
 assert.equal((await api.PUT(request({data:model.emptyProgress,revision:0},'https://evil.test'))).status,403);
 assert.equal((await api.PUT(request({data:{},revision:0}))).status,400);
 rows=[{revision:1}];assert.equal((await api.PUT(request({data:model.emptyProgress,revision:0,userId:'other-user'}))).status,200);
 assert.equal(queries.at(-1).values[0],'verified-user');
 rows=[];assert.equal((await api.PUT(request({data:model.emptyProgress,revision:2}))).status,409);
 assert.ok(queries.at(-1).values.includes('verified-user'));
 rows=[{data:model.emptyProgress,revision:3}];const result=await api.GET();assert.equal(result.headers.get('Cache-Control'),'private, no-store');assert.equal((await result.json()).user.id,'verified-user');
 console.log('PASS: schema validation, unauthorized access, CSRF, verified identity, revision conflicts, private responses.');
})().catch(e=>{console.error(e);process.exitCode=1});
