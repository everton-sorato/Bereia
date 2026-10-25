
(function(){
 const BUILD='V53';
 const CROSS={
  'fé':['Hebreus 11:1','Romanos 10:17','Marcos 11:24','Tiago 1:6'],
  'oração':['Filipenses 4:6-7','Mateus 6:6','1 Tessalonicenses 5:17','Jeremias 33:3'],
  'esperança':['Romanos 15:13','Isaías 40:31','Salmos 42:11','1 Pedro 1:3'],
  'salvação':['João 3:16','Romanos 10:9-10','Efésios 2:8-9','Atos 4:12'],
  'amor':['1 Coríntios 13:4-7','João 13:34-35','1 João 4:8','Romanos 5:8'],
  'paz':['João 14:27','Filipenses 4:7','Isaías 26:3','Colossenses 3:15'],
  'coragem':['Josué 1:9','Isaías 41:10','Salmos 27:1','2 Timóteo 1:7'],
  'sabedoria':['Provérbios 3:5-6','Tiago 1:5','Provérbios 4:7','Salmos 111:10'],
  'graça':['Efésios 2:8-9','2 Coríntios 12:9','Romanos 3:24','Tito 2:11'],
  'perseverança':['Tiago 1:2-4','Hebreus 12:1-2','Gálatas 6:9','Romanos 5:3-4'],
  'vida com Deus':['Salmos 119:105','João 15:5','Gálatas 2:20','Colossenses 2:6-7']
 };
 const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
 const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
 function selected(){
   const m=window.BEREIA_VERSE_ACTIONS?.selected;
   if(m&&m.size)return Array.from(m.values()).sort((a,b)=>a.bookIndex-b.bookIndex||a.chapter-b.chapter||a.verse-b.verse)[0];
   if(window.selectedVerse?.book)return window.selectedVerse;
   try{const x=JSON.parse(localStorage.getItem('bereia:lastVerse')||'null');return x?.book?x:null}catch(e){return null}
 }
 function ref(v){return v?((v.book||'')+' '+(v.chapter||'')+':'+(v.verse||'')).trim():''}
 function eventFor(v){return (window.BEREIA_PASSAGE_EVENTS||[]).find(x=>x.book===v?.book&&Number(v.chapter)>=Number(x.from)&&Number(v.chapter)<=Number(x.to))}
 function sourcesFor(v){return (window.BEREIA_PASSAGE_SOURCES||[]).filter(x=>x[0]===v?.book&&Number(v.chapter)>=Number(x[1])&&Number(v.chapter)<=Number(x[2]))}
 function contextFor(v){try{return typeof bereiaBookContext==='function'?bereiaBookContext(v.book):null}catch(e){return null}}
 function theme(v){
   const t=norm(v?.text||'');
   const rules=[['fé',/fe|crer|confia/],['oração',/oracao|orar|pedido|clama/],['esperança',/espera|esperanca|renov/],['salvação',/salv|vida eterna|redenc/],['amor',/amor|amar|amou/],['paz',/paz|inquiet|ansiedad|descanso/],['coragem',/coragem|medo|temor|forte/],['sabedoria',/sabedoria|entendimento|prudencia/],['graça',/graca|misericord/],['perseverança',/persever|tribul|prova/]];
   for(const [k,r] of rules)if(r.test(t))return k;return 'vida com Deus';
 }
 function related(v){
   const t=theme(v),r=[...(CROSS[t]||CROSS['vida com Deus'])];
   if(Number(v.verse)>1)r.unshift(v.book+' '+v.chapter+':'+(Number(v.verse)-1));
   r.unshift(v.book+' '+v.chapter+':'+v.verse);
   r.push(v.book+' '+v.chapter+':'+(Number(v.verse)+1));
   return [...new Set(r)].slice(0,8);
 }
 function meaning(v){
   const e=eventFor(v),t=theme(v);
   const base={
    'fé':'Observe como o texto trata confiança, dependência e resposta a Deus. A interpretação deve nascer do argumento da passagem, não apenas de uma frase isolada.',
    'oração':'Observe quem ora, por quê e qual resposta o texto espera. A oração bíblica aparece ligada a confiança, submissão e prática.',
    'esperança':'Leia a esperança dentro da situação enfrentada pelos primeiros leitores. Ela não elimina a dificuldade, mas muda a maneira de atravessá-la.',
    'salvação':'Identifique o problema humano, a iniciativa de Deus e a resposta esperada. Evite reduzir a passagem a uma frase motivacional.',
    'amor':'Pergunte quem deve amar, como esse amor se manifesta e quais limites o próprio contexto estabelece.',
    'paz':'Veja se a paz é apresentada como promessa, fruto da confiança, reconciliação ou resposta à ansiedade dentro daquele contexto.',
    'coragem':'Observe o motivo bíblico para não temer. Em geral, coragem não significa ausência de risco, mas fidelidade diante dele.',
    'sabedoria':'Leia os contrastes entre sabedoria, entendimento próprio, temor do Senhor e decisões concretas.',
    'graça':'Pergunte o que o texto apresenta como iniciativa de Deus e como essa graça transforma a resposta humana.',
    'perseverança':'Observe como provação, espera, maturidade e fidelidade se relacionam dentro do texto.',
    'vida com Deus':'Comece pelo que o texto afirma, identifique sua ideia principal e só depois avance para aplicação.'
   }[t];
   return base+(e?' Nesta seção, o texto está inserido em '+e.title.toLowerCase()+'.':'');
 }
 function render(){
   const root=document.getElementById('d53Root');if(!root)return;
   const v=selected();
   if(!v){root.innerHTML='<div class="d53Card"><strong>Selecione uma passagem</strong>Abra a Bíblia, toque em um versículo e depois escolha <b>Aprofundar</b>.</div>';return}
   const e=eventFor(v),ctx=contextFor(v),src=sourcesFor(v),rels=related(v);
   root.innerHTML=
    '<div class="d53Hero"><small>'+esc(ref(v))+'</small><h2>'+(esc(v.book)+' '+v.chapter)+'</h2><p>“'+esc(v.text||'Texto selecionado')+'”</p></div>'+
    '<div class="d53Tabs" id="d53Tabs">'+
      '<button class="active" data-pane="overview">Visão geral</button><button data-pane="meaning">Entenda</button><button data-pane="context">Contexto</button><button data-pane="original">Original</button><button data-pane="references">Referências</button><button data-pane="world">Mundo bíblico</button><button data-pane="create">Criar</button>'+
    '</div>'+
    '<div class="d53Pane active" data-pane-content="overview"><div class="d53Grid">'+
      '<div class="d53Card"><strong>1. O que o texto diz?</strong>'+esc(v.text||'')+'<div class="d53Notice">Leia também os versículos anteriores e posteriores antes de concluir o significado.</div></div>'+
      '<div class="d53Card"><strong>2. Onde ele se encaixa?</strong>'+(e?esc(e.history):(ctx?esc(ctx.history):'Contexto específico ainda não cadastrado para esta passagem.'))+'</div>'+
      '<div class="d53Card"><strong>3. O que investigar?</strong><div class="d53Actions"><button class="d53Btn" onclick="d53Show(\'original\')">א Ω Original</button><button class="d53Btn" onclick="d53Show(\'references\')">⇄ Referências</button><button class="d53Btn" onclick="d53Show(\'world\')">🌍 Mundo bíblico</button></div></div>'+
      '<div class="d53Card"><strong>4. Como responder?</strong>Depois de compreender o sentido do texto, transforme a verdade central em uma resposta concreta, sem substituir o significado original por uma aplicação pessoal.</div>'+
    '</div></div>'+
    '<div class="d53Pane" data-pane-content="meaning"><div class="d53Card"><strong>Entenda a passagem</strong>'+esc(meaning(v))+'</div></div>'+
    '<div class="d53Pane" data-pane-content="context"><div class="d53Grid"><div class="d53Card"><strong>📚 Contexto literário/histórico</strong>'+(e?esc(e.history):(ctx?esc(ctx.history):'Em expansão.'))+'</div><div class="d53Card"><strong>🗺️ Geografia relacionada</strong>'+(e?esc(e.place):(ctx?esc(ctx.geo):'Em expansão.'))+'</div>'+(e?'<div class="d53Card"><strong>⚖️ Limite da evidência</strong>'+esc(e.evidence)+'</div>':'')+'</div></div>'+
    '<div class="d53Pane" data-pane-content="original"><div class="d53Card"><strong>א Ω Texto original</strong>Abra a análise hebraica ou grega da passagem selecionada.<div class="d53Actions" style="margin-top:9px"><button class="d53Btn primary" onclick="openOriginalsSelected()">Abrir Hebraico / Grego</button></div></div></div>'+
    '<div class="d53Pane" data-pane-content="references"><div class="d53Card"><strong>⇄ Passagens relacionadas</strong><div class="d53Refs">'+rels.map(r=>'<button class="d53Ref" onclick="BEREIA_CORE_V46?.openReference?.(\''+esc(r).replace(/'/g,"\\'")+'\')">'+esc(r)+'</button>').join('')+'</div><div class="d53Notice">As referências acima combinam contexto imediato e conexões temáticas. Elas não substituem a leitura do contexto de cada passagem.</div></div></div>'+
    '<div class="d53Pane" data-pane-content="world"><div class="d53Grid"><div class="d53Card"><strong>⌖ Geografia</strong>'+(e?esc(e.place):(ctx?esc(ctx.geo):'Dados específicos em expansão.'))+'<div class="d53Actions" style="margin-top:9px"><button class="d53Btn" onclick="BEREIA_V52.openContext(\'geography\')">Abrir Geografia</button></div></div><div class="d53Card"><strong>🏺 Arqueologia</strong>'+(src.length?(src.length+' fonte(s) específica(s) cadastrada(s).'):'Nenhuma evidência específica cadastrada para este trecho.')+'<div class="d53Actions" style="margin-top:9px"><button class="d53Btn" onclick="BEREIA_V52.openContext(\'archaeology\')">Abrir Arqueologia</button></div></div><div class="d53Card"><strong>🗺 Mapas</strong>Visualize os lugares relacionados à passagem e, quando disponível, abra o mapa interativo.<div class="d53Actions" style="margin-top:9px"><button class="d53Btn" onclick="BEREIA_V52.openContext(\'maps\')">Abrir Mapas</button></div></div><div class="d53Card"><strong>⌛ Cronologia</strong>Consulte o período da narrativa dentro da cronologia geral do BEREIA.<div class="d53Actions" style="margin-top:9px"><button class="d53Btn" onclick="go(\'timeline\')">Abrir Cronologia</button></div></div></div></div>'+
    '<div class="d53Pane" data-pane-content="create"><div class="d53Grid"><div class="d53Card"><strong>📖 Devocional</strong>Reflexão curta, aplicação e oração.<div class="d53Actions" style="margin-top:9px"><button class="d53Btn" onclick="BEREIA_V52.openMessage(\'devotional\')">Criar Devocional</button></div></div><div class="d53Card"><strong>🎙 Pregação</strong>Tema, introdução, pontos, referências, aplicação e conclusão.<div class="d53Actions" style="margin-top:9px"><button class="d53Btn" onclick="BEREIA_V52.openMessage(\'sermon\')">Criar Pregação</button></div></div><div class="d53Card"><strong>💬 WhatsApp</strong>Mensagem curta pronta para encaminhar.<div class="d53Actions" style="margin-top:9px"><button class="d53Btn" onclick="BEREIA_V52.openMessage(\'whatsapp\')">Criar WhatsApp</button></div></div><div class="d53Card"><strong>🖼 Imagem</strong>Abra o estúdio de imagens com o texto selecionado.<div class="d53Actions" style="margin-top:9px"><button class="d53Btn" onclick="BEREIA_STUDY_CREATE?.openImage?.()">Criar Imagem</button></div></div></div></div>';
   const tabs=document.getElementById('d53Tabs');tabs?.addEventListener('click',e=>{const b=e.target.closest('[data-pane]');if(b)show(b.dataset.pane)});
 }
 function show(k){
   document.querySelectorAll('#dossier53 .d53Pane').forEach(x=>x.classList.toggle('active',x.dataset.paneContent===k));
   document.querySelectorAll('#dossier53 .d53Tabs button').forEach(x=>x.classList.toggle('active',x.dataset.pane===k));
 }
 window.d53Show=show;
 window.openDossier=function(){if(!selected()){if(typeof toast==='function')toast('Selecione um versículo primeiro');return}if(typeof go==='function')go('dossier53');setTimeout(render,0)};
 window.deepStudySelected=window.openDossier;

 function auditUI(){
   // Route aliases for legacy buttons.
   const oldGo=window.go;
   if(typeof oldGo==='function'&&!oldGo.__v53){
     const wrapped=function(id){const map={atlas:'maps',search:'discover',plans:'mission'};const a=[...arguments];a[0]=map[id]||id;const r=oldGo.apply(this,a);if(a[0]==='dossier53')setTimeout(render,0);return r};wrapped.__v53=true;window.go=wrapped;
   }
   // Hide visible placeholder cards/modules that do not have a real action.
   document.querySelectorAll('.module,.card,.pathCard').forEach(el=>{
     const t=norm(el.textContent);
     const placeholder=/estrutura pronta|conector preparado|modulo preparado/.test(t);
     if(placeholder&&!el.onclick&&!el.getAttribute('onclick'))el.style.display='none';
   });
   // Rewire central study card to dossier.
   document.querySelectorAll('.pathCard').forEach(el=>{const t=norm(el.textContent);if(t.includes('estudar uma passagem'))el.onclick=()=>window.openDossier()});
   // Rename main dock action consistently.
   document.querySelectorAll('#verseDock .actions button').forEach(b=>{if(norm(b.textContent)==='originais'){b.textContent='Aprofundar';b.onclick=()=>window.openDossier()}});
   const badge=document.getElementById('bereiaBuildBadge');if(badge)badge.textContent='BEREIA • '+BUILD;
 }
 window.BEREIA_CORE_V53={render,show,auditUI};
 
 window.addEventListener('load',()=>{setTimeout(auditUI,250);setTimeout(auditUI,900);setTimeout(auditUI,1800)});setTimeout(auditUI,700);
})();
