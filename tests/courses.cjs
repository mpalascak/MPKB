const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const listeners = {};
const element = {innerHTML:'',textContent:'',value:'',style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false;}},addEventListener(){},setAttribute(){},focus(){},scrollIntoView(){},showModal(){},close(){}};
const context = {console,location:{hash:''},localStorage:{getItem(){return null},setItem(){}},document:{querySelector(){return {...element}},querySelectorAll(){return []},getElementById(){return element},addEventListener(type,handler){listeners[type]=handler},activeElement:{tagName:'BODY'}},window:{addEventListener(){},scrollTo(){}},setTimeout,clearTimeout};
vm.createContext(context);
vm.runInContext(fs.readFileSync('dist/app.js','utf8')+'\n globalThis.api={products,glossary,powerVaultQuestions,productTrainingView,productTrainingQuestions,productTrainingChapters,annotateTrainingText,state,lukasExpertise,expertiseView,productDetail};',context);
const a=context.api;
for(const p of a.products){
 const html=a.productTrainingView(p.id);
 assert.ok(html.includes(p.name),p.id);
 assert.ok(!html.includes('undefined'),p.id);
 for(let trial=0;trial<20;trial++)for(const q of a.productTrainingQuestions(p)){
  assert.equal(new Set(q.answers).size,q.answers.length,q.question);
  assert.ok(q.correct>=0&&q.correct<q.answers.length,q.question);
  assert.ok(q.explanation);
 }
}
assert.equal(a.powerVaultQuestions.length,12);
assert.equal(a.productTrainingChapters(a.products.find(p=>p.id==='powervault')).length,8);
assert.equal((a.productTrainingView('powervault').match(/<figure /g)||[]).length,4);
assert.ok(a.annotateTrainingText('ALUA a WWPN').includes('data-term="alua"'));
assert.equal(new Set(a.glossary.map(g=>g.id)).size,a.glossary.length);
assert.equal(a.lukasExpertise.dell.length,12);
assert.equal(new Set(a.lukasExpertise.dell.map(x=>x.productId)).size,12);
for(const item of a.lukasExpertise.dell) assert.ok(a.products.some(p=>p.id===item.productId),item.productId);
assert.equal(a.lukasExpertise.vmware.length,8);
assert.ok(a.expertiseView().includes('Interní kompetenční mapa'));
assert.ok(a.productDetail('powervault').includes('Malá praktická zkušenost'));
let prevented=false,scrolled=false;
element.scrollIntoView=()=>scrolled=true;
listeners.click({preventDefault(){prevented=true},target:{closest(selector){return selector==='.chapter-index a'?{getAttribute(){return '#product-chapter-powervault-2'}}:null}}});
assert.ok(prevented&&scrolled);
assert.equal(context.location.hash,'');
console.log(`PASS: ${a.products.length} courses render; unique answers; 12 PowerVault questions; 4 diagrams; glossary; chapter navigation.`);
