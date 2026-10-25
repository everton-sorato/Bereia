
(function(){
 const ptCodes={"Tobias":"TOB","Judite":"JDT","Sabedoria":"WIS","Eclesiástico (Sirácida)":"SIR","Baruc":"BAR","1 Macabeus":"1MA","2 Macabeus":"2MA","Adições a Ester":"ESG","Adições a Daniel":"DAG"};
 const ancientLinks={
 "1 Enoque":"https://sacred-texts.com/bib/boe/",
 "Jubileus":"https://sacred-texts.com/bib/jub/",
 "1 Esdras":"https://ebible.org/eng-web/1ES.htm",
 "Oração de Manassés":"https://ebible.org/eng-web/MAN.htm",
 "Salmo 151":"https://ebible.org/eng-web/PS2.htm",
 "3 Macabeus":"https://ebible.org/eng-web/3MA.htm",
 "4 Macabeus":"https://ebible.org/eng-web/4MA.htm",
 "Salmos de Salomão":"https://sacred-texts.com/bib/"
 };
 function showPanel(html){
  let box=document.getElementById('bereiaStudyPanel');
  if(!box){box=document.createElement('section');box.id='bereiaStudyPanel';document.getElementById('bereiaLibrarySwitch')?.insertAdjacentElement('afterend',box)}
  if(!box)return;
  box.innerHTML=html;box.classList.add('show');box.hidden=false;box.style.display='block';
  box.scrollIntoView({behavior:'smooth',block:'start'});
 }
 function escapeText(s){return String(s||'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
 function chapterLink(book,ch){return 'https://ebible.org/porbrbsl/'+ptCodes[book]+String(ch).padStart(2,'0')+'.htm'}
 window.bereiaOpenExtraBook=function(mode,i){
  const isCath=mode==='catholic',arr=isCath?window.BEREIA_CATHOLIC_BOOKS:window.BEREIA_ANCIENT_BOOKS;
  const item=arr?.[i];if(!item)return;
  const name=item[0],desc=item[1];
  if(isCath){
   const code=ptCodes[name],chapters=window.BEREIA_WEBC?.[name]?.chapters||1;
   const selector=code?'<label for="bereiaExtraChapter">Escolha o capítulo</label><br><select id="bereiaExtraChapter" style="padding:12px;border-radius:10px;background:#202720;color:#fff;margin:8px 0;min-width:180px">'+Array.from({length:chapters},(_,j)=>'<option value="'+(j+1)+'">Capítulo '+(j+1)+'</option>').join('')+'</select>':'';
   showPanel('<div class="bereia-library-reader"><h3>'+escapeText(name)+'</h3><p>'+escapeText(desc)+'</p><p>Leitura em português — Bíblia Portuguesa Mundial (domínio público, tradução em revisão).</p>'+selector+'<div><a class="bereia-primary-link" id="bereiaExtraRead" href="'+(code?chapterLink(name,1):'https://ebible.org/porbrbsl/')+'" target="_blank" rel="noopener noreferrer">📖 Abrir capítulo para leitura ↗</a></div><p class="bereia-reader-hint">O capítulo abre em uma página de leitura, sem tela branca. Estamos preparando a leitura integrada ao BEREIA.</p></div>'+bereiaExtraBooks(mode));
   const sel=document.getElementById('bereiaExtraChapter');if(sel)sel.addEventListener('change',()=>{document.getElementById('bereiaExtraRead').href=chapterLink(name,Number(sel.value))});
  }else{
   const url=ancientLinks[name]||'https://ebible.org/';
   showPanel('<div class="bereia-library-reader"><h3>'+escapeText(name)+'</h3><p>'+escapeText(desc)+'</p><p>Obra de literatura bíblica antiga. As tradições canônicas variam; a edição em português ainda não está integrada.</p><a class="bereia-primary-link" href="'+url+'" target="_blank" rel="noopener noreferrer">📜 Consultar texto e fonte ↗</a><p class="bereia-reader-hint">A fonte externa pode estar em inglês. A leitura integral dentro do aplicativo será adicionada após conferência da edição e de seus direitos.</p></div>'+bereiaExtraBooks(mode));
  }
 };
 window.bereiaSetLibrary=function(mode){
  if(!window.BEREIA_LIBRARIES?.[mode])return;
  window.BEREIA_LIBRARY_MODE=mode;
  document.querySelectorAll('.bereia-library-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.lib===mode));
  const info=document.getElementById('bereiaLibraryInfo');if(info)info.textContent=BEREIA_LIBRARIES[mode].desc;
  if(mode==='protestant'){document.getElementById('bereiaStudyPanel')?.classList.remove('show');if(typeof openSimpleBible==='function')openSimpleBible();return}
  const title=mode==='catholic'?'Livros da Bíblia Católica':'Apócrifos e literatura antiga';
  showPanel('<h3>'+title+'</h3><p>Escolha um livro para consultar.</p>'+bereiaExtraBooks(mode));
 };
 window.openDailyVerse=async function(){
  const d=typeof bereiaApplyDaily==='function'?bereiaApplyDaily():(typeof DAILY!=='undefined'?DAILY[0]:null);
  if(!d)return;
  if(typeof openSimpleBible==='function')openSimpleBible();else {document.body.classList.add('simpleBibleOpen');if(typeof go==='function')go('bible')}
  const book=document.getElementById('bibleBook'),chapter=document.getElementById('bibleChapter');
  if(!book||!chapter)return;
  const wanted=String(d.book||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const opt=Array.from(book.options).find(o=>[o.value,o.textContent].some(v=>String(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()===wanted));
  if(opt)book.value=opt.value;
  if(typeof bookChanged==='function')bookChanged();
  if(typeof renderChapterOptions==='function')renderChapterOptions(Number(d.chapter));
  chapter.value=String(d.chapter);
  if(typeof loadChapter==='function')await loadChapter(false);
  const reader=document.getElementById('bibleReader');
  let count=0;const locate=()=>{const el=reader?.querySelector('.v[data-verse="'+d.verse+'"],[data-verse="'+d.verse+'"]');if(el){el.scrollIntoView({behavior:'smooth',block:'center'});el.style.outline='2px solid #dfbd66';return}if(count++<12)setTimeout(locate,250)};
  setTimeout(locate,100);
 };
 window.addEventListener('load',()=>{const badge=document.getElementById('bereiaBuildBadge');if(badge)badge.textContent='BEREIA • V33'});
})();
