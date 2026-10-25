
(function(){
 function esc(s){return String(s||'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]))}
 function eventFor(s){return (window.BEREIA_PASSAGE_EVENTS||[]).find(x=>x.book===s.book&&Number(s.chapter)>=Number(x.from)&&Number(s.chapter)<=Number(x.to))}
 function sourcesFor(s){return (window.BEREIA_PASSAGE_SOURCES||[]).filter(x=>x[0]===s.book&&Number(s.chapter)>=Number(x[1])&&Number(s.chapter)<=Number(x[2]))}
 function related(s){
  const map={'Provérbios':['Tiago 1:5','Salmos 111:10','Provérbios 1:7'],'Salmos':['Filipenses 4:6-7','1 Pedro 5:7','Hebreus 13:5-6'],'João':['João 1:1-5','João 14:6','João 20:31'],'Romanos':['Efésios 2:8-10','Gálatas 2:20','Romanos 12:1-2'],'Mateus':['Lucas 6:20-49','Marcos 1:14-15','João 13:34-35'],'Isaías':['Salmos 46:1','Mateus 11:28','Romanos 8:28']};
  return map[s.book]||[];
 }
 function build(){
  const s=typeof bereiaSelected!=='undefined'?bereiaSelected:null,modal=document.getElementById('bereiaOriginalModal');if(!s||!modal)return;
  let box=document.getElementById('v40GuidedStudy');if(!box){box=document.createElement('section');box.id='v40GuidedStudy';box.className='v36-study-pane';const meaning=document.getElementById('v36Meaning')||document.getElementById('bomVerse');meaning.insertAdjacentElement('afterend',box)}
  const ev=eventFor(s),src=sourcesFor(s),rel=related(s),bookCtx=typeof bereiaBookContext==='function'?bereiaBookContext(s.book):null;
  let html='<div class="v40-guide"><div class="v40-card"><b>1. Leia o texto no contexto</b>'+esc(s.text)+'<span class="v40-badge">Texto selecionado · '+esc(s.ref)+'</span></div>';
  html+='<div class="v40-card"><b>2. O que observar</b>Identifique palavras repetidas, contrastes, ordens, promessas, causas e consequências. O BEREIA não transforma automaticamente uma frase isolada em regra sem considerar o capítulo.<span class="v40-badge">Método de leitura</span></div>';
  html+='<div class="v40-card"><b>3. Contexto do livro e da passagem</b>'+(ev?esc(ev.history)+' Local relacionado: '+esc(ev.place)+'.':bookCtx?esc(bookCtx.history)+' '+esc(bookCtx.geo):'Contexto específico ainda em expansão para esta passagem.')+'<span class="v40-badge">'+(ev?'Contexto por seção':'Contexto geral do livro')+'</span></div>';
  html+='<div class="v40-card"><b>4. História e arqueologia</b>'+(ev?esc(ev.evidence):'Ainda não há uma nota histórica específica cadastrada para esta passagem.')+(src.length?'<br><br>'+src.map(x=>'<b style="font-size:11px">'+esc(x[3])+'</b>'+esc(x[4])).join('<br>'):'')+'<span class="v40-badge">'+(src.length?'Fonte específica disponível':'Sem evidência específica cadastrada')+'</span></div>';
  html+='<div class="v40-card"><b>5. Passagens relacionadas</b>'+(rel.length?'<div class="v40-related">'+rel.map(x=>'<span>'+esc(x)+'</span>').join('')+'</div>':'Referências cruzadas específicas ainda serão ampliadas para este livro.')+'</div>';
  html+='<div class="v40-card"><b>6. Aplicação responsável</b>Pergunte: o que esta passagem revela sobre Deus, sobre as pessoas e sobre a resposta esperada do leitor? A aplicação deve nascer do sentido do texto, não substituir o seu contexto.<span class="v40-badge">Aplicação</span></div></div>';
  box.innerHTML=html;
  let nav=document.getElementById('bereiaStudyNavV36');if(nav&&!nav.querySelector('[data-v36="guide"]')){const b=document.createElement('button');b.dataset.v36='guide';b.textContent='Estudo guiado';nav.insertBefore(b,nav.firstChild)}
 }
 document.addEventListener('click',e=>{const b=e.target.closest('#bereiaStudyNavV36 button');if(!b)return;if(b.dataset.v36==='guide'){document.querySelectorAll('#bereiaOriginalModal .v36-study-pane').forEach(x=>x.classList.remove('active'));document.getElementById('v40GuidedStudy')?.classList.add('active');document.querySelectorAll('#bereiaStudyNavV36 button').forEach(x=>x.classList.toggle('active',x===b))}});
 const old=window.openOriginalStudy;window.openOriginalStudy=function(){const r=typeof old==='function'?old.apply(this,arguments):undefined;setTimeout(()=>{build();const b=document.querySelector('#bereiaStudyNavV36 [data-v36="guide"]');if(b)b.click()},150);return r};
 window.addEventListener('load',()=>{const b=document.getElementById('bereiaBuildBadge');if(b)b.textContent='BEREIA • V40'});
})();
