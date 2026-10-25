
(function(){
 function selectedBookName(){
  const sel=document.getElementById('bibleBook');if(!sel)return '';
  return sel.options[sel.selectedIndex]?.textContent||'';
 }
 function syncSelection(){
  if(typeof bereiaSelected==='undefined'||!bereiaSelected?.el)return;
  const name=selectedBookName(),ch=Number(document.getElementById('bibleChapter')?.value||0);
  bereiaSelected.book=name;bereiaSelected.chapter=ch;
  bereiaSelected.ref=name+' '+ch+':'+bereiaSelected.verse;
  const t=document.getElementById('deepSelectionText');if(t)t.textContent=bereiaSelected.ref;
 }
 function buildStudyNav(){
  const modal=document.getElementById('bereiaOriginalModal'),wrap=modal?.querySelector('.bomWrap'),verse=document.getElementById('bomVerse');if(!wrap||!verse)return;
  let nav=document.getElementById('bereiaStudyNavV36');
  if(!nav){nav=document.createElement('nav');nav.id='bereiaStudyNavV36';nav.innerHTML='<button data-v36="meaning">Significado</button><button data-v36="original">Original</button><button data-v36="context">Contexto</button><button data-v36="history">História & Arqueologia</button>';verse.insertAdjacentElement('beforebegin',nav);nav.addEventListener('click',e=>{const b=e.target.closest('button');if(b)showPane(b.dataset.v36)})}
  let meaning=document.getElementById('v36Meaning');if(!meaning){meaning=document.createElement('section');meaning.id='v36Meaning';meaning.className='v36-study-pane';const intro=document.getElementById('bereiaStudyIntro')||verse;intro.insertAdjacentElement('afterend',meaning)}
  [verse,document.getElementById('bereiaStudyIntro')].forEach(x=>x&&x.classList.add('v36-study-pane'));
  const original=[document.getElementById('bomLang'),document.getElementById('bomStatus'),document.getElementById('bomWords'),document.getElementById('bomSource'),document.getElementById('bomNotice')];original.forEach(x=>x&&x.classList.add('v36-study-pane','v36-original'));
  const context=document.getElementById('bereiaVerseContext');if(context)context.classList.add('v36-study-pane','v36-context');
  const s=typeof bereiaSelected!=='undefined'?bereiaSelected:{};
  meaning.innerHTML='<b>'+((s.ref)||'Versículo selecionado')+'</b><br>'+((s.text)||'')+'<div class="v36-source-note">Leia primeiro o próprio texto. As demais abas acrescentam dados verificáveis; quando o BEREIA não possuir informação segura, ele informa a ausência em vez de completar por suposição.</div>';
  showPane('meaning');
 }
 function showPane(k){
  const verse=document.getElementById('bomVerse'),intro=document.getElementById('bereiaStudyIntro'),meaning=document.getElementById('v36Meaning'),ctx=document.getElementById('bereiaVerseContext');
  document.querySelectorAll('#bereiaOriginalModal .v36-study-pane').forEach(x=>x.classList.remove('active'));
  if(k==='meaning'){verse?.classList.add('active');intro?.classList.add('active');meaning?.classList.add('active')}
  if(k==='original')document.querySelectorAll('#bereiaOriginalModal .v36-original').forEach(x=>x.classList.add('active'));
  if(k==='context')ctx?.classList.add('active');
  if(k==='history')ctx?.classList.add('active');
  document.querySelectorAll('#bereiaStudyNavV36 button').forEach(b=>b.classList.toggle('active',b.dataset.v36===k));
 }
 const old=window.openOriginalStudy;
 window.openOriginalStudy=function(){syncSelection();const r=typeof old==='function'?old.apply(this,arguments):undefined;setTimeout(()=>{syncSelection();if(typeof bereiaInjectVerseContext==='function')bereiaInjectVerseContext();setTimeout(buildStudyNav,20)},50);return r};
 async function dailyDeep(){
  if(typeof openDailyVerse==='function')await openDailyVerse();
  let tries=0;const find=()=>{const d=typeof bereiaDailyToday==='function'?bereiaDailyToday():null,el=document.querySelector('#bibleReader [data-verse="'+Number(d?.verse||0)+'"]');if(el){if(typeof selectBereiaVerse==='function')selectBereiaVerse(el);syncSelection();openOriginalStudy();return}if(tries++<10)setTimeout(find,250)};setTimeout(find,100);
 }
 function dailyButton(){
  const actions=document.querySelector('#bereiaDailyCover .bdcActions');if(!actions||document.getElementById('bereiaDailyDeepBtn'))return;
  const b=document.createElement('button');b.id='bereiaDailyDeepBtn';b.type='button';b.textContent='🔎 Entenda esta mensagem';b.onclick=e=>{e.stopPropagation();dailyDeep()};actions.appendChild(b);
 }
 window.addEventListener('load',()=>{dailyButton();const b=document.getElementById('bereiaBuildBadge');if(b)b.textContent='BEREIA • V36'});
})();
