
(function(){
 function norm(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim()}
 window.openDailyVerse=async function(){
  const d=(typeof bereiaDailyToday==='function'?bereiaDailyToday():null)||(typeof DAILY!=='undefined'?DAILY[0]:null);if(!d)return;
  document.body.classList.add('simpleBibleOpen');if(typeof go==='function')go('bible');
  const book=document.getElementById('bibleBook'),chapter=document.getElementById('bibleChapter');
  if(!book||!chapter)return;
  let idx=-1;
  if(typeof bibleBooks!=='undefined')idx=bibleBooks.findIndex(x=>norm(x[1])===norm(d.book));
  if(idx<0)idx=Array.from(book.options).findIndex(o=>norm(o.textContent)===norm(d.book));
  if(idx>=0)book.value=String(idx);
  if(typeof renderChapterOptions==='function')renderChapterOptions(Number(d.chapter)||1);
  chapter.value=String(Number(d.chapter)||1);
  const verses=typeof loadChapter==='function'?await loadChapter(false):[];
  const el=document.querySelector('#bibleReader [data-verse="'+Number(d.verse)+'"]');
  if(el){if(typeof selectRealVerse==='function')selectRealVerse(el,Number(d.verse));el.scrollIntoView({behavior:'smooth',block:'center'});}
  else document.getElementById('bibleReader')?.scrollIntoView({behavior:'smooth',block:'start'});
 };
 const cath={
 "Tobias":["TOB",14],"Judite":["JDT",16],"Sabedoria":["WIS",19],"Eclesiástico (Sirácida)":["SIR",51],"Baruc":["BAR",6],"1 Macabeus":["1MA",16],"2 Macabeus":["2MA",15],"Adições a Ester":["ESG",16],"Adições a Daniel":["DAG",14]
 };
 const ancient={
 "1 Enoque":"https://sacred-texts.com/bib/boe/","Jubileus":"https://sacred-texts.com/bib/jub/","1 Esdras":"https://ebible.org/eng-web/1ES.htm","Oração de Manassés":"https://ebible.org/eng-web/MAN.htm","Salmo 151":"https://ebible.org/eng-web/PS2.htm","3 Macabeus":"https://ebible.org/eng-web/3MA.htm","4 Macabeus":"https://ebible.org/eng-web/4MA.htm","Salmos de Salomão":"https://sacred-texts.com/bib/"
 };
 function panel(html){const box=document.getElementById('bereiaStudyPanel');if(!box)return;box.innerHTML=html;box.classList.add('show');box.hidden=false;box.style.setProperty('display','block','important');setTimeout(()=>box.scrollIntoView({behavior:'smooth',block:'start'}),30)}
 window.bereiaSetLibrary=function(mode){
  window.BEREIA_LIBRARY_MODE=mode;document.body.classList.remove('simpleBibleOpen');
  document.querySelectorAll('.bereia-library-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.lib===mode));
  const info=document.getElementById('bereiaLibraryInfo');if(info&&window.BEREIA_LIBRARIES?.[mode])info.textContent=BEREIA_LIBRARIES[mode].desc;
  if(mode==='protestant'){panel('<div class="bereia-v34-card"><h3>📖 Bíblia — 66 livros</h3><p>Abra o leitor para escolher o livro e capítulo.</p><a href="#" onclick="event.preventDefault();openSimpleBible()">Abrir Bíblia</a></div>');return}
  const arr=mode==='catholic'?window.BEREIA_CATHOLIC_BOOKS:window.BEREIA_ANCIENT_BOOKS;
  panel('<div class="bereia-v34-card"><h3>'+(mode==='catholic'?'✝ Bíblia Católica — Deuterocanônicos':'📜 Apócrifos e Literatura Antiga')+'</h3><p>Toque em um livro para abrir as opções de leitura.</p></div>'+bereiaExtraBooks(mode));
 };
 window.bereiaOpenExtraBook=function(mode,i){
  const arr=mode==='catholic'?window.BEREIA_CATHOLIC_BOOKS:window.BEREIA_ANCIENT_BOOKS,item=arr?.[i];if(!item)return;
  const name=item[0],desc=item[1];
  if(mode==='catholic'){
   const d=cath[name];if(!d)return panel('<div class="bereia-v34-card"><h3>'+name+'</h3><p>'+desc+'</p><p>Fonte de leitura ainda em preparação.</p></div>');
   const opts=Array.from({length:d[1]},(_,j)=>'<option value="'+(j+1)+'">Capítulo '+(j+1)+'</option>').join('');
   panel('<div class="bereia-v34-card"><h3>✝ '+name+'</h3><p>'+desc+'</p><select id="v34chap" style="min-height:46px;background:#1b211b;color:#fff;border:1px solid #5a4b2d;border-radius:10px;padding:8px">'+opts+'</select><div style="margin-top:10px"><a id="v34read" target="_blank" rel="noopener noreferrer" href="https://ebible.org/porbrbsl/'+d[0]+'01.htm">📖 Ler capítulo</a></div><p>Texto em português de fonte pública externa. A leitura integrada será feita sem iframe para evitar página branca.</p></div>'+bereiaExtraBooks(mode));
   const s=document.getElementById('v34chap'),a=document.getElementById('v34read');s?.addEventListener('change',()=>a.href='https://ebible.org/porbrbsl/'+d[0]+String(s.value).padStart(2,'0')+'.htm');
  }else{
   panel('<div class="bereia-v34-card"><h3>📜 '+name+'</h3><p>'+desc+'</p><a target="_blank" rel="noopener noreferrer" href="'+(ancient[name]||'https://ebible.org/')+'">Consultar obra ↗</a><p>A classificação e a tradição da obra permanecem identificadas separadamente da Bíblia de 66 livros.</p></div>'+bereiaExtraBooks(mode));
  }
 };
 window.addEventListener('load',()=>{const b=document.getElementById('bereiaBuildBadge');if(b)b.textContent='BEREIA • V34';});
})();
