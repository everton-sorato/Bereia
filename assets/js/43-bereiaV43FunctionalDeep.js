
(function(){
 const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
 function selected(){return typeof bereiaSelected!=='undefined'?bereiaSelected:null}
 function eventFor(s){return (window.BEREIA_PASSAGE_EVENTS||[]).find(x=>x.book===s.book&&Number(s.chapter)>=Number(x.from)&&Number(s.chapter)<=Number(x.to))}
 function sourceFor(s){return (window.BEREIA_PASSAGE_SOURCES||[]).filter(x=>x[0]===s.book&&Number(s.chapter)>=Number(x[1])&&Number(s.chapter)<=Number(x[2]))}
 function ensurePane(id,after){
   let el=document.getElementById(id);
   if(!el){el=document.createElement('section');el.id=id;el.className='v43-pane';after.insertAdjacentElement('afterend',el)}
   el.classList.add('v43-pane');return el;
 }
 function build(){
   const modal=document.getElementById('bereiaOriginalModal'),verse=document.getElementById('bomVerse'),s=selected();if(!modal||!verse||!s)return;
   let nav=document.getElementById('bereiaStudyNavV36');
   if(!nav){nav=document.createElement('nav');nav.id='bereiaStudyNavV36';verse.insertAdjacentElement('beforebegin',nav)}
   const clean=nav.cloneNode(false);clean.id='bereiaStudyNavV36';
   clean.innerHTML='<button type="button" data-v43="guide">Estudo guiado</button><button type="button" data-v43="meaning">Significado</button><button type="button" data-v43="original">Original</button><button type="button" data-v43="context">Contexto</button><button type="button" data-v43="history">História & Arqueologia</button>';
   nav.replaceWith(clean);nav=clean;

   const meaning=document.getElementById('v36Meaning')||ensurePane('v36Meaning',verse);
   meaning.classList.add('v43-pane');
   const guide=document.getElementById('v40GuidedStudy')||ensurePane('v43Guide',meaning);
   guide.classList.add('v43-pane');
   if(!guide.innerHTML.trim()){
     guide.innerHTML='<div class="v43-section"><div class="v43-card"><strong>1. Observe o texto</strong>'+esc(s.text)+'</div><div class="v43-card"><strong>2. Leia o contexto</strong>Veja o capítulo ao redor do versículo antes de formular uma conclusão.</div><div class="v43-card"><strong>3. Compare as camadas</strong>Use Significado, Original, Contexto e História & Arqueologia para avançar sem misturar interpretação com evidência.</div></div>';
   }

   const context=ensurePane('v43Context',guide),history=ensurePane('v43History',context);
   const bc=typeof bereiaBookContext==='function'?bereiaBookContext(s.book):null,ev=eventFor(s),src=sourceFor(s);
   context.innerHTML='<div class="v43-section"><div class="v43-card"><strong>📚 Contexto literário</strong>'+(bc?esc(bc.history):'<span class="v43-empty">Contexto do livro ainda em expansão.</span>')+'</div><div class="v43-card"><strong>🗺️ Ambiente e geografia</strong>'+(ev?esc(ev.place):bc?esc(bc.geo):'<span class="v43-empty">Dados geográficos específicos ainda não cadastrados.</span>')+'</div>'+(ev?'<div class="v43-card"><strong>📖 Seção da narrativa</strong>'+esc(ev.title)+'. '+esc(ev.history)+'</div>':'')+'</div>';
   history.innerHTML='<div class="v43-section"><div class="v43-card"><strong>🏺 História & Arqueologia</strong>'+(ev?esc(ev.evidence):'<span class="v43-empty">Ainda não há nota histórica específica cadastrada para esta passagem.</span>')+'<div class="v43-note">O BEREIA distingue contexto histórico de comprovação direta do acontecimento bíblico.</div></div>'+(src.length?src.map(x=>{const title=x[3]||'Fonte';const desc=x[4]||'';const url=x[x.length-1]||'';return '<div class="v43-card"><strong>'+esc(title)+'</strong>'+esc(desc)+(url?'<a class="v43-source" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">Consultar fonte ↗<small>Abre a fonte externa relacionada.</small></a>':'')+'</div>'}).join(''):'')+'</div>';

   const orig=[document.getElementById('bomLang'),document.getElementById('bomStatus'),document.getElementById('bomWords'),document.getElementById('bomSource'),document.getElementById('bomNotice')].filter(Boolean);
   orig.forEach(x=>x.classList.add('v43-pane','v43-original'));

   function show(k){
     modal.querySelectorAll('.v43-pane').forEach(x=>x.classList.remove('active'));
     if(k==='guide')guide.classList.add('active');
     if(k==='meaning')meaning.classList.add('active');
     if(k==='original')orig.forEach(x=>x.classList.add('active'));
     if(k==='context')context.classList.add('active');
     if(k==='history')history.classList.add('active');
     nav.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.v43===k));
   }
   nav.addEventListener('click',e=>{const b=e.target.closest('button[data-v43]');if(!b)return;e.preventDefault();e.stopPropagation();show(b.dataset.v43)});
   window.bereiaDeepShow=show;
   show('guide');
 }
 const previous=window.openOriginalStudy;
 window.openOriginalStudy=function(){
   const r=typeof previous==='function'?previous.apply(this,arguments):undefined;
   setTimeout(build,260);return r;
 };
 window.addEventListener('load',()=>{const b=document.getElementById('bereiaBuildBadge');if(b)b.textContent='BEREIA • V43'});
})();
