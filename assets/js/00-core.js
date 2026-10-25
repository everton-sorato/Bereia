
const mainNav=[['home','⌂','Início'],['bible','▤','Bíblia'],['study','⌕','Estudar'],['discover','✦','Descobrir'],['me','◉','Meu BEREIA']];const extra=[['compare','⇄','Comparar'],['originals','א','Originais'],['library','▦','Biblioteca'],['canons','📜','Cânones'],['timeline','⌛','Cronologia'],['maps','⌖','Mapas'],['mission','✧','Missão'],['credits','ⓘ','Créditos']];
function renderNav(){desktopNav.innerHTML=mainNav.map(n=>`<button data-go="${n[0]}"><span>${n[1]}</span>${n[2]}</button>`).join('')+'<div class="sep"></div>'+extra.map(n=>`<button data-go="${n[0]}"><span>${n[1]}</span>${n[2]}</button>`).join('');mobileNav.innerHTML=mainNav.map(n=>`<button data-go="${n[0]}"><span>${n[1]}</span>${n[2]}</button>`).join('');document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));setActive('home')}
let navHistory=[];function currentScreen(){return document.querySelector('.screen.active')?.id||'home'}function go(id,remember=true){document.body.classList.toggle('simpleBibleOpen',id!=='home');const cur=currentScreen();if(remember&&cur!==id)navHistory.push(cur);document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));(document.getElementById(id)||home).classList.add('active');setActive(id);if(id==='study')renderStudyVerse();if(id==='originals')renderOriginals();scrollTo({top:0,behavior:'smooth'});if(location.hash!=='#'+id)location.hash=id}function goBack(){const prev=navHistory.pop()||'home';go(prev,false)}
function setActive(id){document.querySelectorAll('[data-go]').forEach(b=>b.classList.toggle('active',b.dataset.go===id))}
const study={Observação:'O que o texto realmente diz? Identifique palavras repetidas, personagens, ações, contrastes, conectivos e estrutura antes de concluir o significado.',Contexto:'Leia os parágrafos anteriores e posteriores. Depois considere autor, destinatários, gênero literário e situação histórica.',Referências:'Conecte a passagem a textos paralelos e temas relacionados. Esta área será alimentada pelo índice de referências cruzadas do Bible Engine.',História:'Consulte o cenário histórico e cultural apenas quando ele ajudar a compreender o texto, mantendo a distinção entre Escritura e reconstrução histórica.',Interpretações:'Organize interpretações documentadas por tradição/fonte, mostrando convergências e divergências sem apresentar opinião como se fosse o próprio texto.',Aplicação:'Depois da observação e interpretação, registre princípios e possíveis aplicações pessoais, comunitárias e missionais.'};
function renderTabs(){studyTabs.innerHTML=Object.keys(study).map((k,i)=>`<button class="btn tab ${i?'':'primary'}" onclick="studyTab('${k}',this)">${k}</button>`).join('');studyContent.innerHTML=`<h2>Observação</h2><p>${study.Observação}</p>`}function studyTab(k,b){document.querySelectorAll('.tab').forEach(x=>x.classList.remove('primary'));b.classList.add('primary');studyContent.innerHTML=`<h2>${k}</h2><p>${study[k]}</p>`}
function pickVerse(el,ref){document.querySelectorAll('.v').forEach(v=>v.classList.remove('selected'));el.classList.add('selected');localStorage.setItem('bereia:lastVerse',ref);toast(ref+' selecionado')}
function favorite(){if(typeof favoriteSelected==='function'&&requireSelected())return favoriteSelected();let n=+(localStorage.getItem('bereia:favs')||0)+1;localStorage.setItem('bereia:favs',n);updateFav();toast('Passagem adicionada aos favoritos')}
function updateFav(){let n=+(localStorage.getItem('bereia:favs')||0);favCount.textContent=n+' passagem'+(n===1?'':'s')+' salva'+(n===1?'':'s')}
function saveNote(){localStorage.setItem('bereia:note',note.value);toast('Anotação salva neste dispositivo')}
function doSearch(){let q=searchInput.value.trim();if(!q)return toast('Digite algo para pesquisar');searchResults.innerHTML=`<div class="card"><div class="eyebrow">Pesquisa</div><h3>${q}</h3><p>O mecanismo visual está pronto. Na integração com o Bible Engine, esta busca consultará versículos, temas, pessoas, lugares e biblioteca em uma única pesquisa.</p></div>`}
function toast(t){const x=document.getElementById('toast');x.textContent=t;x.classList.add('show');setTimeout(()=>x.classList.remove('show'),1800)}
const BIBLE_API='https://api.midvash.com/v1';
const bibleBooks=[
['Gen','Gênesis',50],['Exod','Êxodo',40],['Lev','Levítico',27],['Num','Números',36],['Deut','Deuteronômio',34],['Josh','Josué',24],['Judg','Juízes',21],['Ruth','Rute',4],['1Sam','1 Samuel',31],['2Sam','2 Samuel',24],['1Kgs','1 Reis',22],['2Kgs','2 Reis',25],['1Chr','1 Crônicas',29],['2Chr','2 Crônicas',36],['Ezra','Esdras',10],['Neh','Neemias',13],['Esth','Ester',10],['Job','Jó',42],['Ps','Salmos',150],['Prov','Provérbios',31],['Eccl','Eclesiastes',12],['Song','Cânticos',8],['Isa','Isaías',66],['Jer','Jeremias',52],['Lam','Lamentações',5],['Ezek','Ezequiel',48],['Dan','Daniel',12],['Hos','Oséias',14],['Joel','Joel',3],['Amos','Amós',9],['Obad','Obadias',1],['Jonah','Jonas',4],['Mic','Miquéias',7],['Nah','Naum',3],['Hab','Habacuque',3],['Zeph','Sofonias',3],['Hag','Ageu',2],['Zech','Zacarias',14],['Mal','Malaquias',4],['Matt','Mateus',28],['Mark','Marcos',16],['Luke','Lucas',24],['John','João',21],['Acts','Atos',28],['Rom','Romanos',16],['1Cor','1 Coríntios',16],['2Cor','2 Coríntios',13],['Gal','Gálatas',6],['Eph','Efésios',6],['Phil','Filipenses',4],['Col','Colossenses',4],['1Thess','1 Tessalonicenses',5],['2Thess','2 Tessalonicenses',3],['1Tim','1 Timóteo',6],['2Tim','2 Timóteo',4],['Titus','Tito',3],['Phlm','Filemom',1],['Heb','Hebreus',13],['Jas','Tiago',5],['1Pet','1 Pedro',5],['2Pet','2 Pedro',3],['1John','1 João',5],['2John','2 João',1],['3John','3 João',1],['Jude','Judas',1],['Rev','Apocalipse',22]];
let currentVerses=[],selectedVerse=null;
function initBible(){bibleBook.innerHTML=bibleBooks.map((b,i)=>`<option value="${i}">${b[1]}</option>`).join('');let saved={};try{saved=JSON.parse(localStorage.getItem('bereia:reading')||'{}')}catch(e){};bibleVersion.value=saved.version||'almeida-livre';bibleBook.value=Number.isInteger(saved.book)?saved.book:42;renderChapterOptions(saved.chapter||1);loadChapter(false)}
function renderChapterOptions(ch=1){const b=bibleBooks[+bibleBook.value];bibleChapter.innerHTML=Array.from({length:b[2]},(_,i)=>`<option value="${i+1}">Capítulo ${i+1}</option>`).join('');bibleChapter.value=Math.min(Math.max(+ch||1,1),b[2])}
function bookChanged(){renderChapterOptions(1);loadChapter(true)}
function cleanVerseText(x){if(x==null)return '';if(typeof x==='string'||typeof x==='number')return String(x).trim();if(Array.isArray(x))return x.map(cleanVerseText).filter(Boolean).join(' ').trim();if(typeof x==='object'){for(const k of ['text','content','value','verseText','verse_text','body']){const t=cleanVerseText(x[k]);if(t)return t}if(x.verse&&typeof x.verse==='object'){const t=cleanVerseText(x.verse);if(t)return t}}return ''}
function normalizeChapter(payload){let d=payload;if(d&&d.data!==undefined)d=d.data;let vs=[];if(Array.isArray(d))vs=d;else if(d&&typeof d==='object'){vs=d.verses||d.chapter?.verses||d.data?.verses||d.chapter||[];if(!Array.isArray(vs)&&vs&&typeof vs==='object')vs=Object.entries(vs).map(([n,v])=>({number:+n,...(typeof v==='object'?v:{text:v})}))}return (Array.isArray(vs)?vs:[]).map((v,i)=>({number:+(v?.number||v?.verse||v?.id||i+1),text:cleanVerseText(v)})).filter(v=>v.number)}
function validVerses(vs){return Array.isArray(vs)&&vs.length>0&&vs.some(v=>String(v.text||'').trim().length>0)}
async function fetchChapterFromSources(version,osis,ch){
 const apiBook=osis.toLowerCase();
 const attempts=[
  async()=>{const r=await fetch(`${BIBLE_API}/${encodeURIComponent(version)}/${encodeURIComponent(apiBook)}/${ch}`,{headers:{Accept:'application/json'},cache:'no-store',signal:AbortSignal.timeout(12000)});if(!r.ok)throw new Error('API '+r.status);return normalizeChapter(await r.json())},
  async()=>{const r=await fetch(`${BIBLE_API}/${encodeURIComponent(version)}/${encodeURIComponent(osis)}/${ch}`,{headers:{Accept:'application/json'},cache:'no-store',signal:AbortSignal.timeout(12000)});if(!r.ok)throw new Error('API OSIS '+r.status);return normalizeChapter(await r.json())},
  async()=>{const lang=version==='kjv'?'en':'pt';const r=await fetch(`https://raw.githubusercontent.com/midvash/bible-data/main/versions/${lang}/${encodeURIComponent(version)}/books/${encodeURIComponent(osis)}.json`,{cache:'no-store',signal:AbortSignal.timeout(12000)});if(!r.ok)throw new Error('RAW '+r.status);const d=await r.json();const c=(d.chapters||[])[ch-1];if(!c)throw new Error('Capítulo ausente');return (c.verses||[]).map((v,i)=>({number:+(v.number||i+1),text:cleanVerseText(v)}))}
 ];
 attempts.push(attempts.shift(),attempts.shift());
 let last;for(const fn of attempts){try{const vs=await fn();if(validVerses(vs))return vs}catch(e){last=e}}throw last||new Error('Nenhuma fonte respondeu');
}
let chapterLoadSequence=0;
async function loadChapter(userAction=false){const ticket=++chapterLoadSequence;if(!bibleBook||!bibleChapter)return;const bi=+bibleBook.value,b=bibleBooks[bi],ch=+bibleChapter.value,version=bibleVersion.value;selectedVerse=null;selectedRef.textContent='Nenhum';readingTitle.textContent=`${b[1]} ${ch}`;engineStatus.textContent='Carregando…';bibleReader.innerHTML='<div class="loadingBible"><div class="spinner"></div><p>Carregando as Escrituras…</p></div>';localStorage.setItem('bereia:reading',JSON.stringify({version,book:bi,chapter:ch}));const key=`bereia:bible:v4:${version}:${b[0]}:${ch}`;let verses=null;try{const cached=localStorage.getItem(key);if(cached){verses=JSON.parse(cached);if(!validVerses(verses)){localStorage.removeItem(key);verses=null}}}catch(e){localStorage.removeItem(key);verses=null}try{if(!validVerses(verses)){verses=await fetchChapterFromSources(version,b[0],ch);try{localStorage.setItem(key,JSON.stringify(verses))}catch(e){}}if(ticket!==chapterLoadSequence)return [];currentVerses=verses;renderBibleVerses(b,ch,verses);engineStatus.textContent=`${version==='almeida-livre'?'Almeida 1819':'King James 1769'} • ${verses.length} versículos • texto carregado`;if(userAction)setTimeout(()=>bibleReader.scrollIntoView({behavior:'smooth',block:'start'}),80);return verses}catch(err){if(ticket!==chapterLoadSequence)return [];currentVerses=[];engineStatus.textContent='Falha nas fontes';bibleReader.innerHTML=`<div class="readerError"><h3>Não foi possível carregar ${escapeHtml(b[1])} ${ch}.</h3><p class="lead">O BEREIA tentou a API principal e a fonte de dados por livro. Verifique a conexão e tente novamente.</p><div class="engineFallback">Identificador: ${escapeHtml(b[0])} • versão: ${escapeHtml(version)}</div><button class="btn primary" onclick="loadChapter(true)">Tentar novamente</button></div>`;return []}}
function renderBibleVerses(book,ch,verses){bibleReader.innerHTML=`<h2>${book[1]} ${ch}</h2><div class="verseGrid">`+verses.map(v=>`<div class="v" data-verse="${v.number}" onclick="selectRealVerse(this,${v.number})"><span class="vn">${v.number}</span><span class="verseText">${escapeHtml(v.text)}</span></div>`).join('')+`</div>`}
function escapeHtml(x){return String(x??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function selectRealVerse(el,n){document.querySelectorAll('#bibleReader .v').forEach(v=>v.classList.remove('selected'));el.classList.add('selected');const b=bibleBooks[+bibleBook.value],ch=+bibleChapter.value,v=currentVerses.find(x=>+x.number===+n);selectedVerse={bookIndex:+bibleBook.value,book:b[1],osis:b[0],chapter:ch,verse:n,text:v?.text||'',version:bibleVersion.value};const ref=`${b[1]} ${ch}:${n}`;selectedRef.textContent=ref;localStorage.setItem('bereia:lastVerse',JSON.stringify(selectedVerse));toast(ref+' selecionado')}
function moveChapter(delta){let bi=+bibleBook.value,ch=+bibleChapter.value+delta;if(ch<1){if(bi===0)return toast('Você está no início da Bíblia');bi--;ch=bibleBooks[bi][2]}else if(ch>bibleBooks[bi][2]){if(bi===bibleBooks.length-1)return toast('Você chegou ao fim da Bíblia');bi++;ch=1}bibleBook.value=bi;renderChapterOptions(ch);loadChapter(true)}
function prevChapter(){moveChapter(-1)}function nextChapter(){moveChapter(1)}
function openReference(){const raw=prompt('Digite uma referência, por exemplo: João 3, Salmos 23 ou Gênesis 1:1');if(!raw)return;const q=raw.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');let found=-1;for(let i=0;i<bibleBooks.length;i++){const nm=bibleBooks[i][1].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');if(q.startsWith(nm)){found=i;break}}if(found<0)return toast('Livro não reconhecido');const nm=bibleBooks[found][1].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');const rest=q.slice(nm.length).trim();const m=rest.match(/(\d+)(?:\s*[:.,]\s*(\d+))?/);const ch=m?+m[1]:1;const vs=m&&m[2]?+m[2]:null;if(ch<1||ch>bibleBooks[found][2])return toast('Capítulo inválido');bibleBook.value=found;renderChapterOptions(ch);loadChapter(true).then(()=>{if(vs){const el=document.querySelector(`#bibleReader .v[data-verse="${vs}"]`);if(el){selectRealVerse(el,vs);el.scrollIntoView({behavior:'smooth',block:'center'})}}})}
function requireSelected(){if(selectedVerse)return selectedVerse;try{return JSON.parse(localStorage.getItem('bereia:lastVerse')||'null')}catch(e){return null}}
function deepStudySelected(){const v=requireSelected();if(!v)return toast('Selecione um versículo primeiro');go('originals');renderStudyVerse()}function renderStudyVerse(){const v=requireSelected();if(!v)return;const r=document.getElementById('studyVerseRef'),t=document.getElementById('studyVerseText');if(r)r.textContent=`${v.book} ${v.chapter}:${v.verse}`;if(t)t.textContent=v.text||'Texto não carregado.'}function readSelectedInChapter(){const v=requireSelected();if(!v)return toast('Selecione um versículo primeiro');bibleBook.value=v.bookIndex;renderChapterOptions(v.chapter);bibleChapter.value=v.chapter;go('bible');loadChapter(false).then(()=>{const el=document.querySelector(`#bibleReader .v[data-verse="${v.verse}"]`);if(el){selectRealVerse(el,v.verse);el.scrollIntoView({behavior:'smooth',block:'center'})}})}function openOriginalsSelected(){const v=requireSelected();if(!v)return toast('Selecione um versículo primeiro');go('originals');renderOriginals()}function renderOriginals(){const v=requireSelected();const lead=document.getElementById('originalLead'),lang=document.getElementById('originLanguage'),rows=document.getElementById('lexicalRows');if(!lead||!lang||!rows)return;if(!v){lead.textContent='Selecione um versículo para abrir a camada de idioma original.';return}const isOT=v.bookIndex<39;lead.textContent=`${v.book} ${v.chapter}:${v.verse} • ${v.text}`;lang.textContent=isOT?'Hebraico • Antigo Testamento':'Grego • Novo Testamento';rows.innerHTML=`<div class="wordrow"><span>${isOT?'עברית':'Ελληνικά'}</span><span>—</span><span>—</span><span>O versículo foi identificado. A análise palavra por palavra será vinculada a uma base lexical verificável; não exibimos dados inventados.</span></div>`}async function moveStudyVerse(delta){const v=requireSelected();if(!v)return;let n=+v.verse+delta;if(n<1)return toast('Primeiro versículo do capítulo');let verse=currentVerses.find(x=>+x.number===n);if(+bibleBook.value!==v.bookIndex||+bibleChapter.value!==v.chapter||!verse){bibleBook.value=v.bookIndex;renderChapterOptions(v.chapter);bibleChapter.value=v.chapter;await loadChapter(false);verse=currentVerses.find(x=>+x.number===n)}if(!verse)return toast('Fim do capítulo');selectedVerse={...v,verse:n,text:verse.text};localStorage.setItem('bereia:lastVerse',JSON.stringify(selectedVerse));renderStudyVerse()}
function compareSelected(){const v=requireSelected();if(!v)return toast('Selecione um versículo primeiro');go('compare');loadComparison(v)}
let comparisonSequence=0;
async function loadComparison(v){
 const ticket=++comparisonSequence,box=document.querySelector('#compare .compare'),controls=document.querySelectorAll('#compare .compareControls select');
 const versions=[controls[0]?.selectedIndex===1?'kjv':'almeida-livre',controls[1]?.selectedIndex===1?'almeida-livre':'kjv'];
 box.innerHTML='<p role="status">Chargement…</p>'.replace('Chargement','Carregando comparação');
 const cols=await Promise.all(versions.map(async ver=>{try{const book=v.osis||bibleBooks[v.bookIndex]?.[0]||bibleBooks.find(b=>b[1]===v.book)?.[0];const vs=await fetchChapterFromSources(ver,book,v.chapter);return vs.find(x=>+x.number===+v.verse)?.text||'Versículo não disponível nesta fonte.'}catch{return 'Não foi possível carregar esta edição. Verifique a conexão ou baixe o livro para uso offline.'}}));
 if(ticket!==comparisonSequence)return;
 box.innerHTML=cols.map((text,i)=>`<div class="translation"><small>${versions[i]==='kjv'?'KING JAMES 1769':'ALMEIDA 1819'} • ${escapeHtml(v.book)} ${v.chapter}:${v.verse}</small><p>${escapeHtml(text)}</p></div>`).join('');
}
function favoriteSelected(){const v=requireSelected();if(!v)return toast('Selecione um versículo primeiro');let favs=[];try{favs=JSON.parse(localStorage.getItem('bereia:favorites')||'[]')}catch(e){};const id=`${v.version}:${v.osis}:${v.chapter}:${v.verse}`;if(!favs.some(x=>x.id===id))favs.push({id,...v});localStorage.setItem('bereia:favorites',JSON.stringify(favs));localStorage.setItem('bereia:favs',String(favs.length));updateFav();toast('Versículo salvo nos favoritos')}


const DAILY=[
{ref:'Salmos 119:105',text:'Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.',book:19,chapter:119,verse:105,img:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80'},
{ref:'Provérbios 3:5',text:'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.',book:20,chapter:3,verse:5,img:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80'},
{ref:'Isaías 40:31',text:'Os que esperam no Senhor renovarão as suas forças.',book:23,chapter:40,verse:31,img:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80'},
{ref:'Mateus 11:28',text:'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.',book:40,chapter:11,verse:28,img:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80'},
{ref:'João 8:12',text:'Eu sou a luz do mundo; quem me segue não andará em trevas.',book:43,chapter:8,verse:12,img:'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=80'},
{ref:'Filipenses 4:6',text:'Não estejais inquietos por coisa alguma; antes, em tudo, sejam os vossos pedidos conhecidos diante de Deus.',book:50,chapter:4,verse:6,img:'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1400&q=80'},
{ref:'Hebreus 11:1',text:'A fé é o firme fundamento das coisas que se esperam e a prova das coisas que se não veem.',book:58,chapter:11,verse:1,img:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=80'}];
let dailyCurrent=null;function initDaily(){const now=new Date(),start=new Date(now.getFullYear(),0,0),day=Math.floor((now-start)/86400000),d=DAILY[day%DAILY.length];dailyCurrent=d;const m=document.getElementById('dailyMessage'),r=document.getElementById('dailyRef'),v=document.getElementById('dailyVisual');if(m)m.textContent='“'+d.text+'”';if(r)r.textContent=d.ref;if(v)v.style.backgroundImage=`url("${d.img}")`}
function homeSearch(){const q=document.getElementById('homeGlobalSearch')?.value.trim();go('discover');setTimeout(()=>{const i=document.querySelector('#discover input');if(i&&q){i.value=q;i.dispatchEvent(new Event('input',{bubbles:true}))}},80)}
function openDailyVerse(){const d=dailyCurrent||DAILY[0];bibleBook.value=d.book;renderChapterOptions(d.chapter);bibleChapter.value=d.chapter;go('bible');loadChapter(false).then(()=>{const el=document.querySelector('#bibleReader .v[data-verse="'+d.verse+'"]');if(el){selectRealVerse(el,d.verse);el.scrollIntoView({behavior:'smooth',block:'center'})}})}

function bereiaSiteUrl(){
  if(location.protocol==='http:'||location.protocol==='https:') return location.href.split('#')[0].split('?')[0];
  return '';
}
function openDailyArt(ev){
  if(ev&&ev.stopPropagation)ev.stopPropagation();
  const d=dailyCurrent||DAILY[0], modal=document.getElementById('dailyArtModal');
  document.getElementById('dailyArtVerse').textContent='“'+d.text+'”';
  document.getElementById('dailyArtRef').textContent=d.ref;
  document.getElementById('dailyArtPreview').style.backgroundImage=`url("${d.img}")`;
  document.getElementById('dailyArtSite').textContent=bereiaSiteUrl()||'Site oficial BEREIA';
  modal.classList.add('open'); document.body.style.overflow='hidden';
}
function closeDailyArt(){document.getElementById('dailyArtModal')?.classList.remove('open');document.body.style.overflow=''}
function wrapCanvasText(ctx,text,x,y,maxWidth,lineHeight,maxLines){
  const words=text.split(/\s+/);let line='',lines=[];
  for(const word of words){const test=line?line+' '+word:word;if(ctx.measureText(test).width>maxWidth&&line){lines.push(line);line=word}else line=test}
  if(line)lines.push(line);
  if(lines.length>maxLines){lines=lines.slice(0,maxLines);let last=lines[maxLines-1];while(ctx.measureText(last+'…').width>maxWidth&&last.length>1)last=last.slice(0,-1);lines[maxLines-1]=last+'…'}
  lines.forEach((l,i)=>ctx.fillText(l,x,y+i*lineHeight));
  return y+lines.length*lineHeight;
}
async function makeDailyImage(){
  const d=dailyCurrent||DAILY[0], W=1080,H=1350,canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;
  const ctx=canvas.getContext('2d');
  ctx.fillStyle='#11151a';ctx.fillRect(0,0,W,H);
  try{
    const img=new Image();img.crossOrigin='anonymous';
    await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject;img.src=d.img});
    const scale=Math.max(W/img.width,H/img.height),dw=img.width*scale,dh=img.height*scale;
    ctx.drawImage(img,(W-dw)/2,(H-dh)/2,dw,dh);
  }catch(e){
    const g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,'#24313a');g.addColorStop(1,'#0c0f13');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  }
  const grad=ctx.createLinearGradient(0,220,0,H);grad.addColorStop(0,'rgba(0,0,0,.04)');grad.addColorStop(.48,'rgba(0,0,0,.30)');grad.addColorStop(1,'rgba(0,0,0,.94)');ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
  const left=82,max=W-164;
  ctx.fillStyle='#e8c76f';ctx.font='700 28px Arial';ctx.letterSpacing='7px';ctx.fillText('BEREIA',left,730);
  ctx.fillStyle='#fff';ctx.font='700 58px Georgia';let y=wrapCanvasText(ctx,'“'+d.text+'”',left,805,max,69,6);
  ctx.fillStyle='#ead28f';ctx.font='36px Arial';ctx.fillText(d.ref,left,y+24);
  const lineY=H-170;ctx.strokeStyle='rgba(255,255,255,.30)';ctx.beginPath();ctx.moveTo(left,lineY);ctx.lineTo(W-left,lineY);ctx.stroke();
  ctx.fillStyle='#e8c76f';ctx.font='700 25px Arial';ctx.fillText('BEREIA',left,lineY+45);
  ctx.fillStyle='#f1f1f1';ctx.font='23px Arial';ctx.fillText('Conheça a Palavra. Viva a Palavra. Compartilhe a Palavra.',left,lineY+82);
  const site=bereiaSiteUrl();if(site){ctx.fillStyle='#d8d8d8';ctx.font='20px Arial';ctx.fillText(site,left,lineY+116)}
  return await new Promise(resolve=>canvas.toBlob(resolve,'image/png',.96));
}
async function shareDailyImage(){
  const d=dailyCurrent||DAILY[0];toast('Preparando a imagem…');
  const blob=await makeDailyImage();if(!blob)return toast('Não foi possível gerar a imagem');
  const file=new File([blob],'BEREIA-Mensagem-do-Dia.png',{type:'image/png'});
  const url=bereiaSiteUrl(), text=`BEREIA • ${d.ref}${url?'\n'+url:''}`;
  try{
    if(navigator.canShare&&navigator.canShare({files:[file]})&&navigator.share){
      await navigator.share({title:'BEREIA • Mensagem do Dia',text,files:[file]});return;
    }
  }catch(e){if(e?.name==='AbortError')return}
  downloadDailyBlob(blob); if(url)navigator.clipboard?.writeText(url);
  toast(url?'Imagem salva e link do site copiado':'Imagem salva');
}
function downloadDailyBlob(blob){
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='BEREIA-Mensagem-do-Dia.png';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1500)
}
async function saveDailyImage(){toast('Gerando imagem…');const blob=await makeDailyImage();if(blob){downloadDailyBlob(blob);toast('Imagem pronta para compartilhar')}}
function shareDaily(){openDailyArt()}
function mapPlace(title,desc,region){document.getElementById('mapTitle').textContent=title;document.getElementById('mapDesc').textContent=desc;document.getElementById('mapRegion').textContent=region;toast(title+' selecionado')}
function setMapRoute(btn,type){document.querySelectorAll('#maps .chip').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const p=document.getElementById('routePath');if(!p)return;const routes={paulo:'M115 170 Q210 105 300 155 T485 180 T555 260',jesus:'M330 330 Q300 280 315 245 T350 215',exodo:'M555 410 Q470 385 410 360 T330 330'};p.setAttribute('d',routes[type]||routes.paulo);const labels={paulo:'Rota missionária selecionada',jesus:'Ministério de Jesus selecionado',exodo:'Rota do Êxodo selecionada'};toast(labels[type])}

const canonCollections={
 catolico:[['Tobias','Deuterocanônico'],['Judite','Deuterocanônico'],['Sabedoria','Deuterocanônico'],['Eclesiástico / Sirácida','Deuterocanônico'],['Baruque','Deuterocanônico'],['1 Macabeus','Deuterocanônico'],['2 Macabeus','Deuterocanônico'],['Adições a Ester','Tradição textual'],['Adições a Daniel','Tradição textual']],
 ortodoxo:[['1 Esdras','Presente em algumas tradições ortodoxas'],['3 Macabeus','Tradição ortodoxa'],['Salmo 151','Tradição ortodoxa'],['Oração de Manassés','Recepção varia por tradição'],['4 Macabeus','Apêndice em algumas edições']],
 etiope:[['1 Enoque','Cânon etíope'],['Jubileus','Cânon etíope'],['1–3 Meqabyan','Tradição etíope; distintos dos Macabeus gregos'],['Livros adicionais do cânon etíope','Catálogo em preparação']],
 antigos:[['1 Enoque','Literatura judaica antiga; também canônico na tradição etíope'],['Jubileus','Literatura do Segundo Templo; também canônico na tradição etíope'],['Testamentos dos Doze Patriarcas','Pseudepígrafo'],['Salmos de Salomão','Literatura judaica antiga'],['Odes / outros textos antigos','Catálogo histórico em expansão']]
};
function openCanons(){go('canons');renderCanon('catolico')}
function renderCanon(key,btn){if(btn){document.querySelectorAll('#canonTabs button').forEach(x=>x.classList.remove('active'));btn.classList.add('active')}const g=document.getElementById('canonGrid');if(!g)return;g.innerHTML=(canonCollections[key]||[]).map(x=>`<div class="canonBook" onclick="toast('${x[0].replace(/'/g,"\'")} • catálogo em preparação')"><b>${x[0]}</b><small>${x[1]}</small></div>`).join('')}

renderNav();initDaily();renderTabs();updateFav();note.value=localStorage.getItem('bereia:note')||'';initBible();renderCanon('catolico');if(location.hash)go(location.hash.slice(1));

function atlasPlace(name,region,desc){document.getElementById('atlasTitle').textContent=name;document.getElementById('atlasRegion').textContent=region;document.getElementById('atlasDesc').textContent=desc}function atlasLayer(btn,key){document.querySelectorAll('#maps .chip').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const labels={jesus:['Ministério de Jesus','Galileia, Samaria e Judeia'],paulo:['Viagens de Paulo','Mediterrâneo oriental e Roma'],exodo:['Êxodo','Egito, Sinai e Canaã'],patriarcas:['Patriarcas','Mesopotâmia, Canaã e Egito'],reinos:['Reinos de Israel e Judá','Levante antigo'],exilio:['Exílio','Judá, Babilônia e Pérsia']};const v=labels[key];document.getElementById('atlasTitle').textContent=v[0];document.getElementById('atlasRegion').textContent=v[1];document.getElementById('atlasDesc').textContent='Camada selecionada. Na evolução online, esta visualização receberá rotas, sítios arqueológicos, relevo e referências bíblicas conectadas.'}function studyTopic(topic){toast('Abrindo '+topic+' no dossiê da passagem');go('discover');const q=document.querySelector('#discover input');if(q){q.value=topic;q.focus()}}

function portalTerm(term){document.getElementById('searchInput').value=term;doPortalSearch()}
function doPortalSearch(){const q=(document.getElementById('searchInput').value||'').trim();if(!q)return;const el=document.getElementById('portalResults');const safe=q.replace(/[<>]/g,'');el.innerHTML=`<div class="resultGroup"><h3>Resultados para “${safe}”</h3><div class="resultCard" onclick="go('bible')"><small>BÍBLIA</small><b> Pesquisar nas Escrituras</b><p>Abra o leitor e localize referências e ocorrências relacionadas a ${safe}.</p></div><div class="resultCard" onclick="studyTopic('${safe.replace(/'/g,"\'")}')"><small>ESTUDO & HISTÓRIA</small><b> Dossiê: ${safe}</b><p>Contexto histórico, pessoas, povos e acontecimentos relacionados.</p></div><div class="resultCard" onclick="studyTopic('Arqueologia: ${safe.replace(/'/g,"\'")}')"><small>ARQUEOLOGIA</small><b> Evidências e sítios</b><p>Área preparada para fontes arqueológicas verificadas, distinguindo evidência de hipótese.</p></div><div class="resultCard" onclick="go('maps')"><small>GEOGRAFIA & MAPAS</small><b> Ver no Atlas BEREIA</b><p>Mapas e lugares relacionados ao tema pesquisado.</p></div></div>`;}
function filterRealMaps(btn,cat){document.querySelectorAll('#maps .chip').forEach(x=>x.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.realMapCard').forEach(c=>{c.style.display=(cat==='todos'||(c.dataset.mapcat||'').includes(cat))?'block':'none'})}
function selectRealMap(btn){const card=btn.closest('.realMapCard'),img=card.querySelector('img'),title=card.querySelector('h3').textContent,main=document.getElementById('mainAtlasImg');main.style.display='block';main.src=img.src;main.alt=img.alt;document.getElementById('mainAtlasCaption').textContent=title+' • '+card.querySelector('.mapLicense').textContent;document.querySelector('.atlasImageHero').scrollIntoView({behavior:'smooth',block:'start'})}
