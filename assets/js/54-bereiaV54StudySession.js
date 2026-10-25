
(function(){
 const BUILD='V54',KEY='bereia:studySession:v1';
 let currentTool={message:null,context:null};
 function loadStored(){try{return JSON.parse(localStorage.getItem(KEY)||localStorage.getItem('bereia:lastVerse')||'null')}catch(e){return null}}
 function getCurrent(){
   if(window.selectedVerse?.book)return window.selectedVerse;
   const m=window.BEREIA_VERSE_ACTIONS?.selected;
   if(m&&m.size)return Array.from(m.values()).sort((a,b)=>a.bookIndex-b.bookIndex||a.chapter-b.chapter||a.verse-b.verse)[0];
   return loadStored();
 }
 function ref(v){return v?((v.book||'')+' '+(v.chapter||'')+':'+(v.verse||'')).trim():'Nenhuma passagem selecionada'}
 function saveCurrent(v){
   if(!v)return;
   window.selectedVerse=v;
   try{localStorage.setItem('bereia:lastVerse',JSON.stringify(v));localStorage.setItem(KEY,JSON.stringify(v))}catch(e){}
   const sr=document.getElementById('selectedRef');if(sr)sr.textContent=ref(v);
   const m=window.BEREIA_VERSE_ACTIONS?.selected;
   if(m&&typeof m.clear==='function'){
     m.clear();
     const id=v.id||((v.osis||v.bookIndex)+':'+v.chapter+':'+v.verse);
     v.id=id;m.set(id,v);
   }
   document.dispatchEvent(new CustomEvent('bereia:studyverse',{detail:v}));
 }
 async function chapterData(bi,ch,version){
   const b=window.bibleBooks?.[bi]||bibleBooks?.[bi];if(!b)return [];
   const ver=version||document.getElementById('bibleVersion')?.value||'almeida-livre';
   const key='bereia:bible:v4:'+ver+':'+b[0]+':'+ch;
   try{const x=JSON.parse(localStorage.getItem(key)||'null');if(Array.isArray(x)&&x.length)return x}catch(e){}
   try{
     if(typeof fetchChapterFromSources==='function'){
       const x=await fetchChapterFromSources(ver,b[0],ch);
       if(Array.isArray(x)&&x.length){try{localStorage.setItem(key,JSON.stringify(x))}catch(e){}return x}
     }
   }catch(e){}
   return [];
 }
 async function navigate(delta){
   const v=getCurrent();if(!v)return typeof toast==='function'?toast('Selecione um versículo primeiro'):null;
   setBusy(true);
   try{
     let bi=Number.isInteger(Number(v.bookIndex))?Number(v.bookIndex):-1;
     if(bi<0&&Array.isArray(window.bibleBooks||bibleBooks))bi=(window.bibleBooks||bibleBooks).findIndex(b=>b[1]===v.book||b[0]===v.osis);
     const books=window.bibleBooks||bibleBooks;if(bi<0||!books?.[bi])return;
     let ch=Number(v.chapter),vn=Number(v.verse),ver=v.version||document.getElementById('bibleVersion')?.value||'almeida-livre';
     let verses=await chapterData(bi,ch,ver);
     if(!verses.length)return typeof toast==='function'?toast('Não foi possível carregar o capítulo'):null;
     let targetNo=vn+delta;
     if(targetNo<1){
       if(ch>1){ch--;verses=await chapterData(bi,ch,ver);targetNo=verses.length?Number(verses[verses.length-1].number):1}
       else if(bi>0){bi--;ch=books[bi][2];verses=await chapterData(bi,ch,ver);targetNo=verses.length?Number(verses[verses.length-1].number):1}
       else return typeof toast==='function'?toast('Você está no início da Bíblia'):null;
     }else{
       const last=verses.length?Number(verses[verses.length-1].number):0;
       if(last&&targetNo>last){
         if(ch<books[bi][2]){ch++;verses=await chapterData(bi,ch,ver);targetNo=1}
         else if(bi<books.length-1){bi++;ch=1;verses=await chapterData(bi,ch,ver);targetNo=1}
         else return typeof toast==='function'?toast('Você chegou ao fim da Bíblia'):null;
       }
     }
     const vv=verses.find(x=>Number(x.number)===targetNo);if(!vv)return;
     const b=books[bi],next={bookIndex:bi,book:b[1],osis:b[0],chapter:ch,verse:targetNo,text:vv.text||'',version:ver,id:b[0]+':'+ch+':'+targetNo};
     saveCurrent(next);
     syncBibleControls(next);
     refreshOpenTool();
   } finally {setBusy(false)}
 }
 function syncBibleControls(v){
   try{
     const bb=document.getElementById('bibleBook'),bc=document.getElementById('bibleChapter');
     if(bb){bb.value=v.bookIndex;if(typeof renderChapterOptions==='function')renderChapterOptions(v.chapter)}
     if(bc)bc.value=v.chapter;
   }catch(e){}
 }
 function trailHTML(){return '<div class="b54TrailMain"><small>Estudando agora</small><b data-b54-ref>Nenhuma passagem</b><span data-b54-text>Selecione um versículo para iniciar uma sessão de estudo.</span></div><div class="b54TrailNav"><button type="button" data-b54-prev aria-label="Versículo anterior">‹</button><button type="button" data-b54-next aria-label="Próximo versículo">›</button></div>'}
 function makeTrail(id){
   const d=document.createElement('div');d.className='b54Trail';d.dataset.b54=id;d.innerHTML=trailHTML();
   d.addEventListener('click',e=>{if(e.target.closest('[data-b54-prev]'))navigate(-1);if(e.target.closest('[data-b54-next]'))navigate(1)});
   return d;
 }
 function ensureScreenTrail(id){
   const s=document.getElementById(id);if(!s||s.querySelector(':scope > .b54Trail'))return;
   const h=s.querySelector('h1');const d=makeTrail(id);if(h)h.insertAdjacentElement('afterend',d);else s.prepend(d);
 }
 function ensureModalTrail(id){
   const modal=document.getElementById(id),shell=modal?.querySelector('.b52Shell,.b48Shell');if(!shell||shell.querySelector(':scope > .b54Trail'))return;
   const head=shell.querySelector('.b52Head,.b48Head');const d=makeTrail(id);if(head)head.insertAdjacentElement('afterend',d);else shell.prepend(d);
 }
 function updateTrails(){
   const v=getCurrent();
   document.querySelectorAll('.b54Trail').forEach(t=>{
     const r=t.querySelector('[data-b54-ref]'),x=t.querySelector('[data-b54-text]');
     if(r)r.textContent=v?ref(v):'Nenhuma passagem selecionada';
     if(x)x.textContent=v?(v.text||''):'Selecione um versículo para iniciar uma sessão de estudo.';
   });
 }
 function setBusy(on){document.querySelectorAll('.b54Trail').forEach(t=>t.classList.toggle('busy',!!on))}
 function refreshOpenTool(){
   updateTrails();
   const active=document.querySelector('.screen.active')?.id;
   try{
     if(active==='dossier53')window.BEREIA_CORE_V53?.render?.();
     else if(active==='originals'&&typeof renderOriginals==='function')renderOriginals();
     else if(active==='study'&&typeof renderStudyVerse==='function')renderStudyVerse();
     else if(active==='compare'&&typeof loadComparison==='function'){const v=getCurrent();if(v)loadComparison(v)}
     else if(active==='geography')window.BEREIA_GEO_ARCH_V51?.renderGeo?.();
     else if(active==='archaeology')window.BEREIA_GEO_ARCH_V51?.renderArchaeology?.();
     else if(active==='maps')window.BEREIA_GEO_ARCH_V51?.mapContext?.();
   }catch(e){}
   if(document.getElementById('b52MessageModal')?.classList.contains('open')&&currentTool.message)window.BEREIA_V52?.openMessage?.(currentTool.message);
   if(document.getElementById('b52ContextModal')?.classList.contains('open')&&currentTool.context)window.BEREIA_V52?.openContext?.(currentTool.context);
   if(document.getElementById('b48ImageModal')?.classList.contains('open')){try{window.BEREIA_STUDY_CREATE?.openImage?.()}catch(e){}}
 }
 function hookTools(){
   if(window.BEREIA_V52&&!window.BEREIA_V52.__v54){
     const om=window.BEREIA_V52.openMessage,oc=window.BEREIA_V52.openContext;
     window.BEREIA_V52.openMessage=function(k){currentTool.message=k;currentTool.context=null;const r=om.apply(this,arguments);setTimeout(updateTrails,0);return r};
     window.BEREIA_V52.openContext=function(k){currentTool.context=k;currentTool.message=null;const r=oc.apply(this,arguments);setTimeout(updateTrails,0);return r};
     window.BEREIA_V52.__v54=true;
   }
 }
 function hookSelection(){
   const old=window.selectRealVerse;if(typeof old==='function'&&!old.__v54){
     const wrapped=function(){const r=old.apply(this,arguments);const v=typeof selectedVerse!=='undefined'?selectedVerse:(window.selectedVerse||getCurrent());if(v){window.selectedVerse=v;try{localStorage.setItem('bereia:lastVerse',JSON.stringify(v));localStorage.setItem(KEY,JSON.stringify(v))}catch(e){}document.dispatchEvent(new CustomEvent('bereia:studyverse',{detail:v}))}updateTrails();return r};wrapped.__v54=true;window.selectRealVerse=wrapped;
   }
 }
 function hookGo(){
   const old=window.go;if(typeof old==='function'&&!old.__v54){
     const wrapped=function(){const r=old.apply(this,arguments);setTimeout(()=>{updateTrails();refreshOpenTool()},0);return r};wrapped.__v54=true;window.go=wrapped;
   }
 }
 function ensureAll(){
   ['dossier53','study','originals','compare','geography','archaeology','maps'].forEach(ensureScreenTrail);
   ['b52MessageModal','b52ContextModal','b48ImageModal'].forEach(ensureModalTrail);
   hookTools();hookSelection();hookGo();updateTrails();
   const b=document.getElementById('bereiaBuildBadge');if(b)b.textContent='BEREIA • '+BUILD;
 }
 const stored=loadStored();if(stored?.book&&!window.selectedVerse)window.selectedVerse=stored;
 document.addEventListener('bereia:studyverse',updateTrails);
 window.BEREIA_STUDY_SESSION={getCurrent,navigate,saveCurrent,refresh:refreshOpenTool,ensure:ensureAll};
 
 window.addEventListener('load',()=>{setTimeout(ensureAll,250);setTimeout(ensureAll,900);setTimeout(ensureAll,1800)});setTimeout(ensureAll,700);
})();
