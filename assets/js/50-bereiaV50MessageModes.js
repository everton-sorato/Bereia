
(function(){
 const BUILD='V50';
 let mode='simple';
 const themeRefs={
  'fé':['Hebreus 11:1','Marcos 11:24','Romanos 10:17','Tiago 1:6'],
  'oração':['Filipenses 4:6-7','1 Tessalonicenses 5:17','Mateus 6:6','Jeremias 33:3'],
  'sabedoria':['Provérbios 3:5-6','Tiago 1:5','Provérbios 4:7','Salmos 111:10'],
  'esperança':['Romanos 15:13','Isaías 40:31','Salmos 42:11','1 Pedro 1:3'],
  'salvação':['João 3:16','Romanos 10:9-10','Efésios 2:8-9','Atos 4:12'],
  'amor':['1 Coríntios 13:4-7','João 13:34-35','1 João 4:8','Romanos 5:8'],
  'paz':['João 14:27','Filipenses 4:7','Isaías 26:3','Colossenses 3:15'],
  'coragem':['Josué 1:9','Isaías 41:10','Salmos 27:1','2 Timóteo 1:7'],
  'graça':['Efésios 2:8','2 Coríntios 12:9','Romanos 3:24','Tito 2:11'],
  'perseverança':['Tiago 1:2-4','Hebreus 12:1-2','Gálatas 6:9','Romanos 5:3-4'],
  'santidade':['1 Pedro 1:15-16','Hebreus 12:14','Romanos 12:1-2','1 Tessalonicenses 4:3'],
  'vida com Deus':['Salmos 119:105','João 15:5','Gálatas 2:20','Colossenses 2:6-7']
 };
 const themeWords=[
  ['fé',/fé|crer|confia|confiar|fiel|fundamento/i],
  ['oração',/oraç|orar|pedid|suplic|clama/i],
  ['sabedoria',/sabedoria|entendimento|prudência|caminho|ensina/i],
  ['esperança',/espera|esperança|renovar|futuro|promessa/i],
  ['salvação',/salva|salvação|vida eterna|perdão|redenção/i],
  ['amor',/amor|amar|amou|caridade/i],
  ['paz',/paz|ansiedade|inquiet|descanso|alívio/i],
  ['coragem',/coragem|temor|medo|forte|força/i],
  ['graça',/graça|favor|misericórdia/i],
  ['perseverança',/persever|prova|tribula|paciência/i],
  ['santidade',/santo|santidade|transform|renova|pecado/i]
 ];
 function sel(){return window.BEREIA_VERSE_ACTIONS?.selected?Array.from(window.BEREIA_VERSE_ACTIONS.selected.values()).sort((a,b)=>a.bookIndex-b.bookIndex||a.chapter-b.chapter||a.verse-b.verse):[]}
 function ref(v){return v.book+' '+v.chapter+':'+v.verse}
 function refs(){return sel().map(ref)}
 function detectTheme(a){
  const text=a.map(v=>v.text).join(' ');
  for(const [name,re] of themeWords)if(re.test(text))return name;
  const globalTheme=(document.getElementById('bdcTheme')?.textContent||'').replace(/^Tema\s*·\s*/i,'').trim().toLowerCase();
  return globalTheme||'vida com Deus';
 }
 function mainVerse(){return sel()[0]||null}
 function contextRefs(a){
   if(!a.length)return [];
   const first=a[0],same=a.filter(v=>v.book===first.book&&v.chapter===first.chapter).map(v=>v.verse);
   const min=Math.min(...same),max=Math.max(...same),out=[];
   if(min>1)out.push(first.book+' '+first.chapter+':'+(min-1));
   out.push(first.book+' '+first.chapter+':'+min+'-'+max);
   out.push(first.book+' '+first.chapter+':'+(max+1));
   return out;
 }
 function bookContext(v){
   try{
     if(typeof bereiaBookContext==='function'){const x=bereiaBookContext(v.book);if(x)return x.history||x.summary||''}
   }catch(e){}
   const ev=(window.BEREIA_PASSAGE_EVENTS||[]).find(x=>x.book===v.book&&Number(v.chapter)>=Number(x.from)&&Number(v.chapter)<=Number(x.to));
   return ev?ev.history:'';
 }
 function sourceLinks(v){
   return (window.BEREIA_PASSAGE_SOURCES||[]).filter(x=>x[0]===v.book&&Number(v.chapter)>=Number(x[1])&&Number(v.chapter)<=Number(x[2])).slice(0,3);
 }
 function reflection(theme,v){
   const lead={
    'fé':'O texto chama o leitor a responder a Deus com confiança, não apenas com conhecimento. A fé bíblica se expressa em dependência, obediência e perseverança.',
    'oração':'A passagem nos lembra que a vida com Deus inclui levar a Ele nossas necessidades, medos e decisões, confiando que Ele ouve e conduz.',
    'sabedoria':'O texto aponta para uma sabedoria que começa reconhecendo os limites do próprio entendimento e buscando direção em Deus.',
    'esperança':'A mensagem dirige o olhar para além da circunstância imediata e convida a esperar em Deus com perseverança.',
    'salvação':'O centro da mensagem é a iniciativa de Deus em resgatar, perdoar e conduzir o ser humano a uma nova vida.',
    'amor':'O texto mostra que o amor bíblico não é apenas sentimento: ele se torna atitude, cuidado, entrega e compromisso com o próximo.',
    'paz':'A passagem aponta para uma paz que não depende apenas da ausência de problemas, mas de uma confiança amadurecida em Deus.',
    'coragem':'O texto não nega a existência do medo ou da dificuldade; ele chama a caminhar com confiança na presença e no cuidado de Deus.',
    'graça':'A mensagem destaca que a vida com Deus nasce do favor e da misericórdia divinos, e não apenas do esforço humano.',
    'perseverança':'O texto chama a continuar firme mesmo quando a resposta não é imediata, permitindo que a perseverança forme maturidade.',
    'santidade':'A passagem convida a uma vida transformada, na qual escolhas, valores e atitudes passam a refletir a vontade de Deus.',
    'vida com Deus':'A passagem convida a colocar a Palavra no centro da caminhada diária, permitindo que ela oriente decisões, atitudes e prioridades.'
   }[theme]||'A passagem convida a ler o texto com atenção, observar o seu contexto e responder a Deus de forma prática.';
   const ctx=bookContext(v);
   return lead+(ctx?' No contexto do livro, esta mensagem faz parte de um quadro maior: '+ctx:'');
 }
 function application(theme){
   return {
    'fé':'Identifique hoje uma área em que você está tentando controlar tudo sozinho. Ore, entregue essa área a Deus e dê um passo coerente com aquilo que a Palavra ensina.',
    'oração':'Separe alguns minutos para apresentar a Deus uma preocupação específica. Depois, registre uma atitude concreta que você pode tomar sem alimentar a ansiedade.',
    'sabedoria':'Antes de uma decisão importante, compare sua vontade com os princípios das Escrituras e procure conselho maduro.',
    'esperança':'Não tome uma decisão definitiva baseado apenas em um dia difícil. Relembre o que Deus já fez e continue caminhando com fidelidade.',
    'salvação':'Reavalie sua resposta ao evangelho e procure viver hoje como alguém alcançado pela graça: com gratidão, arrependimento e amor ao próximo.',
    'amor':'Transforme a leitura em uma atitude concreta de cuidado, perdão, serviço ou reconciliação.',
    'paz':'Troque a ruminação por oração e por uma ação prática. Nem tudo precisa ser resolvido hoje, mas o próximo passo pode ser dado em paz.',
    'coragem':'Escolha uma situação que você vem evitando por medo e enfrente-a com prudência, oração e confiança.',
    'graça':'Receba a graça de Deus com humildade e estenda essa mesma graça a alguém que precisa de misericórdia.',
    'perseverança':'Continue fiel no que é correto mesmo sem resultado imediato. A maturidade costuma ser formada no processo.',
    'santidade':'Observe uma área da rotina que precisa ser alinhada à Palavra e faça hoje uma mudança específica.',
    'vida com Deus':'Escolha uma verdade do texto e transforme-a em uma decisão concreta para o seu dia.'
   }[theme];
 }
 function prayer(theme){
   const core={
    'fé':'Senhor, fortalece a minha confiança em Ti. Ajuda-me a obedecer mesmo quando eu não consigo enxergar todo o caminho.',
    'oração':'Senhor, ensina-me a colocar diante de Ti minhas preocupações e a descansar no teu cuidado.',
    'sabedoria':'Senhor, dá-me sabedoria para escolher o que é correto e humildade para não depender apenas do meu próprio entendimento.',
    'esperança':'Senhor, renova minha esperança e ajuda-me a permanecer firme quando as circunstâncias tentarem me desanimar.',
    'salvação':'Senhor, obrigado pela tua graça e pelo teu chamado à nova vida. Conduze-me em arrependimento, fé e obediência.',
    'amor':'Senhor, ensina-me a amar com atitudes, paciência, verdade e serviço.',
    'paz':'Senhor, guarda meu coração e minha mente. Dá-me paz para caminhar com sabedoria em meio às preocupações.',
    'coragem':'Senhor, dá-me coragem para enfrentar o que precisa ser enfrentado sem perder a fé e a prudência.',
    'graça':'Senhor, obrigado pela tua graça. Ajuda-me a viver com humildade e a oferecer misericórdia a quem está ao meu redor.',
    'perseverança':'Senhor, sustenta-me para que eu não desista. Forma em mim constância, maturidade e fidelidade.',
    'santidade':'Senhor, transforma minha mente, minhas escolhas e minhas atitudes para que minha vida te honre.',
    'vida com Deus':'Senhor, guia meus passos pela tua Palavra e ajuda-me a viver hoje aquilo que aprendi.'
   }[theme];
   return (core||'Senhor, ajuda-me a compreender tua Palavra e a colocá-la em prática com fidelidade.')+' Em nome de Jesus, amém.';
 }
 function devotional(){
   const a=sel(),v=a[0],theme=detectTheme(a);if(!v)return '';
   return '📖 DEVOCIONAL — '+theme.toUpperCase()+'\n\n'+a.map(x=>'“'+x.text+'”\n'+ref(x)).join('\n\n')+
   '\n\n💡 REFLEXÃO\n'+reflection(theme,v)+
   '\n\n🌱 APLICAÇÃO PARA HOJE\n'+application(theme)+
   '\n\n🙏 ORAÇÃO\n'+prayer(theme)+
   '\n\n— BEREIA';
 }
 function sermon(){
   const a=sel(),v=a[0],theme=detectTheme(a);if(!v)return '';
   const related=[...(themeRefs[theme]||themeRefs['vida com Deus'])];
   const ctx=contextRefs(a);
   const unique=[...new Set([...ctx,...related])].filter(x=>!refs().includes(x)).slice(0,7);
   const pointIdeas={
    'fé':['Confiar em Deus acima das circunstâncias','A fé produz obediência','A fé persevera até o fim'],
    'oração':['A oração nos aproxima de Deus','A oração entrega a ansiedade','A oração produz dependência e paz'],
    'sabedoria':['Reconheça os limites do próprio entendimento','Busque a direção da Palavra','Transforme sabedoria em decisão'],
    'esperança':['A esperança olha além do momento presente','A esperança se apoia no caráter de Deus','A esperança produz perseverança'],
    'salvação':['A necessidade humana de redenção','A iniciativa e a graça de Deus','A resposta de fé e nova vida'],
    'amor':['O amor começa em Deus','O amor se revela em atitudes','O amor transforma relacionamentos'],
    'paz':['A paz de Deus não depende das circunstâncias','Entregue a ansiedade em oração','Viva de modo guiado pela confiança'],
    'coragem':['A presença de Deus enfrenta o medo','Coragem não é imprudência','A fé nos move para a ação'],
    'graça':['A graça é presente de Deus','A graça transforma o coração','Quem recebe graça aprende a oferecer graça'],
    'perseverança':['As provações fazem parte da caminhada','Perseverança produz maturidade','Mantenha os olhos no propósito de Deus'],
    'santidade':['Deus chama para uma vida separada','A transformação começa na mente','Santidade se manifesta nas escolhas'],
    'vida com Deus':['A Palavra orienta o caminho','A comunhão com Deus transforma prioridades','Conhecimento precisa virar prática']
   }[theme]||['Observe o que o texto afirma','Entenda o texto dentro do seu contexto','Responda com fé e prática'];
   return '🎙️ ESBOÇO DE PREGAÇÃO\n\nTEMA: '+theme.toUpperCase()+
   '\nTEXTO-BASE: '+refs().join(', ')+
   '\n\n📖 TEXTO\n'+a.map(x=>'“'+x.text+'”\n'+ref(x)).join('\n\n')+
   '\n\n🟨 INTRODUÇÃO\n'+reflection(theme,v)+
   '\n\n1️⃣ '+pointIdeas[0]+'\nExplore o que o texto diz e mostre como esse princípio aparece no contexto imediato.'+
   '\n\n2️⃣ '+pointIdeas[1]+'\nConecte a verdade central do texto com outras passagens das Escrituras, sem retirar o versículo do contexto.'+
   '\n\n3️⃣ '+pointIdeas[2]+'\nMostre de forma prática como a mensagem deve produzir resposta, mudança e compromisso.'+
   '\n\n🔗 REFERÊNCIAS PARA DESENVOLVER\n• '+unique.join('\n• ')+
   '\n\n🌱 APLICAÇÃO\n'+application(theme)+
   '\n\n✅ CONCLUSÃO\nRetome o texto-base, destaque a verdade principal e convide o ouvinte a responder a Deus de maneira prática e consciente.'+
   '\n\n— Esboço BEREIA';
 }
 function whatsapp(){
   const a=sel();if(!a.length)return '';
   return a.map(v=>'📖 *'+ref(v)+'*\n“'+v.text+'”').join('\n\n')+'\n\n✨ Que esta Palavra fortaleça o seu dia.\n— BEREIA';
 }
 function simple(){return sel().map(v=>ref(v)+' — '+v.text).join('\n\n')}
 function output(){if(mode==='devotional')return devotional();if(mode==='sermon')return sermon();if(mode==='whatsapp')return whatsapp();return simple()}
 function help(){
   const h=document.getElementById('b50ModeHelp');if(!h)return;
   const m={
    simple:'<b>Texto simples:</b> ideal para Word, anotações, documentos e qualquer lugar onde você queira apenas o texto bíblico e a referência.',
    devotional:'<b>Devocional:</b> transforma o texto em uma mensagem curta com reflexão, aplicação prática e oração.',
    sermon:'<b>Esboço de pregação:</b> organiza tema, introdução, três pontos, referências relacionadas, aplicação e conclusão.',
    whatsapp:'<b>WhatsApp:</b> deixa o versículo em um formato curto, limpo e pronto para encaminhar.'
   };h.innerHTML=m[mode]||m.simple;
 }
 function refresh(){
   const p=document.getElementById('b48CopyPreview');if(p)p.textContent=output();
   document.querySelectorAll('#b48CopyFormats [data-format]').forEach(b=>b.classList.toggle('active',b.dataset.format===mode));
   help();
 }
 function rebuild(){
   const host=document.getElementById('b48CopyFormats');if(!host)return;
   const clone=host.cloneNode(false);clone.id='b48CopyFormats';
   clone.innerHTML='<button class="b48Btn active" data-format="simple">Texto simples</button><button class="b48Btn" data-format="devotional">Devocional</button><button class="b48Btn" data-format="sermon">Esboço de pregação</button><button class="b48Btn" data-format="whatsapp">WhatsApp</button>';
   host.replaceWith(clone);
   clone.style.gridTemplateColumns='repeat(2,1fr)';
   clone.addEventListener('click',e=>{const b=e.target.closest('[data-format]');if(!b)return;mode=b.dataset.format;refresh()});
   let helpBox=document.getElementById('b50ModeHelp');if(!helpBox){helpBox=document.createElement('div');helpBox.id='b50ModeHelp';clone.insertAdjacentElement('afterend',helpBox)}
   const copy=document.getElementById('b48DoCopy'),share=document.getElementById('b48DoShareText');
   if(copy&&!copy.dataset.v50){copy.dataset.v50='1';copy.addEventListener('click',async e=>{e.preventDefault();e.stopImmediatePropagation();const t=output();try{await navigator.clipboard.writeText(t)}catch(err){const x=document.createElement('textarea');x.value=t;document.body.appendChild(x);x.select();document.execCommand('copy');x.remove()}if(typeof toast==='function')toast('Conteúdo copiado')},true)}
   if(share&&!share.dataset.v50){share.dataset.v50='1';share.addEventListener('click',async e=>{e.preventDefault();e.stopImmediatePropagation();const t=output();try{if(navigator.share){await navigator.share({title:'BEREIA • '+(mode==='sermon'?'Esboço de pregação':mode==='devotional'?'Devocional':'Bíblia'),text:t});return}}catch(err){if(err?.name==='AbortError')return}try{await navigator.clipboard.writeText(t)}catch(_){}if(typeof toast==='function')toast('Conteúdo copiado para compartilhar')},true)}
   refresh();
 }
 function wireModal(){
   const modal=document.getElementById('b48CopyModal');if(!modal)return;
   if(!modal.dataset.v50){modal.dataset.v50='1';new MutationObserver(()=>{if(modal.classList.contains('open'))setTimeout(refresh,20)}).observe(modal,{attributes:true,attributeFilter:['class']})}
 }
 function boot(){
   rebuild();wireModal();
   const b=document.getElementById('bereiaBuildBadge');if(b)b.textContent='BEREIA • '+BUILD;
 }
 window.BEREIA_MESSAGE_MODES={devotional,sermon,whatsapp,simple};
 
 window.addEventListener('load',()=>{setTimeout(boot,350);setTimeout(()=>{if(!document.getElementById('b50ModeHelp'))boot()},1100)});setTimeout(boot,750);
})();
