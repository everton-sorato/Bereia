const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const ctx={AbortController,DOMException,setTimeout,clearTimeout};vm.createContext(ctx);vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'../assets/js/scripture-store.js'),'utf8'),ctx);
const verses=[{number:1,text:'Texto de teste'}];
function setup(opts={}){const data=new Map(),storage={get:async k=>data.get(k),put:async(k,v)=>data.set(k,v),putBook:async(v,b,cs)=>cs.forEach((c,i)=>data.set(`${v}:${b}:${i+1}`,c)),entries:async()=>[...data].map(([key,verses])=>({key,verses}))};return {data,storage,api:ctx.BereiaScriptureFactory({storage,legacy:{getItem:()=>null},network:async()=>verses,...opts})}}
test('concurrent reader requests share one network request and persist the result',async()=>{let calls=0;const {api,data}=setup({network:async()=>{calls++;await new Promise(r=>setTimeout(r,5));return verses}});const results=await Promise.all([api.load('a','Gen',1),api.load('a','Gen',1)]);assert.equal(calls,1);assert.equal(results[0].saved,true);assert.equal(data.size,1)});
test('offline reads saved chapters and explains a missing chapter',async()=>{const {api,data}=setup({online:()=>false});data.set('a:Gen:1',verses);assert.equal((await api.load('a','Gen',1)).source,'device');await assert.rejects(api.load('a','Gen',2),/ainda não foi baixado/)});
test('invalid responses are rejected without saving; retry remains possible',async()=>{let calls=0;const {api,data}=setup({network:async()=>++calls===1?[]:verses});await assert.rejects(api.load('a','Gen',1),/inválido/);assert.equal(data.size,0);await api.load('a','Gen',1);assert.equal(data.size,1)});
test('storage quota failure preserves online reading with unsaved status',async()=>{const {api,storage}=setup();storage.put=async()=>{throw Error('quota')};const result=await api.load('a','Gen',1);assert.equal(result.saved,false);assert.equal(result.verses,verses)});
test('legacy chapters migrate without a network call',async()=>{const {api,data}=setup({legacy:{getItem:()=>JSON.stringify(verses)},network:async()=>{throw Error('unexpected')}});await api.load('a','Gen',1);assert.equal(data.size,1)});
test('incomplete whole-book response falls back and keeps existing chapters',async()=>{const requested=[];const {api,data}=setup({fetch:async()=>({ok:true,json:async()=>({chapters:[]})}),network:async(v,b,c)=>{requested.push(c);return verses}});data.set('a:Gen:1',verses);await api.downloadBook('a',['Gen','Gênesis',2]);assert.deepEqual(requested,[2]);assert.equal(data.size,2)});
test('complete whole-book response is saved in one transaction',async()=>{const {api,storage,data}=setup({fetch:async()=>({ok:true,json:async()=>({chapters:[{verses},{verses}]})})});let writes=0;const put=storage.putBook;storage.putBook=async(...args)=>{writes++;await put(...args)};await api.downloadBook('a',['Gen','Gênesis',2]);assert.equal(writes,1);assert.equal(data.size,2)});
test('paused download retains chapters and resume requests only the remainder',async()=>{const controller=new AbortController(),requested=[];const {api,data}=setup({network:async(v,b,c)=>{requested.push(c);return verses}});await assert.rejects(api.downloadBook('bpm',['Tob','Tobias',3],{signal:controller.signal,onProgress:n=>{if(n===1)controller.abort()}}),{name:'AbortError'});assert.equal(data.size,1);await api.downloadBook('bpm',['Tob','Tobias',3]);assert.deepEqual(requested,[1,2,3]);assert.equal(data.size,3)});

test('translation inventory counts only valid chapters belonging to its edition and canon',async()=>{
 const {api,data}=setup();
 data.set('a:Gen:1',verses);
 data.set('a:Gen:3',verses);
 data.set('a:Gen:0',verses);
 data.set('a:Gen:9',verses);
 data.set('a:Tob:1',verses);
 data.set('b:Gen:2',verses);
 data.set('a:Gen:2',[]);
 const state=await api.translationInventory('a',[['Gen','Gênesis',3]]);
 assert.equal(state.savedChapters,2);
 assert.equal(state.completeBooks,0);
 assert.equal(state.totalChapters,3);
});

test('whole translation download resumes sparse chapters across books and preserves other editions',async()=>{
 const controller=new AbortController(),requested=[];
 const {api,data}=setup({network:async(v,b,c)=>{requested.push(b+':'+c);return verses}});
 const books=[['Tob','Tobias',3],['Dan','Daniel',2]];
 data.set('bpm:Tob:3',verses);
 data.set('bpm:Dan:2',verses);
 data.set('kjv:Gen:1',verses);
 await assert.rejects(api.downloadTranslation('bpm',books,{
  signal:controller.signal,
  onProgress:state=>{if(state.savedChapters===3)controller.abort()}
 }),{name:'AbortError'});
 assert.equal((await api.translationInventory('bpm',books)).savedChapters,3);
 const progress=[];
 const result=await api.downloadTranslation('bpm',books,{onProgress:state=>progress.push(state.savedChapters)});
 assert.deepEqual(requested,['Tob:1','Tob:2','Dan:1']);
 assert.equal(result.savedChapters,5);
 assert.equal(result.completeBooks,2);
 assert.equal(progress[0],3);
 assert.ok(progress.every((n,i)=>!i||n>=progress[i-1]));
 assert.equal(data.get('kjv:Gen:1'),verses);
});

test('each supported translation downloads its complete reader catalogue and opens every saved chapter offline',async()=>{
 const source=fs.readFileSync(require('node:path').join(__dirname,'../assets/js/00-core.js'),'utf8');
 const catalogue={};
 vm.runInNewContext(source.slice(source.indexOf('const bibleBooks='),source.indexOf('let activeReaderBooks='))+';this.books=readerBooks;',catalogue);
 for(const version of ['almeida-livre','alm1911','kjv','bpm']){
  const books=catalogue.books(version);
  let online=true;
  const {api,data}=setup({
   online:()=>online,
   fetch:async url=>{
    const osis=decodeURIComponent(url.split('/').pop().replace('.json',''));
    const book=books.find(row=>row[0]===osis);
    return {ok:true,json:async()=>({chapters:Array.from({length:book[2]},()=>({verses}))})};
   }
  });
  const result=await api.downloadTranslation(version,books);
  assert.equal(result.totalBooks,version==='bpm'?73:66,version);
  assert.equal(result.completeBooks,result.totalBooks,version);
  assert.equal(result.savedChapters,books.reduce((sum,book)=>sum+book[2],0),version);
  assert.equal(data.size,result.totalChapters,version);
  online=false;
  for(const [osis,,total] of books){
   for(let chapter=1;chapter<=total;chapter++){
    assert.equal((await api.load(version,osis,chapter)).source,'device',version+' '+osis+' '+chapter);
   }
  }
 }
});
