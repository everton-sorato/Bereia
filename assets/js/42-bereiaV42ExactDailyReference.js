
(function(){
 const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
 function visibleTarget(){
   const shown=(document.getElementById('bdcRef')?.textContent||document.getElementById('dailyRef')?.textContent||'').trim();
   const fallback=(typeof bereiaDailyToday==='function'?bereiaDailyToday():window.dailyCurrent)||{};
   const ref=shown||String(fallback.ref||'').trim();
   const m=ref.match(/^(.+?)\s+(\d+):(\d+)(?:[-–]\d+)?$/);
   if(!m)return null;
   return {ref,bookName:m[1].trim(),chapter:Number(m[2]),verse:Number(m[3]),data:fallback};
 }
 function selectExactBook(name){
   const book=document.getElementById('bibleBook');if(!book)return -1;
   const opts=Array.from(book.options);let idx=opts.findIndex(o=>norm(o.textContent)===norm(name));
   if(idx<0&&typeof bibleBooks!=='undefined')idx=bibleBooks.findIndex(b=>norm(b[1])===norm(name));
   if(idx<0)return -1;
   book.selectedIndex=idx;
   if(book.options[idx])book.value=book.options[idx].value;
   return idx;
 }
 const oldRender=window.renderBibleVerses;
 if(typeof oldRender==='function'){
   window.renderBibleVerses=function(book,ch,verses){
     const sel=document.getElementById('bibleBook'),cap=document.getElementById('bibleChapter');
     const current=sel&&typeof bibleBooks!=='undefined'?bibleBooks[Number(sel.value)]:null;
     if(current&&book&&current[0]!==book[0])return;
     if(cap&&Number(cap.value)!==Number(ch))return;
     return oldRender.apply(this,arguments);
   };
 }
 async function openExact(){
   const t=visibleTarget();if(!t)return null;
   document.body.classList.add('simpleBibleOpen');if(typeof go==='function')go('bible');
   const book=document.getElementById('bibleBook'),chapter=document.getElementById('bibleChapter');if(!book||!chapter)return null;
   const idx=selectExactBook(t.bookName);if(idx<0)return null;
   if(norm(book.options[book.selectedIndex]?.textContent)!==norm(t.bookName)){selectExactBook(t.bookName);}
   if(typeof renderChapterOptions==='function')renderChapterOptions(t.chapter);
   chapter.value=String(t.chapter);
   if(typeof loadChapter==='function')await loadChapter(false);
   const verify=async()=>{
     if(norm(book.options[book.selectedIndex]?.textContent)!==norm(t.bookName)){
       selectExactBook(t.bookName);if(typeof renderChapterOptions==='function')renderChapterOptions(t.chapter);chapter.value=String(t.chapter);if(typeof loadChapter==='function')await loadChapter(false);
     }
     const title=document.getElementById('readingTitle')?.textContent||'';
     if(!norm(title).startsWith(norm(t.bookName+' '+t.chapter))){
       selectExactBook(t.bookName);if(typeof renderChapterOptions==='function')renderChapterOptions(t.chapter);chapter.value=String(t.chapter);if(typeof loadChapter==='function')await loadChapter(false);
     }
     const el=document.querySelector('#bibleReader [data-verse="'+t.verse+'"]');
     if(el){if(typeof selectRealVerse==='function')selectRealVerse(el,t.verse);el.scrollIntoView({behavior:'smooth',block:'center'});}
     return {...t,el};
   };
   let result=await verify();
   setTimeout(()=>verify(),700);
   setTimeout(()=>verify(),1600);
   return result;
 }
 window.openDailyVerse=openExact;
 window.bereiaOpenDailyDeep=async function(){
   const t=await openExact();if(!t?.el)return;
   if(typeof selectBereiaVerse==='function')selectBereiaVerse(t.el);
   if(typeof bereiaSelected!=='undefined'){
     bereiaSelected.book=t.bookName;bereiaSelected.chapter=t.chapter;bereiaSelected.verse=t.verse;bereiaSelected.ref=t.ref;
     const vt=t.el.querySelector('.verseText,.vt,.verse-text');bereiaSelected.text=(vt?.textContent||t.data?.text||'').trim();
   }
   const label=document.getElementById('deepSelectionText');if(label)label.textContent=t.ref;
   if(typeof openOriginalStudy==='function')openOriginalStudy();
 };
 function wire(){
   const b=document.getElementById('bereiaDailyDeepBtn');if(b)b.onclick=e=>{e.stopPropagation();window.bereiaOpenDailyDeep()};
   const badge=document.getElementById('bereiaBuildBadge');if(badge)b.textContent='BEREIA • V42';
 }
 
 window.addEventListener('load',wire);setTimeout(wire,300);
})();
