const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const listeners = {};
const element = {innerHTML:'',textContent:'',value:'',style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false;}},addEventListener(){},setAttribute(){},focus(){},scrollIntoView(){},showModal(){},close(){}};
const context = {console,location:{hash:''},localStorage:{getItem(){return null},setItem(){}},document:{querySelector(){return {...element}},querySelectorAll(){return []},getElementById(){return element},addEventListener(type,handler){listeners[type]=handler},activeElement:{tagName:'BODY'}},window:{addEventListener(){},scrollTo(){}},setTimeout,clearTimeout};
vm.createContext(context);
vm.runInContext(fs.readFileSync('dist/app.js','utf8')+'\n globalThis.api={products,glossary,trainingBlocks,powerVaultQuestions,productTrainingView,productTrainingQuestions,productTrainingChapters,annotateTrainingText,state,lukasExpertise,expertiseView,productDetail,chapterQuestions,chapterUnlocked,completedChapterCount,chapterProgressKey,trainingBlockView};',context);
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
assert.equal((a.productTrainingView('powervault',3).match(/<figure /g)||[]).length,0,'locked chapter falls back to first open chapter');
assert.ok(a.productTrainingView('powervault').includes('kapitola 1 z 8'));
assert.ok(!a.productTrainingView('powervault').includes('kapitola 2 z 8'));
const pvChapters=a.productTrainingChapters(a.products.find(p=>p.id==='powervault'));
for(const [i,chapter] of pvChapters.entries()){
 const questions=a.chapterQuestions(chapter[0],chapter[1],chapter[2],chapter[3],pvChapters,`pv-${i}`);
 assert.equal(questions.length,5);
 for(const q of questions){assert.equal(new Set(q.answers).size,4);assert.ok(q.correct>=0&&q.correct<4);}
}
for(const chapters of [...a.products.map(a.productTrainingChapters),...a.trainingBlocks.map(b=>b.chapters)])for(const [i,chapter] of chapters.entries()){
 const questions=a.chapterQuestions(chapter[0],chapter[1],chapter[2],chapter[3],chapters,`all-${i}`);
 assert.equal(questions.length,5);
 for(const q of questions)assert.equal(new Set(q.answers).size,4,q.question);
}
assert.equal(a.completedChapterCount('product','powervault',8),0);
assert.equal(a.chapterUnlocked('product','powervault',1),false);
a.state.chapterProgress[a.chapterProgressKey('product','powervault',0)]={best:80,passed:true};
assert.equal(a.chapterUnlocked('product','powervault',1),true);
assert.equal(a.completedChapterCount('product','powervault',8),1);
for(let i=1;i<3;i++)a.state.chapterProgress[a.chapterProgressKey('product','powervault',i)]={best:80,passed:true};
assert.equal((a.productTrainingView('powervault',3).match(/<figure /g)||[]).length,1);
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
