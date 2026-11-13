/* BEREIA 1.0 preparation — V80. No tracking, accounts or advertising SDKs. */
(()=>{
'use strict';
const VERSION='140', $=s=>document.querySelector(s), esc=window.escapeHtml;
const keys=['bereia:personalStudies:v1','bereia:note','bereia:favorites','bereia:favs','bereia:highlights:v1','bereia:verseNotes:v1','bereia:collections:v1','bereia:reading','bereia:lastVerse','bereia:studySession:v1','bereia:completed:v1','bereia:font'];
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function download(name,text){const u=URL.createObjectURL(new Blob([text],{type:'application/json'})),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),30000)}
function backup(){const data={};keys.forEach(k=>{const v=localStorage.getItem(k);if(v!==null)data[k]=v});return {app:'BEREIA',schema:1,createdAt:new Date().toISOString(),data}}
function validateBackup(input){
 if(input?.app!=='BEREIA'||input.schema!==1||!input.data||typeof input.data!=='object'||Array.isArray(input.data))throw Error('Este arquivo não é um backup BEREIA compatível.');
 const entries=Object.entries(input.data);if(entries.some(([k,v])=>!keys.includes(k)||typeof v!=='string'||v.length>2000000))throw Error('O backup contém dados inválidos.');
 for(const [k,v] of entries){if(k==='bereia:note')continue;let parsed;try{parsed=JSON.parse(v)}catch{throw Error('Dado inválido: '+k)}
  if(k==='bereia:favorites'&&(!Array.isArray(parsed)||parsed.some(x=>!x||typeof x.book!=='string'||typeof x.text!=='string'||!Number.isInteger(+x.chapter)||+x.chapter<1||!Number.isInteger(+x.verse)||+x.verse<1)))throw Error('Favoritos inválidos.');
  if(k==='bereia:personalStudies:v1' && (!Array.isArray(parsed)||parsed.some(s=>!s||typeof s.id!=='string'||typeof s.title!=='string'||typeof s.note!=='string'||typeof s.find!=='string'||!s.passage||typeof s.passage.book!=='string'||typeof s.passage.text!=='string'||typeof s.passage.osis!=='string'||!Number.isInteger(s.passage.chapter)||!Number.isInteger(s.passage.verse)||!['kjv','alm1911','almeida-livre','bpm'].includes(s.passage.version))))throw Error('Estudos inválidos.');
  if(k==='bereia:reading'&&(!parsed||!Number.isInteger(parsed.book)||parsed.book<0||parsed.book>(parsed.version==='bpm'?72:65)||!Number.isInteger(+parsed.chapter)||+parsed.chapter<1||!['almeida-livre','alm1911','bpm','kjv'].includes(parsed.version)))throw Error('Preferência de leitura inválida.');
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
// One chapter service serves reading, downloads and search.
const dbCall=(mode,action)=>BereiaScripture.dbCall(mode,action);
let downloadController=null;
function offlineOptions(){
 const books=readerBooks($('#offlineVersion').value);
 $('#offlineScope').textContent='Bíblia inteira · '+books.length+' livros · '+books.reduce((sum,book)=>sum+book[2],0)+' capítulos';
 $('#offlineStatus').textContent='';
 $('#offlineInventory').textContent='Conferindo esta tradução no dispositivo…';
 $('#offlineInventory').hidden=false;
 $('#offlineDownload').disabled=true;
 $('#offlineDownload').textContent='Conferindo tradução…';
 $('#offlineProgress').hidden=true;
 offlineInventory();
}
async function offlineDownload(){
 if(downloadController)return;
 const status=$('#offlineStatus'),version=$('#offlineVersion').value;
 const books=readerBooks(version);
 const controller=downloadController=new AbortController();
 const button=$('#offlineDownload'),progress=$('#offlineProgress');
 button.disabled=true;
 button.textContent='Baixando tradução…';
 $('#offlineVersion').disabled=true;
 $('#offlineInventory').hidden=true;
 $('#offlineCancel').hidden=false;
 status.textContent='Conferindo os capítulos já salvos de '+versionLabel(version)+'…';
 try{
  const result=await BereiaScripture.downloadTranslation(version,books,{
   signal:controller.signal,
   onProgress:state=>{
    progress.hidden=false;
    progress.max=state.totalChapters;
    progress.value=state.savedChapters;
    const percent=Math.floor(state.savedChapters/state.totalChapters*100);
    status.textContent=versionLabel(version)+' · '+percent+'% · '+state.savedChapters+' de '+state.totalChapters+' capítulos salvos · '+state.completeBooks+' de '+state.totalBooks+' livros completos'+(state.book?' · '+state.book:'.');
   }
  });
  status.textContent=versionLabel(version)+' baixada por completo. '+result.totalBooks+' livros e '+result.totalChapters+' capítulos disponíveis sem internet neste dispositivo.';
 }catch(error){
  status.textContent=controller.signal.aborted
   ? 'Download pausado. Toque em continuar para baixar os capítulos restantes.'
   : error.name==='QuotaExceededError'
    ? 'Não há espaço para concluir o download. Os capítulos já salvos foram mantidos.'
    : (error.message||'Falha no download.')+' Os capítulos já salvos foram mantidos. Toque em continuar para tentar novamente.';
 }finally{
  downloadController=null;
  $('#offlineVersion').disabled=false;
  $('#offlineCancel').hidden=true;
  offlineInventory();
  readerOfflineStatus();
 }
}
let offlineInventoryRequest=0;
async function offlineInventory(){
 const el=$('#offlineInventory');
 if(!el)return;
 const request=++offlineInventoryRequest,version=$('#offlineVersion').value;
 try{
  const state=await BereiaScripture.translationInventory(version,readerBooks(version));
  if(request!==offlineInventoryRequest || version!==$('#offlineVersion').value || downloadController)return;
  const complete=state.savedChapters===state.totalChapters;
  el.hidden=false;
  el.textContent=versionLabel(version)+' · '+state.completeBooks+' de '+state.totalBooks+' livros completos · '+state.savedChapters+' de '+state.totalChapters+' capítulos salvos.';
  const button=$('#offlineDownload');
  button.disabled=complete;
  button.textContent=complete?'Tradução disponível offline':state.savedChapters?'Continuar download da Bíblia inteira':'Baixar Bíblia inteira';
  const progress=$('#offlineProgress');
  progress.hidden=!state.savedChapters;
  progress.max=state.totalChapters;
  progress.value=state.savedChapters;
 }catch{
  if(request!==offlineInventoryRequest || downloadController)return;
  el.hidden=false;
  el.textContent='Armazenamento offline indisponível neste navegador. Tente reabrir o aplicativo.';
  $('#offlineDownload').disabled=false;
  $('#offlineDownload').textContent='Tentar baixar Bíblia inteira';
 }
}
let readerInventoryRequest=0;
async function readerOfflineStatus(){
 const request=++readerInventoryRequest;
 const version=bibleVersion.value;
 let panel=$('#readerOfflinePanel');
 if(!panel){
  panel=document.createElement('div');
  panel.id='readerOfflinePanel';
  panel.className='releasePanel';
  const label=document.createElement('p');
  label.id='readerOfflineStatus';
  label.setAttribute('role','status');
  const button=document.createElement('button');
  button.type='button';
  button.className='btn';
  button.textContent='Baixar Bíblia inteira';
  button.onclick=()=>{
   if(downloadController){go('settings');return;}
   $('#offlineVersion').value=bibleVersion.value;
   offlineOptions();
   go('settings');
   offlineDownload();
  };
  panel.append(label,button);
  $('#bibleReader').before(panel);
 }
 try{
  const state=await BereiaScripture.translationInventory(version,readerBooks(version));
  if(request!==readerInventoryRequest)return;
  const complete=state.savedChapters===state.totalChapters;
  $('#readerOfflineStatus').textContent=versionLabel(version)+' · '+(complete?'Bíblia inteira disponível offline':state.savedChapters+' de '+state.totalChapters+' capítulos salvos')+' · '+state.totalBooks+' livros';
  const button=panel.querySelector('button');
  button.hidden=complete && !downloadController;
  button.textContent=downloadController?'Acompanhar download':state.savedChapters?'Continuar download da Bíblia inteira':'Baixar Bíblia inteira';
 }catch{
  if(request===readerInventoryRequest)$('#readerOfflineStatus').textContent='Não foi possível conferir a tradução salva neste dispositivo.';
 }
}
document.addEventListener('bereia:chapterloaded',()=>{offlineInventory();readerOfflineStatus()});
document.addEventListener('bereia:screenchange',e=>{
 if(e.detail.id==='bible')readerOfflineStatus();
 if(e.detail.id==='settings')offlineInventory();
});
bibleVersion.addEventListener('change',readerOfflineStatus);
let fullSearchIndex=[];
async function searchWholeBible(){
 if(!$('#searchInput').value.trim())return toast('Digite uma palavra ou referência primeiro.');
 const version=bibleVersion.value,books=readerBooks(version),status=$('#fullBibleSearchStatus'),button=$('#fullBibleSearch');button.disabled=true;
 try{
  let done=0;for(const b of books){status.textContent=`Preparando busca: ${done} de ${books.length} livros. ${b[1]}…`;await BereiaScripture.downloadBook(version,b);done++}
  fullSearchIndex=(await BereiaScripture.entries()).filter(x=>x.key.startsWith(version+':')&&validVerses(x.verses));
  status.textContent=`Busca pronta: ${fullSearchIndex.length} capítulos de ${versionLabel(version)}.`;search();
 }catch(e){status.textContent=(e.message||'Não foi possível preparar a busca.')+' Os capítulos concluídos ficam salvos para a próxima tentativa.'}finally{button.disabled=false}
}
function gotoVerse(v){if(!v)return;selectedVerse=v;window.selectedVerse=v;localStorage.setItem('bereia:lastVerse',JSON.stringify(v));window.BEREIA_STUDY_SESSION?.saveCurrent?.(v);bibleVersion.value=v.version||'almeida-livre';versionChanged(v.osis,v.chapter,false);go('bible');loadChapter(false).then(()=>{const el=$(`#bibleReader .v[data-verse="${v.verse}"]`);if(el)selectRealVerse(el,v.verse)})}
function personal(){
 const favs=read('bereia:favorites',[]),list=$('#releaseFavorites');if(!list)return;
 list.replaceChildren();if(!favs.length)list.textContent='Nenhum favorito salvo. Selecione um versículo na Bíblia para começar.';
 favs.forEach(v=>{const card=document.createElement('div');card.className='releaseFav';const b=document.createElement('button');b.className='btn';b.textContent=`${v.book} ${v.chapter}:${v.verse}`;b.onclick=()=>gotoVerse(v);const t=document.createElement('p');t.textContent=v.text;card.append(b,t);list.append(card)});
 const n=$('#favCount');if(n)n.textContent=favs.length+' passagens salvas';
}
function settings(){
 const section=document.createElement('section');section.className='screen';section.id='settings';section.innerHTML=`<h1>Ajustes e seus dados</h1><p>Gratuito e sem anúncios. BEREIA ${VERSION}.</p><div class="releasePanel"><h2>Aparência</h2><p>Escolha o visual que combina com o ambiente. A preferência fica salva neste dispositivo.</p><label for="appTheme">Tema do aplicativo</label><select id="appTheme" aria-label="Tema do aplicativo"><option value="original">Atual — escuro e dourado</option><option value="light">Claro</option><option value="tech">Tecnológico — azul e ciano</option></select></div><div class="releasePanel"><h2>Leitura</h2><label for="readerFont">Tamanho do texto bíblico</label><select id="readerFont"><option value="18">Padrão</option><option value="22">Grande</option><option value="26">Muito grande</option></select></div><div class="releasePanel"><h2>Backup do caderno</h2><p>Salve favoritos, anotações, marcações e progresso em um arquivo. Guarde-o em local seguro: ele contém seus textos pessoais. Trocar de navegador ou limpar os dados pode apagar suas anotações.</p><button class="btn" id="exportBackup">Baixar backup</button><label class="btn" for="importBackup">Escolher backup para restaurar</label><input id="importBackup" type="file" accept="application/json,.json"><p id="backupStatus" role="status"></p><button class="btn" id="restoreBackup" hidden>Confirmar restauração dos dados do arquivo</button></div><div class="releasePanel" id="offlinePanel"><h2>Baixar Bíblia por tradução</h2><p>Escolha uma tradução para guardar a Bíblia inteira neste dispositivo. Mantenha o BEREIA aberto durante o download. Você pode pausar e continuar depois.</p><label for="offlineVersion">Tradução</label><select id="offlineVersion"><option value="almeida-livre">Bíblia Livre (Almeida 1819)</option><option value="alm1911">Almeida Revista e Corrigida 1911</option><option value="kjv">King James 1769</option><option value="bpm">Bíblia Portuguesa Mundial — 73 livros</option></select><p id="offlineScope"></p><button class="btn primary" id="offlineDownload">Baixar Bíblia inteira</button><button class="btn" id="offlineCancel" hidden>Pausar download</button><progress id="offlineProgress" hidden aria-label="Progresso do download"></progress><p id="offlineStatus" role="status" aria-live="polite"></p><p id="offlineInventory"></p><p>Os textos ficam disponíveis offline. Imagens, mapas e fontes externas podem precisar de internet.</p></div><div class="releasePanel"><h2>Privacidade e ajuda</h2><a href="./privacidade.html">Política de privacidade</a> · <a href="./suporte.html">Ajuda e suporte</a><p>Você controla os dados guardados neste navegador.</p><button class="btn" id="eraseData">Apagar meus dados locais</button><p id="eraseStatus" role="status"></p><button class="btn" id="confirmErase" hidden>Confirmar exclusão local</button></div>`;
 $('main').append(section);
 section.insertBefore($('#offlinePanel'),section.querySelector('.releasePanel'));
 $('#offlineVersion').value=bibleVersion.value;
 const link=document.createElement('button');link.className='btn';link.textContent='Ajustes, offline e backup';link.onclick=()=>go('settings');$('#me').prepend(link);
 const homeLink=link.cloneNode(true);homeLink.onclick=()=>go('settings');$('#bereiaStudyTools')?.append(homeLink);
 $('#readerFont').value=localStorage.getItem('bereia:font')||'18';function font(){document.documentElement.style.setProperty('--reader-size',$('#readerFont').value+'px')}font();$('#readerFont').onchange=()=>{localStorage.setItem('bereia:font',$('#readerFont').value);font()};const themePicker=$('#appTheme');if(themePicker){themePicker.value=window.BereiaThemes?.get()||'original';themePicker.addEventListener('change',()=>window.BereiaThemes?.set(themePicker.value))}
 $('#exportBackup').onclick=()=>{download('bereia-backup-'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify(backup(),null,2));$('#backupStatus').textContent='Backup preparado para download.'};
 let pending=null;$('#importBackup').onchange=async e=>{pending=null;$('#restoreBackup').hidden=true;try{const f=e.target.files[0];if(!f)return;if(f.size>8000000)throw Error('Arquivo muito grande. Limite: 8 MB.');const x=JSON.parse(await f.text()),entries=validateBackup(x);pending=x;$('#backupStatus').textContent=entries.length+' grupos de dados válidos. Baixe um backup atual antes de confirmar: os grupos presentes no arquivo serão substituídos.';$('#restoreBackup').hidden=false}catch(err){$('#backupStatus').textContent=err.message}};
 $('#restoreBackup').onclick=()=>{try{restore(pending);$('#backupStatus').textContent='Backup restaurado. Reabra o aplicativo para atualizar todas as telas.';$('#restoreBackup').hidden=true;pending=null;$('#note').value=localStorage.getItem('bereia:note')||'';personal()}catch(e){$('#backupStatus').textContent=e.message}};
 $('#offlineDownload').onclick=offlineDownload;$('#offlineCancel').onclick=()=>downloadController?.abort();$('#offlineVersion').onchange=offlineOptions;offlineOptions();
 $('#eraseData').onclick=()=>{$('#eraseStatus').textContent='Esta ação remove anotações, favoritos, marcações e progresso deste navegador. Baixe um backup antes de confirmar.';$('#confirmErase').hidden=false};
 $('#confirmErase').onclick=()=>{keys.forEach(k=>localStorage.removeItem(k));$('#note').value='';personal();$('#eraseStatus').textContent='Dados pessoais locais apagados. Capítulos offline foram mantidos.';$('#confirmErase').hidden=true};
 offlineInventory();
}
let searchTicket=0;
async function search(){
 const ticket=++searchTicket;let cached=[];try{cached=await BereiaScripture.entries()}catch{}if(ticket!==searchTicket)return;
 const searchBooks=readerBooks(bibleVersion.value);
 const q=$('#searchInput').value.trim(),term=normalize(q),filter=$('.searchCats .active')?.textContent||'Tudo',results=[];
 const add=(category,title,text,action)=>{if((filter==='Tudo'||category===filter)&&normalize(title+' '+text).includes(term)&&!results.some(r=>r.category===category&&r.title===title))results.push({category,title,text,action});}
 const ref=q.match(/^(.+?)\s+(\d+)(?::(\d+))?$/),bi=ref?searchBooks.findIndex(b=>normalize(b[1])===normalize(ref[1])):-1;
 if(bi>=0&&+ref[2]>=1&&+ref[2]<=searchBooks[bi][2])add('Bíblia',q,'Abrir referência',()=>gotoVerse({bookIndex:bi,book:searchBooks[bi][1],osis:searchBooks[bi][0],chapter:+ref[2],verse:+ref[3]||1,version:bibleVersion.value}));
 for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(!k.startsWith('bereia:bible:v4:'))continue;const [, , ,ver,osis,ch]=k.split(':'),book=searchBooks.findIndex(b=>b[0]===osis);if(book<0||ver!==bibleVersion.value)continue;for(const v of read(k,[]))add('Bíblia',`${searchBooks[book][1]} ${ch}:${v.number}`,v.text,()=>gotoVerse({bookIndex:book,book:searchBooks[book][1],osis,chapter:+ch,verse:v.number,text:v.text,version:ver}))}
 for(const x of window.BEREIA_PASSAGE_SOURCES||[])add('Arqueologia',x[3],x[4],()=>{go('archaeology');const v={book:x[0],chapter:x[1],verse:1,bookIndex:searchBooks.findIndex(b=>b[1]===x[0])};window.selectedVerse=v;localStorage.setItem('bereia:lastVerse',JSON.stringify(v));window.BEREIA_V58_ARCH.render()});
 for(const e of window.BEREIA_PASSAGE_EVENTS||[]){for(const cat of ['História','Estudos','Lugares','Mapas','Pessoas'])add(cat,cat==='Lugares'?e.place:e.title,e.book+' '+e.from+' • '+e.history,()=>gotoVerse({book:e.book,bookIndex:searchBooks.findIndex(b=>b[1]===e.book),chapter:e.from,verse:1,version:bibleVersion.value}))}
 for(const item of cached.filter(x=>x.key.startsWith(bibleVersion.value+':')&&validVerses(x.verses))){const [,osis,ch]=item.key.split(':'),book=searchBooks.findIndex(b=>b[0]===osis);if(book<0)continue;for(const v of item.verses||[])add('Bíblia',`${searchBooks[book][1]} ${ch}:${v.number}`,v.text,()=>gotoVerse({bookIndex:book,book:searchBooks[book][1],osis,chapter:+ch,verse:v.number,text:v.text,version:item.key.split(':')[0]}))}
 const box=$('#portalResults');box.replaceChildren();const title=document.createElement('p');title.textContent=q?`${Math.min(results.length,100)} resultados exibidos. Pesquisa no acervo e nos capítulos disponíveis neste dispositivo; use “Buscar em toda a Bíblia” para ampliar.`:'Digite um termo ou uma referência, como João 3:16.';box.append(title);if(!q)return;
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
 const progress=()=>{const total=readerBooks().reduce((sum,b)=>sum+b[2],0);$('#readingProgress').textContent=read('bereia:completed:v1',[]).length+' de '+total.toLocaleString('pt-BR')+' capítulos marcados como lidos nesta edição.'};progress();$('#markRead').onclick=()=>{const k=readerBooks()[+bibleBook.value][0]+':'+bibleChapter.value,a=read('bereia:completed:v1',[]);if(!a.includes(k))a.push(k);write('bereia:completed:v1',a);progress()};
 $('#library').querySelectorAll('.card:not([onclick])').forEach(c=>{const p=document.createElement('small');p.textContent='Informação de catálogo • não abre um leitor';c.append(p);c.style.cursor='default'});
 const privacy=document.createElement('p');privacy.innerHTML='<a href="./privacidade.html">Privacidade</a> · <a href="./suporte.html">Ajuda e suporte</a>';$('#credits').append(privacy);
 $('#toast').setAttribute('role','status');$('#toast').setAttribute('aria-live','polite');$('#note').setAttribute('aria-label','Caderno de estudo');
 window.addEventListener('hashchange',()=>{const id=location.hash.slice(1)||'home';if(document.getElementById(id)?.classList.contains('screen')&&currentScreen()!==id)go(id,false);personal()});
 window.addEventListener('online',connection);window.addEventListener('offline',connection);connection();accessible();
 const observer=new MutationObserver(records=>{records.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1)accessible(n)}))});observer.observe($('main'),{childList:true,subtree:true});
 $('#bereiaDailyDeepBtn') && ($('#bereiaDailyDeepBtn').textContent='Aprofundar mensagem');
 const label='BEREIA • '+VERSION;const syncBadge=()=>{const badge=$('#bereiaBuildBadge');if(badge&&badge.textContent!==label)badge.textContent=label};syncBadge();new MutationObserver(syncBadge).observe(document.body,{childList:true,characterData:true,subtree:true})
 if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).catch(()=>{});
}
function connection(){let el=$('#connectionStatus');if(!el){el=document.createElement('div');el.id='connectionStatus';el.setAttribute('role','status');document.body.append(el)}el.hidden=navigator.onLine;el.textContent='Sem conexão • use capítulos baixados e suas anotações.'}
init();
window.addEventListener('load',()=>{const badge=$('#bereiaBuildBadge');if(badge)badge.textContent='BEREIA • '+VERSION});
})();

