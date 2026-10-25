
(function(){
 const BUILD='V55';
 const PT={
  'θεοσ':'Deus','κυριοσ':'Senhor; mestre','ιησουσ':'Jesus','χριστοσ':'Cristo; Messias',
  'λογοσ':'palavra; mensagem; discurso','αγαπη':'amor','αγαπαω':'amar','πιστισ':'fé; confiança; fidelidade',
  'πιστευω':'crer; confiar','ζωη':'vida','κοσμοσ':'mundo; humanidade; ordem criada','πνευμα':'espírito; vento; sopro',
  'αγιοσ':'santo; separado','χαρισ':'graça; favor','ειρηνη':'paz; bem-estar','αληθεια':'verdade','φωσ':'luz',
  'σωμα':'corpo','εκκλησια':'assembleia; igreja','βασιλεια':'reino; reinado','ουρανοσ':'céu',
  'ανθρωποσ':'ser humano; homem','καρδια':'coração; centro interior','μαθητησ':'discípulo; aprendiz',
  'αποστολοσ':'enviado; apóstolo','σωτηρια':'salvação','αμαρτια':'pecado','δικαιοσυνη':'justiça; retidão',
  'δυναμισ':'poder; capacidade','σοφια':'sabedoria','οδοσ':'caminho','νουσ':'mente; entendimento',
  'ανακαινωσισ':'renovação','μεταμορφοω':'transformar; transfigurar','αγαθοσ':'bom; benéfico',
  'τελειοσ':'completo; maduro; perfeito','θελημα':'vontade; propósito','παρακαλεω':'exortar; encorajar',
  'αδελφοσ':'irmão','οικτιρμοσ':'misericórdia; compaixão','θυσια':'sacrifício','ζαω':'viver','λατρεια':'culto; serviço sagrado',
  'ου':'não','ουκ':'não','ουχ':'não','μη':'não'
 };
 const POS={N:'Substantivo',V:'Verbo',A:'Adjetivo',D:'Advérbio',P:'Pronome',R:'Artigo',C:'Conjunção',I:'Interjeição',X:'Partícula'};
 const key=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ς/g,'σ').toLowerCase().replace(/[^\p{L}]/gu,'');
 const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
 function current(){return window.BEREIA_STUDY_SESSION?.getCurrent?.()||window.selectedVerse||(()=>{try{return JSON.parse(localStorage.getItem('bereia:lastVerse')||'null')}catch(e){return null}})()}
 function ref(v){return v?((v.book||'')+' '+v.chapter+':'+v.verse):''}
 function isNT(v){return Number(v?.bookIndex)>=39||((typeof bereiaTestament==='function')&&bereiaTestament(v?.book)==='NT')}
 function lang(v){
   if(!isNT(v)){
     const b=String(v?.book||'').toLowerCase(),c=Number(v?.chapter||0);
     if((b.includes('daniel')&&c>=2&&c<=7)||(b.includes('esdras')&&c>=4&&c<=7))return 'Aramaico bíblico';
     return 'Hebraico bíblico';
   }
   return 'Grego koiné';
 }
 function source(v){
   if(isNT(v))return {name:'SBL Greek New Testament + MorphGNT',license:'SBLGNT: CC BY 4.0 • MorphGNT: CC BY-SA',credit:'Society of Biblical Literature / Logos Bible Software / MorphGNT'};
   return {name:'Open Scriptures Hebrew Bible / Westminster Leningrad Codex',license:'WLC: domínio público • dados OSHB conforme licença do projeto',credit:'Open Scriptures Hebrew Bible Project'};
 }
 async function greekAll(v){
   if(typeof BEREIA_BOOK_CODES==='undefined'||typeof BEREIA_MORPH_FILES==='undefined')return {items:[],counts:{}};
   const code=BEREIA_BOOK_CODES[v.book],file=BEREIA_MORPH_FILES[code];if(!file)return {items:[],counts:{}};
   const res=await fetch('https://raw.githubusercontent.com/morphgnt/sblgnt/master/'+file,{cache:'force-cache'});if(!res.ok)throw new Error('Fonte grega indisponível');
   const txt=await res.text(),target=String(v.chapter).padStart(2,'0')+String(v.verse).padStart(2,'0'),items=[],counts={};
   for(const line of txt.split(/\r?\n/)){
     if(!line.trim())continue;const cols=line.trim().split(/\s+/);if(cols.length<7)continue;
     const lemma=cols.slice(6).join(' '),lk=key(lemma);counts[lk]=(counts[lk]||0)+1;
     if(!cols[0].endsWith(target))continue;
     const pos=cols[1],parse=cols[2],word=cols[4],normw=cols[5];
     const trans=typeof bereiaGreekTranslit==='function'?bereiaGreekTranslit(lemma||normw):'';
     const localMeaning=(typeof BEREIA_GREEK_GLOSSES!=='undefined'&&(BEREIA_GREEK_GLOSSES[lemma]||BEREIA_GREEK_GLOSSES[normw]))||'';
     items.push({original:word,transliteration:trans,lemma,pos,parse,translation:PT[lk]||localMeaning||'',meaning:localMeaning||PT[lk]||'',count:counts[lk]});
   }
   // Replace progressive counts with full-book totals.
   items.forEach(w=>w.count=counts[key(w.lemma)]||1);
   return {items,counts};
 }
 function localHebrew(v){
   try{
     if(typeof bereiaKeyWords==='function'){
       const a=bereiaKeyWords(ref(v))||[];
       return a.map(w=>({...w,translation:w.translation||w.meaning||'',count:null}));
     }
   }catch(e){}
   return [];
 }
 function isImportant(w){const p=String(w.pos||'');return !p||/^[NVAD]/.test(p)}
 function className(w){const p=String(w.pos||'').replace(/[^A-Z].*$/,'');return POS[p]||POS[String(w.pos||'').charAt(0)]||'Classe morfológica disponível no código'}
 function pt(w){
   if(w.translation)return w.translation;
   const p=PT[key(w.lemma||w.original)];if(p)return p;
   const m=String(w.meaning||'');return /em expansão|ainda não|Lema identificado/i.test(m)?'':m;
 }
 function ensure(){
   const screen=document.getElementById('originals');if(!screen)return null;
   let lab=document.getElementById('b55OriginalLab');
   if(!lab){lab=document.createElement('div');lab.id='b55OriginalLab';const anchor=document.getElementById('originBanner')||screen.querySelector('.lead');anchor?.insertAdjacentElement('afterend',lab)}
   return lab;
 }
 async function render(){
   const lab=ensure();if(!lab)return;
   const v=current();
   if(!v){lab.innerHTML='<div class="b55Empty"><strong>Selecione um versículo</strong>Abra a Bíblia, escolha um versículo e volte para Hebraico & Grego.</div>';return}
   const l=lang(v),src=source(v);
   lab.innerHTML='<div class="b55Top"><div class="b55TopHead"><div><small>'+esc(ref(v))+'</small><h2>Texto original • '+esc(l)+'</h2></div><span class="b55Badge">Fonte verificável</span></div><p>“'+esc(v.text||'')+'”</p></div>'+
    '<div class="b55Meta"><div class="b55MetaCard"><b>Idioma</b>'+esc(l)+'</div><div class="b55MetaCard"><b>Fonte</b>'+esc(src.name)+'</div><div class="b55MetaCard"><b>Princípio BEREIA</b>Nenhuma palavra é preenchida por suposição.</div></div>'+
    '<div class="b55Toolbar"><button class="active" data-b55-filter="all">Todas as palavras</button><button data-b55-filter="important">Palavras principais</button><button data-b55-copy>Copiar análise</button></div>'+
    '<div class="b55Status" id="b55Status">Carregando análise linguística…</div><div class="b55Words" id="b55Words"></div>'+
    '<div class="b55Source"><b>Créditos da base</b><br>'+esc(src.credit)+'<br>'+esc(src.license)+'</div>';
   const words=document.getElementById('b55Words'),status=document.getElementById('b55Status');
   try{
     let items=[];
     if(isNT(v)){
       const r=await greekAll(v);items=r.items;
       status.textContent=items.length?items.length+' palavra(s) do versículo carregada(s) a partir do texto grego.':'A base grega respondeu, mas nenhuma palavra foi localizada para esta referência.';
     }else{
       items=localHebrew(v);
       status.textContent=items.length?items.length+' palavra(s) verificada(s) disponível(is) nesta passagem.':'A passagem foi identificada, mas o adaptador completo do OSHB ainda não está carregado para este versículo.';
     }
     if(!items.length){
       words.innerHTML='<div class="b55Empty"><strong>Dados palavra por palavra ainda indisponíveis</strong>O BEREIA reconhece '+esc(l)+' como idioma-base desta passagem, mas não exibirá lema, tradução ou morfologia sem dados verificáveis. A integração completa desta base continuará sendo ampliada.</div>';
     }else{
       words.innerHTML=items.map((w,i)=>{
         const tr=pt(w),imp=isImportant(w),occ=w.count?('<div><b>Neste livro:</b> '+w.count+' ocorrência(s) deste lema.</div>'):'';
         return '<article class="b55Word" data-important="'+(imp?'1':'0')+'" data-i="'+i+'"><div class="b55Original">'+esc(w.original||'')+'</div><div class="b55Translit">'+esc(w.transliteration||w.translit||'')+'</div><div class="b55Pt">Português: '+esc(tr||'tradução em expansão')+'</div><div class="b55Details">'+(w.lemma?'<div><b>Lema:</b> '+esc(w.lemma)+'</div>':'')+(w.pos?'<div><b>Classe:</b> '+esc(className(w))+' ('+esc(w.pos)+')</div>':'')+(w.parse?'<div><b>Código morfológico:</b> '+esc(w.parse)+'</div>':'')+occ+'</div>'+(w.meaning?'<div class="b55Sense"><b>Sentido lexical:</b> '+esc(w.meaning)+'</div>':'')+'</article>';
       }).join('');
     }
     lab.querySelectorAll('[data-b55-filter]').forEach(b=>b.onclick=()=>{const k=b.dataset.b55Filter;lab.querySelectorAll('[data-b55-filter]').forEach(x=>x.classList.toggle('active',x===b));lab.querySelectorAll('.b55Word').forEach(x=>x.classList.toggle('hidden',k==='important'&&x.dataset.important!=='1'))});
     const copy=lab.querySelector('[data-b55-copy]');if(copy)copy.onclick=async()=>{
       const lines=[ref(v),v.text||'',l,''];
       items.forEach(w=>lines.push((w.original||'')+' — '+(w.transliteration||'')+' — '+(pt(w)||'')+(w.lemma?' | lema: '+w.lemma:'')+(w.parse?' | morf.: '+w.parse:'')));
       lines.push('',src.name,src.license);
       try{await navigator.clipboard.writeText(lines.join('\n'));if(typeof toast==='function')toast('Análise copiada')}catch(e){}
     };
   }catch(e){
     status.textContent='Não foi possível carregar a base linguística agora.';
     words.innerHTML='<div class="b55Empty"><strong>Consulta indisponível</strong>Verifique a conexão e tente novamente. O BEREIA não substitui a fonte original por dados inventados.</div>';
   }
 }
 const oldRender=window.renderOriginals;
 window.renderOriginals=function(){const r=typeof oldRender==='function'?oldRender.apply(this,arguments):undefined;setTimeout(render,0);return r};
 window.openOriginalsSelected=function(){const v=current();if(!v){if(typeof toast==='function')toast('Selecione um versículo primeiro');return}if(typeof go==='function')go('originals');setTimeout(render,0)};
 window.openOriginalStudy=function(){const v=current();if(!v){if(typeof toast==='function')toast('Selecione um versículo primeiro');return}if(typeof go==='function')go('originals');setTimeout(render,0)};
 function boot(){ensure();if(document.querySelector('.screen.active')?.id==='originals')render();const b=document.getElementById('bereiaBuildBadge');if(b)b.textContent='BEREIA • '+BUILD}
 document.addEventListener('bereia:studyverse',()=>{if(document.querySelector('.screen.active')?.id==='originals')render()});
 window.BEREIA_ORIGINAL_V55={render,greekAll,localHebrew};
 
 window.addEventListener('load',()=>{setTimeout(boot,300);setTimeout(boot,1100)});setTimeout(boot,700);
})();
