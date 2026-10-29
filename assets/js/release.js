/* BEREIA 1.0 preparation — V74. No tracking, accounts or advertising SDKs. */
(()=>{
'use strict';
const VERSION='V74', $=s=>document.querySelector(s), esc=window.escapeHtml;
const keys=['bereia:note','bereia:favorites','bereia:favs','bereia:highlights:v1','bereia:verseNotes:v1','bereia:collections:v1','bereia:reading','bereia:lastVerse','bereia:studySession:v1','bereia:completed:v1','bereia:font'];
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function download(name,text){const u=URL.createObjectURL(new Blob([text],{type:'application/json'})),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),30000)}
function backup(){const data={};keys.forEach(k=>{const v=localStorage.getItem(k);if(v!==null)data[k]=v});return {app:'BEREIA',schema:1,createdAt:new Date().toISOString(),data}}
function validateBackup(input){
 if(input?.app!=='BEREIA'||input.schema!==1||!input.data||typeof input.data!=='object'||Array.isArray(input.data))throw Error('Este arquivo não é um backup BEREIA compatível.');
 const entries=Object.entries(input.data);if(entries.some(([k,v])=>!keys.includes(k)||typeof v!=='string'||v.length>2000000))throw Error('O backup contém dados inválidos.');
 for(const [k,v] of entries){if(k==='bereia:note')continue;let parsed;try{parsed=JSON.parse(v)}catch{throw Error('Dado inválido: '+k)}
  if(k==='bereia:favorites'&&(!Array.isArray(parsed)||parsed.some(x=>!x||typeof x.book!=='string'||typeof x.text!=='string'||!Number.isInteger(+x.chapter)||+x.chapter<1||!Number.isInteger(+x.verse)||+x.verse<1)))throw Error('Favoritos inválidos.');
  if(k==='bereia:reading'&&(!parsed||!Number.isInteger(parsed.book)||parsed.book<0||parsed.book>65||!Number.isInteger(+parsed.chapter)||+parsed.chapter<1||!['almeida-livre','kjv'].includes(parsed.version)))throw Error('Preferência de leitura inválida.');
  if(['bereia:lastVerse','bereia:studySession:v1'].includes(k)&&(!parsed||typeof parsed.book!=='string'||!Number.isInteger(+parsed.chapter)||+parsed.chapter<1||!Number.isInteger(+parsed.verse)||+parsed.verse<1))throw Error('Passagem inválida.');
  if(k==='bereia:completed:v1'&&(!Array.isArray(parsed)||parsed.some(x=>typeof x!=='string'||!/^[1-3]?[A-Za-z]+:\d+$/.test(x))))throw Error('Progresso inválido.');
  if(k==='bereia:font'&&![18,22,26].includes(Number(parsed)))throw Error('Tamanho de fonte inválido.');
  if(k==='bereia:favs'&&(!Number.isInteger(Number(parsed))||Number(parsed)<0))throw Error('Contagem inválida.');
  if(/highlights|verseNotes|collections/.test(k)&&(!parsed||typeof parsed!=='object'))throw Error('Anotações inválidas.');
 }
 return entries;
}
function restore(input){const entries=validateBackup(input),previous=new Map(entries.map(([k])=>[k,localStorage.getItem(k)]));try{entries.forEach(([k,v])=>localStorage.setItem(k,v))}catch(e){previous.forEach((v,k)=>v===null?localStorage.removeItem(k):localStorage.setItem(k,v));throw Error('Sem espaço para restaurar. Seus dados anteriores foram preservados.')};return entries.length}
window.BEREIA_RELEASE={backup,validateBackup,restore};
// IndexedDB stores downloaded chapters separately from personal notes.
let dbPromise;
function db(){return dbPromise||=new Promise((resolve,reject)=>{const r=indexedDB.open('bereia-offline',1);r.onupgradeneeded=()=>r.result.createObjectStore('chapters');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
async function dbCall(mode,action){const d=await db();return new Promise((resolve,reject)=>{const tx=d.transaction('chapters',mode),r=action(tx.objectStore('chapters'));tx.oncomplete=()=>resolve(r.result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error)})}
const chapterKey=(v,b,c)=>`${v}:${b}:${c}`;
const originalFetch=window.fetchChapterFromSources;
window.fetchChapterFromSources=async function(v,b,c){try{const saved=await dbCall('readonly',s=>s.get(chapterKey(v,b,c)));if(saved?.length)return saved}catch{}return originalFetch(v,b,c)};
let cancelDownload=false;
async function offlineDownload(){
 const status=$('#offlineStatus'),version=$('#offlineVersion').value,selection=$('#offlineBook').value,books=selection==='all'?bibleBooks:[bibleBooks[+selection]];
 $('#offlineDownload').disabled=true;$('#offlineCancel').hidden=false;cancelDownload=false;let count=0;
 try{
  for(const b of books){if(cancelDownload)break;status.textContent='Baixando '+b[1]+'…';
   const lang=version==='kjv'?'en':'pt',url=`https://raw.githubusercontent.com/midvash/bible-data/main/versions/${lang}/${version}/books/${b[0]}.json`;
   const res=await fetch(url,{signal:AbortSignal.timeout(20000)});if(!res.ok)throw Error('Fonte indisponível para '+b[1]);
   const payload=await res.json();if(!Array.isArray(payload.chapters)||payload.chapters.length!==b[2])throw Error('Livro incompleto: '+b[1]);
   const chapters=payload.chapters.map(c=>normalizeChapter(c));if(chapters.some(c=>!validVerses(c)))throw Error('Texto incompleto: '+b[1]);
   const database=await db();await new Promise((resolve,reject)=>{const tx=database.transaction('chapters','readwrite'),store=tx.objectStore('chapters');chapters.forEach((vs,i)=>store.put(vs,chapterKey(version,b[0],i+1)));tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error)});count+=chapters.length;
  }
  status.textContent=(cancelDownload?'Download interrompido. ':'Download concluído. ')+count+' capítulos salvos nesta operação.';
 }catch(e){status.textContent=e.message+'. Os livros já concluídos permanecem disponíveis; você pode tentar novamente.'}finally{$('#offlineDownload').disabled=false;$('#offlineCancel').hidden=true;offlineInventory()}
}
async function offlineInventory(){try{const all=await dbCall('readonly',s=>s.getAllKeys());$('#offlineInventory').textContent=all.length+' capítulos baixados. Imagens, mapas e fontes externas ainda podem precisar de internet.'}catch{$('#offlineInventory').textContent='Armazenamento offline indisponível neste navegador.'}}
let fullSearchIndex=[];
async function searchWholeBible(){
 const q=$('#searchInput').value.trim();if(!q)return toast('Digite uma palavra ou referência primeiro.');
 const version=bibleVersion?.value||'almeida-livre',status=$('#fullBibleSearchStatus'),button=$('#fullBibleSearch');button.disabled=true;
 try{
  let keys=await dbCall('readonly',s=>s.getAllKeys()),saved=await dbCall('readonly',s=>s.getAll()),all=keys.map((k,i)=>({key:String(k),verses:saved[i]})).filter(x=>x.key.startsWith(version+':'));
  const books=new Map();for(const x of all){const [,osis,ch]=x.key.split(':');if(!books.has(osis))books.set(osis,new Set());books.get(osis).add(+ch)}
  const missing=bibleBooks.filter(b=>books.get(b[0])?.size!==b[2]);if(missing.length&&!navigator.onLine)throw Error('Sem conexão. Baixe a Bíblia inteira em Ajustes, offline e backup para pesquisar todos os livros.');
  let done=bibleBooks.length-missing.length,queue=[...missing];await Promise.all(Array.from({length:4},async()=>{while(queue.length){const b=queue.shift();status.textContent=`Preparando a busca: ${done} de 66 livros…`;const lang=version==='kjv'?'en':'pt',url=`https://raw.githubusercontent.com/midvash/bible-data/main/versions/${lang}/${version}/books/${b[0]}.json`,r=await fetch(url,{signal:AbortSignal.timeout(25000)});if(!r.ok)throw Error('Falha ao carregar '+b[1]+'. Tente novamente.');const data=await r.json();if(!Array.isArray(data.chapters)||data.chapters.length!==b[2])throw Error('Texto incompleto em '+b[1]+'.');const chapters=data.chapters.map(normalizeChapter);if(chapters.some(c=>!validVerses(c)))throw Error('Não foi possível validar '+b[1]+'.');const d=await db();await new Promise((resolve,reject)=>{const tx=d.transaction('chapters','readwrite'),store=tx.objectStore('chapters');chapters.forEach((v,i)=>store.put(v,chapterKey(version,b[0],i+1)));tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error)});done++}}));
  keys=await dbCall('readonly',s=>s.getAllKeys());saved=await dbCall('readonly',s=>s.getAll());fullSearchIndex=keys.map((k,i)=>({key:String(k),verses:saved[i]})).filter(x=>x.key.startsWith(version+':'));status.textContent=`Busca completa pronta: ${fullSearchIndex.length} capítulos pesquisados.`;search();
 }catch(e){status.textContent=e.message||'Falha ao preparar a busca.'}finally{button.disabled=false}
}
function gotoVerse(v){if(!v)return;selectedVerse=v;window.selectedVerse=v;localStorage.setItem('bereia:lastVerse',JSON.stringify(v));window.BEREIA_STUDY_SESSION?.saveCurrent?.(v);bibleVersion.value=v.version||'almeida-livre';bibleBook.value=v.bookIndex;renderChapterOptions(v.chapter);go('bible');loadChapter(false).then(()=>{const el=$(`#bibleReader .v[data-verse="${v.verse}"]`);if(el)selectRealVerse(el,v.verse)})}
function personal(){
 const favs=read('bereia:favorites',[]),list=$('#releaseFavorites');if(!list)return;
 list.replaceChildren();if(!favs.length)list.textContent='Nenhum favorito salvo. Selecione um versículo na Bíblia para começar.';
 favs.forEach(v=>{const card=document.createElement('div');card.className='releaseFav';const b=document.createElement('button');b.className='btn';b.textContent=`${v.book} ${v.chapter}:${v.verse}`;b.onclick=()=>gotoVerse(v);const t=document.createElement('p');t.textContent=v.text;card.append(b,t);list.append(card)});
 const n=$('#favCount');if(n)n.textContent=favs.length+' passagens salvas';
}
function settings(){
 const section=document.createElement('section');section.className='screen';section.id='settings';section.innerHTML=`<h1>Ajustes e seus dados</h1><p>Gratuito e sem anúncios. BEREIA ${VERSION}.</p><div class="releasePanel"><h2>Aparência</h2><p>Escolha o visual que combina com o ambiente. A preferência fica salva neste dispositivo.</p><label for="appTheme">Tema do aplicativo</label><select id="appTheme" aria-label="Tema do aplicativo"><option value="original">Atual — escuro e dourado</option><option value="light">Claro</option><option value="tech">Tecnológico — azul e ciano</option></select></div><div class="releasePanel"><h2>Leitura</h2><label for="readerFont">Tamanho do texto bíblico</label><select id="readerFont"><option value="18">Padrão</option><option value="22">Grande</option><option value="26">Muito grande</option></select></div><div class="releasePanel"><h2>Backup do caderno</h2><p>Salve favoritos, anotações, marcações e progresso em um arquivo. Guarde-o em local seguro: ele contém seus textos pessoais. Trocar de navegador ou limpar os dados pode apagar suas anotações.</p><button class="btn" id="exportBackup">Baixar backup</button><label class="btn" for="importBackup">Escolher backup para restaurar</label><input id="importBackup" type="file" accept="application/json,.json"><p id="backupStatus" role="status"></p><button class="btn" id="restoreBackup" hidden>Confirmar restauração dos dados do arquivo</button></div><div class="releasePanel"><h2>Leitura sem internet</h2><p>Baixe um livro ou uma edição completa. O download precisa de internet e espaço no dispositivo. Os capítulos já abertos no leitor também podem estar no cache.</p><label for="offlineVersion">Edição</label><select id="offlineVersion"><option value="almeida-livre">Almeida 1819</option><option value="kjv">King James 1769</option></select><label for="offlineBook">Conteúdo</label><select id="offlineBook"><option value="all">Bíblia inteira — 66 livros</option>${bibleBooks.map((b,i)=>`<option value="${i}">${b[1]}</option>`).join('')}</select><button class="btn primary" id="offlineDownload">Baixar para este dispositivo</button><button class="btn" id="offlineCancel" hidden>Interromper após o livro atual</button><p id="offlineStatus" role="status"></p><p id="offlineInventory"></p></div><div class="releasePanel"><h2>Privacidade e ajuda</h2><a href="./privacidade.html">Política de privacidade</a> · <a href="./suporte.html">Ajuda e suporte</a><p>Você controla os dados guardados neste navegador.</p><button class="btn" id="eraseData">Apagar meus dados locais</button><p id="eraseStatus" role="status"></p><button class="btn" id="confirmErase" hidden>Confirmar exclusão local</button></div>`;
 $('main').append(section);
 const link=document.createElement('button');link.className='btn';link.textContent='Ajustes, offline e backup';link.onclick=()=>go('settings');$('#me').prepend(link);
 const homeLink=link.cloneNode(true);homeLink.onclick=()=>go('settings');$('#bereiaStudyTools')?.append(homeLink);
 $('#readerFont').value=localStorage.getItem('bereia:font')||'18';function font(){document.documentElement.style.setProperty('--reader-size',$('#readerFont').value+'px')}font();$('#readerFont').onchange=()=>{localStorage.setItem('bereia:font',$('#readerFont').value);font()};const themePicker=$('#appTheme');if(themePicker){themePicker.value=window.BereiaThemes?.get()||'original';themePicker.addEventListener('change',()=>window.BereiaThemes?.set(themePicker.value))}
 $('#exportBackup').onclick=()=>{download('bereia-backup-'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify(backup(),null,2));$('#backupStatus').textContent='Backup preparado para download.'};
 let pending=null;$('#importBackup').onchange=async e=>{pending=null;$('#restoreBackup').hidden=true;try{const f=e.target.files[0];if(!f)return;if(f.size>8000000)throw Error('Arquivo muito grande. Limite: 8 MB.');const x=JSON.parse(await f.text()),entries=validateBackup(x);pending=x;$('#backupStatus').textContent=entries.length+' grupos de dados válidos. Baixe um backup atual antes de confirmar: os grupos presentes no arquivo serão substituídos.';$('#restoreBackup').hidden=false}catch(err){$('#backupStatus').textContent=err.message}};
 $('#restoreBackup').onclick=()=>{try{restore(pending);$('#backupStatus').textContent='Backup restaurado. Reabra o aplicativo para atualizar todas as telas.';$('#restoreBackup').hidden=true;pending=null;$('#note').value=localStorage.getItem('bereia:note')||'';personal()}catch(e){$('#backupStatus').textContent=e.message}};
 $('#offlineDownload').onclick=offlineDownload;$('#offlineCancel').onclick=()=>{cancelDownload=true};
 $('#eraseData').onclick=()=>{$('#eraseStatus').textContent='Esta ação remove anotações, favoritos, marcações e progresso deste navegador. Baixe um backup antes de confirmar.';$('#confirmErase').hidden=false};
 $('#confirmErase').onclick=()=>{keys.forEach(k=>localStorage.removeItem(k));$('#note').value='';personal();$('#eraseStatus').textContent='Dados pessoais locais apagados. Capítulos offline foram mantidos.';$('#confirmErase').hidden=true};
 offlineInventory();
}
function search(){
 const q=$('#searchInput').value.trim(),term=normalize(q),filter=$('.searchCats .active')?.textContent||'Tudo',results=[];
 const add=(category,title,text,action)=>{if((filter==='Tudo'||category===filter)&&normalize(title+' '+text).includes(term)&&!results.some(r=>r.category===category&&r.title===title))results.push({category,title,text,action});}
 const ref=q.match(/^(.+?)\s+(\d+)(?::(\d+))?$/),bi=ref?bibleBooks.findIndex(b=>normalize(b[1])===normalize(ref[1])):-1;
 if(bi>=0&&+ref[2]>=1&&+ref[2]<=bibleBooks[bi][2])add('Bíblia',q,'Abrir referência',()=>gotoVerse({bookIndex:bi,book:bibleBooks[bi][1],osis:bibleBooks[bi][0],chapter:+ref[2],verse:+ref[3]||1,version:bibleVersion.value}));
 for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(!k.startsWith('bereia:bible:v4:'))continue;const [, , ,ver,osis,ch]=k.split(':'),book=bibleBooks.findIndex(b=>b[0]===osis);if(book<0)continue;for(const v of read(k,[]))add('Bíblia',`${bibleBooks[book][1]} ${ch}:${v.number}`,v.text,()=>gotoVerse({bookIndex:book,book:bibleBooks[book][1],osis,chapter:+ch,verse:v.number,text:v.text,version:ver}))}
 for(const x of window.BEREIA_PASSAGE_SOURCES||[])add('Arqueologia',x[3],x[4],()=>{go('archaeology');const v={book:x[0],chapter:x[1],verse:1,bookIndex:bibleBooks.findIndex(b=>b[1]===x[0])};window.selectedVerse=v;localStorage.setItem('bereia:lastVerse',JSON.stringify(v));window.BEREIA_V58_ARCH.render()});
 for(const e of window.BEREIA_PASSAGE_EVENTS||[]){for(const cat of ['História','Estudos','Lugares','Mapas','Pessoas'])add(cat,cat==='Lugares'?e.place:e.title,e.book+' '+e.from+' • '+e.history,()=>gotoVerse({book:e.book,bookIndex:bibleBooks.findIndex(b=>b[1]===e.book),chapter:e.from,verse:1,version:bibleVersion.value}))}
 for(const item of fullSearchIndex){const [,osis,ch]=item.key.split(':'),book=bibleBooks.findIndex(b=>b[0]===osis);if(book<0)continue;for(const v of item.verses||[])add('Bíblia',`${bibleBooks[book][1]} ${ch}:${v.number}`,v.text,()=>gotoVerse({bookIndex:book,book:bibleBooks[book][1],osis,chapter:+ch,verse:v.number,text:v.text,version:item.key.split(':')[0]}))}
 const box=$('#portalResults');box.replaceChildren();const title=document.createElement('p');title.textContent=q?`${Math.min(results.length,100)} resultados exibidos. ${fullSearchIndex.length?'Pesquisa na Bíblia inteira e no acervo de estudos.':'Pesquisa no acervo e nos capítulos disponíveis neste dispositivo; use “Buscar em toda a Bíblia” para ampliar.'}`:'Digite um termo ou uma referência, como João 3:16.';box.append(title);if(!q)return;
 results.slice(0,100).forEach(r=>{const b=document.createElement('button');b.className='resultCard releaseResult';b.innerHTML=`<small>${esc(r.category)}</small><strong>${esc(r.title)}</strong><p>${esc(r.text)}</p>`;b.onclick=r.action;box.append(b)});
 if(!results.length){const p=document.createElement('p');p.textContent='Nenhum resultado nesta categoria. Tente outro termo ou consulte uma referência bíblica.';box.append(p)}
}
const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function accessible(root=document){root.querySelectorAll('[onclick]:not(button):not(a):not(input):not(select):not(textarea)').forEach(el=>{if(el.querySelector('button,a,input'))return;el.setAttribute('role','button');el.tabIndex=0;if(!el.dataset.keyboard){el.dataset.keyboard='1';el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click()}})}})}
function init(){
 settings();const initialScreen=location.hash.slice(1);if(document.getElementById(initialScreen)?.classList.contains('screen'))go(initialScreen,false);const favorites=document.createElement('div');favorites.id='releaseFavorites';$('#me').append(favorites);personal();
 const cards=$('#me .grid');if(cards){cards.children[1].querySelector('p').textContent='Marcações feitas no leitor ficam neste dispositivo.';cards.children[2].querySelector('p').textContent='Acompanhe suas leituras em Missão.'}
 window.doPortalSearch=search;const fullBtn=document.createElement('button');fullBtn.id='fullBibleSearch';fullBtn.className='btn';fullBtn.textContent='Buscar em toda a Bíblia';fullBtn.onclick=searchWholeBible;const fullStatus=document.createElement('p');fullStatus.id='fullBibleSearchStatus';fullStatus.setAttribute('role','status');$('.globalSearchBox').append(fullBtn,fullStatus);$('#searchInput').addEventListener('keydown',e=>{if(e.key==='Enter')search()});$('.searchCats').querySelectorAll('button').forEach(b=>b.onclick=()=>{$('.searchCats .active')?.classList.remove('active');b.classList.add('active');search()});
 // Remove nonfunctional future-course percentages without inventing completed lessons.
 $('#mission .grid').innerHTML='<div class="releasePanel"><h2>Seu plano de leitura</h2><p>Marque os capítulos que você concluiu. O progresso é salvo neste dispositivo e incluído no backup.</p><button class="btn" id="markRead">Marcar capítulo atual como lido</button><p id="readingProgress" role="status"></p><button class="btn" onclick="go(\'bible\')">Continuar leitura</button></div><div class="releasePanel"><h2>Roteiro de estudo pessoal</h2><ol><li>Leia o capítulo e observe personagens, ações e palavras repetidas.</li><li>Consulte o contexto e compare traduções disponíveis.</li><li>Investigue as fontes e registre suas dúvidas.</li><li>Escreva suas conclusões no caderno.</li></ol><p>As trilhas de cursos completos ainda não estão disponíveis.</p></div>';
 document.querySelectorAll('#compare .compareControls select').forEach((s,i)=>{s.setAttribute('aria-label',i?'Segunda edição para comparar':'Primeira edição para comparar');s.addEventListener('change',()=>{const v=window.BEREIA_STUDY_SESSION?.getCurrent?.()||requireSelected();if(v)loadComparison(v)})});
 const progress=()=>{$('#readingProgress').textContent=read('bereia:completed:v1',[]).length+' de 1.189 capítulos marcados como lidos.'};progress();$('#markRead').onclick=()=>{const k=bibleBooks[+bibleBook.value][0]+':'+bibleChapter.value,a=read('bereia:completed:v1',[]);if(!a.includes(k))a.push(k);write('bereia:completed:v1',a);progress()};
 $('#library').querySelectorAll('.card:not([onclick])').forEach(c=>{const p=document.createElement('small');p.textContent='Informação de catálogo • não abre um leitor';c.append(p);c.style.cursor='default'});
 const privacy=document.createElement('p');privacy.innerHTML='<a href="./privacidade.html">Privacidade</a> · <a href="./suporte.html">Ajuda e suporte</a>';$('#credits').append(privacy);
 $('#toast').setAttribute('role','status');$('#toast').setAttribute('aria-live','polite');$('#note').setAttribute('aria-label','Caderno de estudo');
 window.addEventListener('hashchange',()=>{const id=location.hash.slice(1)||'home';if(document.getElementById(id)?.classList.contains('screen')&&currentScreen()!==id)go(id,false);personal()});
 window.addEventListener('online',connection);window.addEventListener('offline',connection);connection();accessible();
 const observer=new MutationObserver(records=>{records.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1)accessible(n)}))});observer.observe($('main'),{childList:true,subtree:true});
 $('#bereiaDailyDeepBtn') && ($('#bereiaDailyDeepBtn').textContent='Aprofundar mensagem');
 const badge=$('#bereiaBuildBadge');if(badge)badge.textContent='BEREIA • '+VERSION;
 if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).catch(()=>{});
}
function connection(){let el=$('#connectionStatus');if(!el){el=document.createElement('div');el.id='connectionStatus';el.setAttribute('role','status');document.body.append(el)}el.hidden=navigator.onLine;el.textContent='Sem conexão • use capítulos baixados e suas anotações.'}
init();
})();
