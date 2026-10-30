
(function(){
 const BUILD='V52';
 const themeRefs={
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
 const coords={
  'jerusalém':[31.778,35.235],'jerico':[31.871,35.444],'jericó':[31.871,35.444],'jordão':[31.84,35.55],
  'canaã':[31.8,35.2],'canaa':[31.8,35.2],'egito':[30.044,31.236],'sinai':[28.539,33.975],
  'belém':[31.705,35.202],'nazare':[32.700,35.303],'nazaré':[32.700,35.303],'galileia':[32.82,35.50],
  'judeia':[31.62,35.13],'samaria':[32.28,35.20],'cesareia':[32.50,34.89],'damasco':[33.513,36.292],
  'antioquia':[36.20,36.16],'corinto':[37.906,22.879],'éfeso':[37.940,27.341],'efeso':[37.940,27.341],
  'filipos':[41.013,24.286],'tessalônica':[40.640,22.944],'roma':[41.9028,12.4964],
  'babilônia':[32.542,44.421],'ninive':[36.36,43.15],'nínive':[36.36,43.15],'laquis':[31.565,34.849],
  'hebrom':[31.532,35.099],'israel':[31.8,35.0],'judá':[31.6,35.1],'juda':[31.6,35.1]
 };
 let currentMessageText='';
 const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
 const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
 function selectedAll(){
   const m=window.BEREIA_VERSE_ACTIONS?.selected;
   if(m&&m.size)return Array.from(m.values()).sort((a,b)=>a.bookIndex-b.bookIndex||a.chapter-b.chapter||a.verse-b.verse);
   if(window.selectedVerse?.book)return [window.selectedVerse];
   try{const x=JSON.parse(localStorage.getItem('bereia:lastVerse')||'null');return x?.book?[x]:[]}catch(e){return []}
 }
 function first(){return selectedAll()[0]||null}
 function ref(v){return v.book+' '+v.chapter+':'+v.verse}
 function detectTheme(a){
   const t=norm(a.map(v=>v.text).join(' '));
   const rules=[['fé',/fe|crer|confia/],['oração',/oracao|orar|pedido|clama/],['esperança',/espera|esperanca|renov/],['salvação',/salv|vida eterna|redenc/],['amor',/amor|amar|amou/],['paz',/paz|inquiet|ansiedad|descanso/],['coragem',/coragem|medo|temor|forte/],['sabedoria',/sabedoria|entendimento|prudencia/],['graça',/graca|misericord/],['perseverança',/persever|tribul|prova/]];
   for(const [k,r] of rules)if(r.test(t))return k;return 'vida com Deus';
 }
 function eventFor(v){return (window.BEREIA_PASSAGE_EVENTS||[]).find(x=>x.book===v?.book&&Number(v.chapter)>=Number(x.from)&&Number(v.chapter)<=Number(x.to))}
 function sourcesFor(v){return (window.BEREIA_PASSAGE_SOURCES||[]).filter(x=>x[0]===v?.book&&Number(v.chapter)>=Number(x[1])&&Number(v.chapter)<=Number(x[2]))}
 function urlOf(x){return x.slice().reverse().find(v=>/^https?:\/\//i.test(String(v||'')))||''}
 function bookContext(v){try{return typeof bereiaBookContext==='function'?bereiaBookContext(v.book):null}catch(e){return null}}
 function reflection(theme,v){
  const m={
   'fé':'A passagem chama a confiar em Deus de forma concreta. Na Bíblia, fé não é apenas concordar com uma ideia; é orientar a vida pela confiança no caráter e na Palavra de Deus.',
   'oração':'O texto nos lembra que a oração é relacionamento e dependência. Levamos a Deus nossas necessidades e aprendemos a alinhar desejos, decisões e atitudes à sua vontade.',
   'esperança':'A mensagem convida a olhar além da circunstância imediata. A esperança bíblica se apoia no caráter de Deus e sustenta a fidelidade enquanto a resposta ainda não chegou.',
   'salvação':'O texto aponta para a iniciativa de Deus em resgatar e restaurar. A resposta humana é fé, arrependimento e uma vida que começa a ser transformada.',
   'amor':'O amor bíblico vai além de sentimento: torna-se atitude, serviço, verdade, paciência e entrega em favor do próximo.',
   'paz':'A paz apresentada pelas Escrituras não depende apenas da ausência de problemas. Ela nasce da confiança em Deus e muda a maneira de enfrentar as circunstâncias.',
   'coragem':'A passagem não diz que o medo nunca existirá; ela mostra que a presença e a direção de Deus permitem avançar com prudência e confiança.',
   'sabedoria':'O texto chama a reconhecer os limites do próprio entendimento e a buscar uma sabedoria moldada pela Palavra, pela oração e por decisões responsáveis.',
   'graça':'A mensagem destaca o favor de Deus que não pode ser comprado. Quem recebe graça é chamado a viver com humildade, gratidão e misericórdia.',
   'perseverança':'A passagem chama a permanecer firme. O processo difícil pode formar maturidade quando é atravessado com fidelidade, discernimento e esperança.',
   'vida com Deus':'O texto convida a colocar a Palavra no centro da caminhada, deixando que ela oriente pensamentos, escolhas e prioridades.'
  }[theme];
  const e=eventFor(v);return m+(e?' Neste trecho, o contexto da passagem é '+e.title.toLowerCase()+': '+e.history:'');
 }
 function application(theme){
   return {
    'fé':'Escolha hoje uma área em que você precisa confiar em Deus e dê um passo coerente com aquilo que a Palavra ensina.',
    'oração':'Transforme uma preocupação concreta em oração e depois anote qual atitude responsável você pode tomar.',
    'esperança':'Não deixe uma circunstância difícil definir toda a história. Relembre as promessas de Deus e permaneça fiel no próximo passo.',
    'salvação':'Responda ao evangelho com fé, arrependimento, gratidão e uma decisão prática de viver de modo coerente com a nova vida.',
    'amor':'Escolha alguém e transforme o amor em uma atitude concreta de cuidado, perdão, serviço ou reconciliação.',
    'paz':'Entregue a ansiedade em oração e faça o que está ao seu alcance sem tentar controlar aquilo que não está.',
    'coragem':'Enfrente uma situação que você vem evitando, com oração, prudência e confiança em Deus.',
    'sabedoria':'Antes de decidir, compare sua vontade com os princípios bíblicos e busque conselho maduro.',
    'graça':'Receba a graça com humildade e ofereça misericórdia a alguém que precisa.',
    'perseverança':'Continue fiel no que é correto mesmo quando o resultado ainda não apareceu.',
    'vida com Deus':'Escolha uma verdade do texto e transforme-a em uma decisão concreta para hoje.'
   }[theme];
 }
 function prayer(theme){
   const x={
    'fé':'Senhor, fortalece a minha fé e ajuda-me a confiar em Ti também quando eu não vejo todo o caminho.',
    'oração':'Senhor, ensina-me a levar a Ti minhas preocupações e a descansar no teu cuidado.',
    'esperança':'Senhor, renova a minha esperança e sustenta-me enquanto eu espero.',
    'salvação':'Senhor, obrigado pela tua graça. Conduze-me em fé, arrependimento e nova vida.',
    'amor':'Senhor, ensina-me a amar com verdade, paciência e atitudes.',
    'paz':'Senhor, guarda meu coração e minha mente e dá-me paz para caminhar com sabedoria.',
    'coragem':'Senhor, dá-me coragem para fazer o que é correto sem abandonar a prudência.',
    'sabedoria':'Senhor, dá-me sabedoria e humildade para escolher o caminho que te honra.',
    'graça':'Senhor, obrigado pela tua graça. Ajuda-me a viver com gratidão e misericórdia.',
    'perseverança':'Senhor, sustenta-me para que eu não desista e forma em mim maturidade.',
    'vida com Deus':'Senhor, guia meus passos pela tua Palavra e ajuda-me a viver aquilo que aprendi.'
   }[theme]||'Senhor, ajuda-me a compreender e viver tua Palavra.';
   return x+' Em nome de Jesus, amém.';
 }
 function devotionalHTML(){
   const a=selectedAll(),v=a[0],theme=detectTheme(a);
   currentMessageText='DEVOCIONAL — '+theme.toUpperCase()+'\n\n'+a.map(x=>ref(x)+'\n'+x.text).join('\n\n')+'\n\nREFLEXÃO\n'+reflection(theme,v)+'\n\nAPLICAÇÃO PARA HOJE\n'+application(theme)+'\n\nORAÇÃO\n'+prayer(theme);
   return '<div class="b52Card"><strong>📖 Texto-base</strong>'+a.map(x=>'<div class="b52Verse">“'+esc(x.text)+'”</div><div class="b52Ref">'+esc(ref(x))+'</div>').join('<hr style="border-color:#333">')+'</div>'+
    '<div class="b52Card"><strong>💡 Reflexão</strong>'+esc(reflection(theme,v))+'</div>'+
    '<div class="b52Card"><strong>🌱 Aplicação para hoje</strong>'+esc(application(theme))+'</div>'+
    '<div class="b52Card"><strong>🙏 Oração</strong>'+esc(prayer(theme))+'</div>';
 }
 function sermonHTML(){
   const a=selectedAll(),v=a[0],theme=detectTheme(a),e=eventFor(v),refs=[...(themeRefs[theme]||themeRefs['vida com Deus'])];
   const near=[v.verse>1?v.book+' '+v.chapter+':'+(v.verse-1):null,v.book+' '+v.chapter+':'+v.verse,v.book+' '+v.chapter+':'+(v.verse+1)].filter(Boolean);
   const related=[...new Set([...near,...refs])];
   const points={
    'fé':['A confiança começa no caráter de Deus','A fé precisa produzir obediência','A fé persevera quando a resposta demora'],
    'oração':['A oração nos aproxima de Deus','A oração entrega a ansiedade','A oração molda nossa resposta'],
    'esperança':['A esperança olha além do momento','A esperança se apoia em Deus','A esperança produz perseverança'],
    'salvação':['A necessidade humana','A iniciativa da graça de Deus','A resposta de fé e nova vida'],
    'amor':['O amor tem sua fonte em Deus','O amor se revela em atitudes','O amor transforma relacionamentos'],
    'paz':['A paz não depende das circunstâncias','A confiança vence a ansiedade','A paz muda nossa maneira de caminhar'],
    'coragem':['A presença de Deus enfrenta o medo','Coragem não é imprudência','A fé nos move para a ação'],
    'sabedoria':['Reconheça seus limites','Busque direção na Palavra','Transforme sabedoria em decisão'],
    'graça':['A graça é presente','A graça transforma','Quem recebe graça oferece graça'],
    'perseverança':['A dificuldade faz parte do caminho','A perseverança forma maturidade','Permaneça olhando para o propósito'],
    'vida com Deus':['A Palavra orienta o caminho','Comunhão transforma prioridades','Conhecimento precisa virar prática']
   }[theme];
   currentMessageText='ESBOÇO DE PREGAÇÃO\nTEMA: '+theme.toUpperCase()+'\nTEXTO-BASE: '+a.map(ref).join(', ')+'\n\nINTRODUÇÃO\n'+reflection(theme,v)+'\n\n1. '+points[0]+'\n2. '+points[1]+'\n3. '+points[2]+'\n\nREFERÊNCIAS\n'+related.join('\n')+'\n\nAPLICAÇÃO\n'+application(theme)+'\n\nCONCLUSÃO\nRetome o texto-base, reafirme a verdade central e convide o ouvinte a responder a Deus de forma prática.';
   return '<div class="b52Card"><strong>🎙️ Tema</strong><div style="font-size:18px;font-weight:800;color:#fff">'+esc(theme.toUpperCase())+'</div><div class="b52Ref">Texto-base: '+esc(a.map(ref).join(', '))+'</div></div>'+
    '<div class="b52Card"><strong>🟨 Introdução</strong>'+esc(reflection(theme,v))+(e?'<div class="b52Caution">Contexto: '+esc(e.title)+' — '+esc(e.history)+'</div>':'')+'</div>'+
    points.map((p,i)=>'<div class="b52Card"><strong>'+(i+1)+'️⃣ '+esc(p)+'</strong>'+(i===0?'O que o texto afirma e qual problema ou necessidade ele enfrenta.':i===1?'Como a verdade aparece no contexto e em outras passagens das Escrituras.':'Como essa verdade deve produzir resposta, mudança e compromisso.')+'</div>').join('')+
    '<div class="b52Card"><strong>🔗 Referências para desenvolver</strong><div class="b52Refs">'+related.map(r=>'<span class="b52RefChip">'+esc(r)+'</span>').join('')+'</div></div>'+
    '<div class="b52Card"><strong>🌱 Aplicação</strong>'+esc(application(theme))+'</div>'+
    '<div class="b52Card"><strong>✅ Conclusão</strong>Retome o texto-base, reafirme a verdade central e convide o ouvinte a responder a Deus de forma prática e consciente.</div>';
 }
 function whatsappHTML(){
   const a=selectedAll();
   currentMessageText=a.map(v=>'📖 *'+ref(v)+'*\n“'+v.text+'”').join('\n\n')+'\n\n✨ Que esta Palavra fortaleça o seu dia.\n— BEREIA';
   return '<div class="b52Card"><strong>💬 Pronto para WhatsApp</strong>'+a.map(v=>'<div class="b52Verse">“'+esc(v.text)+'”</div><div class="b52Ref">📖 '+esc(ref(v))+'</div>').join('<hr style="border-color:#333">')+'<div style="margin-top:12px;color:#d8ded8">✨ Que esta Palavra fortaleça o seu dia.<br>— BEREIA</div></div>';
 }
 function openMessage(kind){
   if(!first())return typeof toast==='function'?toast('Selecione um versículo primeiro'):null;
   const title=document.getElementById('b52MessageTitle'),body=document.getElementById('b52MessageBody');
   if(kind==='devotional'){title.textContent='Devocional';body.innerHTML=devotionalHTML()}
   else if(kind==='sermon'){title.textContent='Esboço de Pregação';body.innerHTML=sermonHTML()}
   else {title.textContent='WhatsApp';body.innerHTML=whatsappHTML()}
   document.getElementById('b52MessageModal').classList.add('open');document.body.style.overflow='hidden';
 }
 async function copyMessage(){try{await navigator.clipboard.writeText(currentMessageText)}catch(e){}if(typeof toast==='function')toast('Conteúdo copiado')}
 async function shareMessage(){try{if(navigator.share){await navigator.share({title:'BEREIA',text:currentMessageText});return}}catch(e){if(e?.name==='AbortError')return}copyMessage()}
 function splitPlaces(text){return [...new Set(String(text||'').replace(/\([^)]*\)/g,'').replace(/\b(e|ou|rumo a|arredores)\b/gi,',').split(/[,/;]+/).map(x=>x.trim()).filter(Boolean))]}
 function coordFor(p){const n=norm(p);for(const [k,v] of Object.entries(coords))if(n.includes(norm(k))||norm(k).includes(n))return v;return null}
 function embed(c){if(!c)return '';const [lat,lon]=c,d=.55;return 'https://www.openstreetmap.org/export/embed.html?bbox='+(lon-d)+'%2C'+(lat-d)+'%2C'+(lon+d)+'%2C'+(lat+d)+'&layer=mapnik&marker='+lat+'%2C'+lon}
 function osm(p,c){return c?'https://www.openstreetmap.org/?mlat='+c[0]+'&mlon='+c[1]+'#map=10/'+c[0]+'/'+c[1]:'https://www.openstreetmap.org/search?query='+encodeURIComponent(p)}
 function openContext(kind){
   const v=first();if(!v)return typeof toast==='function'?toast('Selecione um versículo primeiro'):null;
   const e=eventFor(v),ctx=bookContext(v),src=sourcesFor(v),placeText=e?.place||ctx?.geo||'',places=splitPlaces(placeText);
   const title=document.getElementById('b52ContextTitle'),body=document.getElementById('b52ContextBody');
   if(kind==='geography'){
     title.textContent='Geografia • '+ref(v);
     body.innerHTML='<div class="b52Card"><strong>🗺️ Região da passagem</strong>'+(placeText?esc(placeText):'Geografia específica ainda em expansão.')+'</div>'+
      (e?'<div class="b52Card"><strong>📍 Onde se encaixa</strong>'+esc(e.history)+'<div class="b52Caution">'+esc(e.evidence)+'</div></div>':'')+
      '<div class="b52Card"><strong>Lugares relacionados</strong><div class="b52Places">'+places.map(p=>'<button data-b52-place="'+esc(p)+'">'+esc(p)+'</button>').join('')+'</div><div id="b52GeoMap"></div></div>';
     const p=places.find(x=>coordFor(x))||places[0],c=coordFor(p);if(p)document.getElementById('b52GeoMap').innerHTML=c?'<iframe class="b52Map" src="'+embed(c)+'" loading="lazy"></iframe><a class="b52Source" target="_blank" rel="noopener" href="'+osm(p,c)+'">Abrir '+esc(p)+' no mapa ↗</a>':'<a class="b52Source" target="_blank" rel="noopener" href="'+osm(p,c)+'">Pesquisar '+esc(p)+' no mapa ↗</a>';
     body.querySelectorAll('[data-b52-place]').forEach(b=>b.onclick=()=>{const p=b.dataset.b52Place,c=coordFor(p),m=document.getElementById('b52GeoMap');m.innerHTML=c?'<iframe class="b52Map" src="'+embed(c)+'"></iframe><a class="b52Source" target="_blank" rel="noopener" href="'+osm(p,c)+'">Abrir '+esc(p)+' no mapa ↗</a>':'<a class="b52Source" target="_blank" rel="noopener" href="'+osm(p,c)+'">Pesquisar '+esc(p)+' no mapa ↗</a>'});
   } else if(kind==='archaeology'){
     title.textContent='Arqueologia • '+ref(v);
     body.innerHTML=(e?'<div class="b52Card"><strong>🏺 Limite da evidência</strong>'+esc(e.evidence)+'</div>':'')+
      (src.length?src.map(x=>'<div class="b52Card"><strong>🏺 '+esc(x[3])+'</strong>'+esc(x[4])+(urlOf(x)?'<a class="b52Source" href="'+esc(urlOf(x))+'" target="_blank" rel="noopener noreferrer">Consultar fonte documentada ↗</a>':'')+'</div>').join(''):'<div class="b52Card">Ainda não há um achado arqueológico específico cadastrado para esta passagem. O BEREIA não apresenta evidência sem fonte adequada.</div>');
   } else {
     title.textContent='Mapas • '+ref(v);
     const p=places.find(x=>coordFor(x))||places[0],c=coordFor(p);
     body.innerHTML='<div class="b52Card"><strong>🗺️ Passagem no mapa</strong>'+(placeText?esc(placeText):'Localização específica ainda em expansão.')+'</div>'+
       '<div class="b52Card"><div class="b52Places">'+places.map(x=>'<button data-b52-mapplace="'+esc(x)+'">'+esc(x)+'</button>').join('')+'</div><div id="b52MapHost">'+(c?'<iframe class="b52Map" src="'+embed(c)+'" loading="lazy"></iframe>':'<div class="b52Caution">Escolha um lugar acima para abrir o mapa.</div>')+'</div></div>'+
       '<div class="b52ActionsBottom"><button class="primary" onclick="go(\'maps\');document.getElementById(\'b52ContextModal\').classList.remove(\'open\');document.body.style.overflow=\'\'">Abrir Atlas BEREIA completo</button></div>';
     body.querySelectorAll('[data-b52-mapplace]').forEach(b=>b.onclick=()=>{const p=b.dataset.b52Mapplace,c=coordFor(p),h=document.getElementById('b52MapHost');h.innerHTML=c?'<iframe class="b52Map" src="'+embed(c)+'"></iframe><a class="b52Source" target="_blank" rel="noopener" href="'+osm(p,c)+'">Abrir mapa interativo ↗</a>':'<a class="b52Source" target="_blank" rel="noopener" href="'+osm(p,c)+'">Pesquisar no mapa ↗</a>'});
   }
   document.getElementById('b52ContextModal').classList.add('open');document.body.style.overflow='hidden';
 }
 function closeModal(id){document.getElementById(id)?.classList.remove('open');if(!document.querySelector('.b52Modal.open'))document.body.style.overflow=''}
 function ensureTools(){
   const bar=document.getElementById('bereiaVerseActions');if(!bar)return false;
   let tools=document.getElementById('b52VerseTools');if(!tools){tools=document.createElement('div');tools.id='b52VerseTools';tools.innerHTML='<div class="b52Label">CRIAR A PARTIR DO TEXTO</div><div class="b52Actions"><button data-b52-msg="devotional">📖 Devocional</button><button data-b52-msg="sermon">🎙 Pregação</button><button data-b52-msg="whatsapp">💬 WhatsApp</button><button class="context" data-b52-ctx="geography">⌖ Geografia</button><button class="context" data-b52-ctx="archaeology">🏺 Arqueologia</button></div>';bar.appendChild(tools)}
   if(!tools.dataset.bound){tools.dataset.bound='1';tools.addEventListener('click',e=>{const m=e.target.closest('[data-b52-msg]');if(m){e.stopPropagation();openMessage(m.dataset.b52Msg);return}const x=e.target.closest('[data-b52-ctx]');if(x){e.stopPropagation();openContext(x.dataset.b52Ctx)}})}
   return true;
 }
 document.getElementById('b52CopyMessage').onclick=copyMessage;document.getElementById('b52ShareMessage').onclick=shareMessage;
 document.addEventListener('click',e=>{const b=e.target.closest('[data-b52-close]');if(b)closeModal(b.dataset.b52Close);if(e.target.classList.contains('b52Modal'))closeModal(e.target.id)});
 window.BEREIA_V52={openMessage,openContext,ensureTools};
 function boot(){ensureTools();const badge=document.getElementById('bereiaBuildBadge');if(badge)badge.textContent='BEREIA • '+BUILD}
 
 window.addEventListener('load',()=>{setTimeout(boot,250);setTimeout(boot,900);setTimeout(boot,1800)});setInterval(()=>{if(document.getElementById('bereiaVerseActions')&&!document.getElementById('b52VerseTools'))ensureTools()},1500);
})();
