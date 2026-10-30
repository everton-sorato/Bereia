/* BEREIA V62 — temas bíblicos e histórias ilustradas */
(function(){
 const TOPICS=[
  ['amor','Amor',['1 Coríntios 13:4-7','1 João 4:8','João 13:34-35']],
  ['forca','Força',['Isaías 40:31','Filipenses 4:13','Salmos 28:7']],
  ['cura','Cura',['Salmos 103:2-3','Jeremias 17:14','Tiago 5:14-15']],
  ['ansiedade','Ansiedade',['Filipenses 4:6-7','1 Pedro 5:7','Mateus 6:34']],
  ['tempos-dificeis','Tempos Difíceis',['Salmos 46:1','João 16:33','Romanos 8:28']],
  ['raiva','Raiva',['Provérbios 15:1','Efésios 4:26','Tiago 1:19-20']],
  ['vida','Vida',['João 10:10','João 14:6','Salmos 23:1']],
  ['fe','Fé',['Hebreus 11:1','Romanos 10:17','Marcos 11:24']],
  ['jesus','Jesus',['João 3:16','João 14:6','Mateus 11:28']],
  ['deus','Deus',['Êxodo 3:14','1 João 4:8','Salmos 90:2']],
  ['biblia','A Bíblia',['Salmos 119:105','2 Timóteo 3:16-17','Hebreus 4:12']],
  ['dez-mandamentos','Os Dez Mandamentos',['Êxodo 20:1-17','Deuteronômio 5:6-21','Mateus 22:37-40']],
  ['amando-a-deus','Amando a Deus',['Deuteronômio 6:5','Mateus 22:37-38','1 João 4:19']],
  ['amizade','Amizade',['Provérbios 17:17','Eclesiastes 4:9-10','João 15:13']],
  ['morte','Morte',['João 11:25-26','1 Coríntios 15:54-57','Salmos 23:4']],
  ['familia','Família',['Josué 24:15','Efésios 6:1-4','Salmos 127:3']],
  ['casamento','Casamento',['Gênesis 2:24','Efésios 5:25-28','1 Coríntios 13:4-7']]
 ];
 const STORIES=[
  {id:'pascoa',title:'A História da Páscoa',ref:'Mateus 27–28',desc:'A morte e a ressurreição de Jesus são apresentadas pelos Evangelhos como o centro da esperança cristã.',art:'cross'},
  {id:'adao-e-eva',title:'Adão e Eva',ref:'Gênesis 2–3',desc:'A narrativa da criação, das escolhas humanas e da promessa de restauração.',art:'garden'},
  {id:'arca-de-noe',title:'A Arca de Noé',ref:'Gênesis 6–9',desc:'Noé constrói a arca e atravessa o dilúvio com sua família e os animais.',art:'ark'},
  {id:'davi-e-golias',title:'Davi e Golias',ref:'1 Samuel 17',desc:'Davi enfrenta Golias confiando em Deus e sem depender da armadura do rei.',art:'giant'},
  {id:'filho-prodigo',title:'O Filho Pródigo',ref:'Lucas 15:11–32',desc:'Uma parábola de Jesus sobre afastamento, arrependimento, acolhimento e reconciliação.',art:'embrace'},
  {id:'moises',title:'Moisés e o Êxodo',ref:'Êxodo 3–14',desc:'A saída do Egito e a caminhada de Israel rumo à liberdade.',art:'exodus'},
  {id:'daniel',title:'Daniel na cova dos leões',ref:'Daniel 6',desc:'Daniel permanece fiel a Deus mesmo diante de uma ordem que tenta impedi-lo de orar.',art:'lions'},
  {id:'ester',title:'Ester e seu povo',ref:'Ester 4–8',desc:'Ester usa sua posição para interceder pelo seu povo em um momento de perigo.',art:'queen'}
 ];
 const ART={
  cross:'<circle cx="90" cy="76" r="60" fill="#f39a85"/><path d="M48 117V68h22v49M59 68V43h7v25M111 116V56h22v60M122 56V32h7v24M78 116V76h24v40M88 76V48h7v28M35 125h111" fill="none" stroke="#252720" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M34 50l-8-7m120 10 9-8M88 30l4-10" stroke="#252720" stroke-width="3" stroke-linecap="round"/>',
  garden:'<circle cx="90" cy="76" r="60" fill="#f6b287"/><path d="M111 119V46m0 15c-22 0-25-18-25-18 15-4 25 4 25 18m0 8c18-16 30-7 30-7-5 15-17 18-30 7M47 118c-4-12 2-22 11-22s15 10 11 22m-11-22V80m-8 8h16M82 119c-4-12 2-22 11-22s15 10 11 22m-11-22V79m-8 9h16M31 127h119" fill="none" stroke="#252720" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M67 90c8-8 17-8 24 0" fill="none" stroke="#252720" stroke-width="3"/>',
  ark:'<circle cx="90" cy="76" r="60" fill="#f6a27e"/><path d="M45 84h89l-10 27H59zM55 84V65h66v19M68 64V52h41v12M39 119c12-7 19 7 31 0s19 7 31 0 19 7 31 0 19 7 27 0M44 132c12-7 19 7 31 0s19 7 31 0 19 7 31 0 19 7 27 0M61 48c-2-12 8-17 18-13 5-15 26-13 29 2 12-3 18 6 14 14" fill="none" stroke="#252720" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',
  giant:'<circle cx="90" cy="76" r="60" fill="#f4a282"/><path d="M54 119l8-32 14-8 12 10 4 30M64 87l-10-17m24 9 7-18m-24 44-12 16m31-15 12 14M105 119l5-55 15-11 17 10 6 56M110 70l-9-18m24 0 7-19m-13 54 19 2m-31 15-10 16m36-16 12 16M35 128h116" fill="none" stroke="#252720" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="68" cy="69" r="4" fill="#252720"/><circle cx="126" cy="52" r="4" fill="#252720"/>',
  embrace:'<circle cx="90" cy="76" r="60" fill="#f6ab87"/><path d="M45 118V70h90v48M55 70V55h70v15M70 119c-8-11-2-23 8-24 7 0 11 5 12 12 1-9 6-14 14-12 10 3 12 15 3 24M68 126h50M82 91l8 8 9-8m-18 1-8-9m25 9 9-9M35 130h110" fill="none" stroke="#252720" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="81" cy="84" r="5" fill="none" stroke="#252720" stroke-width="3"/><circle cx="103" cy="83" r="5" fill="none" stroke="#252720" stroke-width="3"/>',
  exodus:'<circle cx="90" cy="76" r="60" fill="#f39b7b"/><path d="M34 118c12-8 18 8 30 0s18 8 30 0 18 8 30 0 18 8 30 0M39 132c12-8 18 8 30 0s18 8 30 0 18 8 30 0 18 8 30 0M90 106V55m0 0-12 13m12-13 11 13M62 105c-4-12 2-22 10-22s14 10 10 22m-10-22V67m-9 13h18M111 105c-4-12 2-22 10-22s14 10 10 22m-10-22V66m-9 13h18M45 49l8-6m78 7 8-7" fill="none" stroke="#252720" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',
  lions:'<circle cx="90" cy="76" r="60" fill="#f5ab7e"/><path d="M39 118c0-13 8-21 19-21 7-14 28-14 35 0 12 1 18 10 17 21M45 99l-8-10m27 8 1-13m14 13 10-9M58 118l-4 13m24-13 5 13M92 118c0-13 8-21 19-21 7-14 28-14 35 0 12 1 18 10 17 21M98 99l-8-10m27 8 1-13m14 13 10-9M111 118l-4 13m24-13 5 13M33 133h120" fill="none" stroke="#252720" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="53" cy="105" r="2.5" fill="#252720"/><circle cx="106" cy="105" r="2.5" fill="#252720"/>',
  queen:'<circle cx="90" cy="76" r="60" fill="#f6a38a"/><path d="M58 59l11 12 18-27 18 27 18-12-8 31H67zM69 99h72v24H69zM82 123v-15h18v15M43 130h101" fill="none" stroke="#252720" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="69" cy="59" r="3" fill="#252720"/><circle cx="87" cy="44" r="3" fill="#252720"/><circle cx="105" cy="71" r="3" fill="#252720"/><circle cx="123" cy="59" r="3" fill="#252720"/>'
 };
 const esc=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
 function illustration(type){return '<svg viewBox="0 0 180 150" role="img" aria-label="Ilustração bíblica">'+(ART[type]||ART.cross)+'</svg>'}
 function ensureStyles(){
  if(document.getElementById('bereiaV62Styles'))return;
  const s=document.createElement('style');s.id='bereiaV62Styles';s.textContent='.b62Wrap{max-width:1120px;margin:22px auto 32px;padding:0 14px;display:grid;gap:24px;color:var(--text,#f5f1e8);font-family:Inter,system-ui,sans-serif}.b62Section{border:1px solid var(--line,#292e36);border-radius:20px;background:linear-gradient(145deg,#11151a,#0d1014);padding:clamp(16px,3vw,26px)}.b62Header{margin-bottom:16px}.b62Header small{display:block;color:var(--gold,#d7b56d);font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}.b62Header h2{margin:5px 0 7px;font:700 clamp(23px,3.4vw,34px) system-ui,sans-serif;color:var(--text,#f5f1e8)}.b62Header p{margin:0;color:var(--muted,#a9a59c);font-size:13px;line-height:1.55}.b62Topics{display:flex;flex-wrap:wrap;gap:9px}.b62Topic{border:1px solid #59606b;border-radius:999px;background:transparent;color:#f2f0eb;padding:10px 16px;font:700 13px system-ui,sans-serif;cursor:pointer;transition:.18s}.b62Topic:hover,.b62Topic.active{border-color:var(--gold,#d7b56d);background:#d7b56d18;color:#f4d98e}.b62Results{display:none;margin-top:16px;border-top:1px solid var(--line,#292e36);padding-top:15px}.b62Results.open{display:block}.b62Results h3{margin:0 0 10px;color:var(--gold,#d7b56d);font:700 17px system-ui}.b62VerseGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:8px}.b62VerseCard{display:flex;justify-content:space-between;align-items:center;gap:10px;background:#14191f;border:1px solid #2d343d;border-radius:12px;padding:11px}.b62VerseCard b{color:#f2ddaa;font:700 12px system-ui}.b62VerseCard button,.b62StoryOpen{border:0;border-radius:9px;background:var(--gold,#d7b56d);color:#17130c;padding:8px 10px;font:700 10px system-ui;cursor:pointer;white-space:nowrap}.b62Stories{overflow:hidden}.b62StoryRail{display:flex;gap:14px;overflow-x:auto;padding:2px 2px 12px;scroll-snap-type:x mandatory;scrollbar-color:#6f603a transparent}.b62StoryCard{flex:0 0 224px;scroll-snap-align:start;overflow:hidden;background:#14191f;border:1px solid #2e343b;border-radius:17px;color:var(--text,#f5f1e8);cursor:pointer;text-align:left;padding:0;transition:transform .18s,border-color .18s}.b62StoryCard:hover{transform:translateY(-3px);border-color:var(--gold,#d7b56d)}.b62StoryArt{display:grid;place-items:center;height:190px;background:linear-gradient(145deg,#f5eee3,#f7dfd9);margin:10px 10px 0;border-radius:14px}.b62StoryArt svg{width:94%;height:94%}.b62StoryCard span{display:block;padding:11px 12px 14px;font:600 14px/1.35 system-ui}.b62Modal{display:none;position:fixed;inset:0;z-index:15000;background:#000c;padding:14px;overflow:auto}.b62Modal.open{display:grid;place-items:center}.b62Dialog{width:min(100%,560px);border:1px solid #51452e;border-radius:20px;background:#10151a;color:#f3eee4;padding:18px;box-shadow:0 24px 80px #0009}.b62DialogHead{display:flex;justify-content:space-between;align-items:center;gap:12px}.b62DialogHead small{color:var(--gold,#d7b56d);font-size:9px;font-weight:800;letter-spacing:.12em}.b62DialogHead button{width:38px;height:38px;border:0;border-radius:50%;background:#242b33;color:white;font-size:22px;cursor:pointer}.b62Dialog h2{font:700 24px system-ui;margin:12px 0 6px}.b62Dialog p{color:#c1c4c2;font-size:14px;line-height:1.6}.b62Dialog .b62Ref{color:#e1c577;font-size:12px;font-weight:700;margin:12px 0 16px}@media(max-width:620px){.b62StoryCard{flex-basis:190px}.b62StoryArt{height:166px}.b62Topic{padding:9px 13px;font-size:12px}}';
  document.head.appendChild(s);
 }
 function ensureContent(){
  if(document.getElementById('bereiaV62Home'))return true;
  const anchor=document.getElementById('bereiaStudyTools')||document.getElementById('bereiaSimpleEntry');if(!anchor)return false;
  ensureStyles();
  const wrap=document.createElement('div');wrap.id='bereiaV62Home';wrap.className='b62Wrap';
  wrap.innerHTML='<section class="b62Section"><div class="b62Header"><small>LEITURA POR TEMA</small><h2>Versículos da Bíblia sobre...</h2><p>Escolha um assunto para ver referências bíblicas e abrir cada passagem no leitor.</p></div><div class="b62Topics">'+TOPICS.map(t=>'<button type="button" class="b62Topic" data-b62-topic="'+esc(t[0])+'">'+esc(t[1])+'</button>').join('')+'</div><div id="b62TopicResults" class="b62Results" aria-live="polite"></div></section>'+
   '<section class="b62Section b62Stories"><div class="b62Header"><small>HISTÓRIAS BÍBLICAS</small><h2>Fé, fracasso e esperança</h2><p>Conheça histórias das Escrituras e abra o texto bíblico para ler o relato completo.</p></div><div class="b62StoryRail">'+STORIES.map(s=>'<button type="button" class="b62StoryCard" data-b62-story="'+esc(s.id)+'"><div class="b62StoryArt">'+illustration(s.art)+'</div><span>'+esc(s.title)+'</span></button>').join('')+'</div></section>';
  anchor.insertAdjacentElement('afterend',wrap);
  const modal=document.createElement('div');modal.id='b62StoryModal';modal.className='b62Modal';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.innerHTML='<div class="b62Dialog"><div class="b62DialogHead"><small>HISTÓRIA BÍBLICA • BEREIA</small><button type="button" data-b62-close aria-label="Fechar">×</button></div><h2 id="b62StoryTitle"></h2><p id="b62StoryDesc"></p><div class="b62Ref" id="b62StoryRef"></div><button type="button" class="b62StoryOpen" id="b62StoryRead">Abrir no leitor</button></div>';
  document.body.appendChild(modal);
  wrap.addEventListener('click',e=>{
   const topic=e.target.closest('[data-b62-topic]');if(topic){showTopic(topic.dataset.b62Topic);return}
   const story=e.target.closest('[data-b62-story]');if(story){showStory(story.dataset.b62Story);return}
   const open=e.target.closest('[data-b62-open-ref]');if(open)openReference(open.dataset.b62OpenRef);
  });
  modal.addEventListener('click',e=>{if(e.target===modal||e.target.closest('[data-b62-close]'))closeStory();});
  document.getElementById('b62StoryRead').onclick=()=>{const r=modal.dataset.reference;if(r)openReference(r);closeStory()};
  return true;
 }
 function showTopic(key){
  const t=TOPICS.find(x=>x[0]===key);if(!t)return;
  document.querySelectorAll('.b62Topic').forEach(b=>b.classList.toggle('active',b.dataset.b62Topic===key));
  const box=document.getElementById('b62TopicResults');box.classList.add('open');
  box.innerHTML='<h3>'+esc(t[1])+' • passagens para começar</h3><div class="b62VerseGrid">'+t[2].map(r=>'<div class="b62VerseCard"><b>'+esc(r)+'</b><button type="button" data-b62-open-ref="'+esc(r)+'">Abrir</button></div>').join('')+'</div>';
 }
 function showStory(id){
  const s=STORIES.find(x=>x.id===id);if(!s)return;
  const m=document.getElementById('b62StoryModal');m.dataset.reference=s.ref;
  document.getElementById('b62StoryTitle').textContent=s.title;
  document.getElementById('b62StoryDesc').textContent=s.desc;
  document.getElementById('b62StoryRef').textContent='Leitura sugerida: '+s.ref;
  m.classList.add('open');document.body.style.overflow='hidden';
 }
 function closeStory(){const m=document.getElementById('b62StoryModal');if(m){m.classList.remove('open');document.body.style.overflow=''}}
 function openReference(reference){
  const match=String(reference||'').match(/^(.+?)\s+(\d+)(?::(\d+))?/);if(!match)return;
  const bookName=match[1].trim(),chapter=Number(match[2]);
  const select=document.getElementById('bibleBook'),chapterSelect=document.getElementById('bibleChapter');
  if(!select||!chapterSelect){if(typeof toast==='function')toast('Abra primeiro o leitor bíblico');return}
  const index=Array.from(select.options).findIndex(o=>o.textContent.trim()===bookName);
  if(index<0){if(typeof toast==='function')toast('Esta referência ainda não está disponível no leitor');return}
  select.value=String(index);
  if(typeof renderChapterOptions==='function')renderChapterOptions(chapter);
  chapterSelect.value=String(chapter);
  try{localStorage.setItem('bereia:topic-reference',reference)}catch(e){}
  if(typeof go==='function')go('bible');
  if(typeof loadChapter==='function')loadChapter(true);
  closeStory();
  if(typeof toast==='function')toast('Abrindo '+bookName+' '+chapter+' no leitor');
 }
 function showTopicWrapper(key){showTopic(key)}
 window.BEREIA_V62={showTopic:showTopicWrapper,showStory,openReference,stories:STORIES,topics:TOPICS};
 function boot(){ensureContent()}
 window.addEventListener('load',boot);
 setTimeout(boot,700);setTimeout(boot,1500);setTimeout(boot,2600);
})();