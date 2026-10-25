
(function(){
 function norm(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()}
 function dailyTarget(){
   const d=(typeof bereiaDailyToday==='function'?bereiaDailyToday():null)||(window.dailyCurrent||null);if(!d)return null;
   let bookName='',chapter=Number(d.chapter)||0,verse=Number(d.verse)||0;
   const ref=String(d.ref||'').trim(),m=ref.match(/^(.+?)\s+(\d+):(\d+)$/);
   if(m){bookName=m[1].trim();chapter=Number(m[2]);verse=Number(m[3]);}
   if(!bookName&&typeof d.book==='string')bookName=d.book;
   if(!bookName&&typeof bibleBooks!=='undefined'&&Number.isFinite(Number(d.book))){
     const canonical=Number(d.book)-1;if(bibleBooks[canonical])bookName=bibleBooks[canonical][1];
   }
   let index=-1;if(typeof bibleBooks!=='undefined')index=bibleBooks.findIndex(x=>norm(x[1])===norm(bookName));
   return {data:d,bookName,chapter,verse,index,ref:(bookName&&chapter&&verse)?bookName+' '+chapter+':'+verse:ref};
 }
 async function openTarget(){
   const t=dailyTarget();if(!t)return null;
   document.body.classList.add('simpleBibleOpen');if(typeof go==='function')go('bible');
   const book=document.getElementById('bibleBook'),chapter=document.getElementById('bibleChapter');if(!book||!chapter||t.index<0)return t;
   book.value=String(t.index);if(typeof renderChapterOptions==='function')renderChapterOptions(t.chapter);chapter.value=String(t.chapter);
   if(typeof loadChapter==='function')await loadChapter(false);
   const el=document.querySelector('#bibleReader [data-verse="'+t.verse+'"]');
   if(el){if(typeof selectRealVerse==='function')selectRealVerse(el,t.verse);el.scrollIntoView({behavior:'smooth',block:'center'});}
   return {...t,el};
 }
 window.openDailyVerse=async function(){return openTarget()};
 window.bereiaOpenDailyDeep=async function(){
   const t=await openTarget();if(!t?.el)return;
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
   const badge=document.getElementById('bereiaBuildBadge');if(badge)badge.textContent='BEREIA • V37';
 }
 window.addEventListener('load',wire);setTimeout(wire,400);
})();
