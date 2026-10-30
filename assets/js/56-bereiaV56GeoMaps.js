
(function(){
 const BUILD='V56';
 const P={
  'jerusalem':{label:'Jerusalém',modern:'Jerusalém',region:'Judeia / região montanhosa',lat:31.778,lon:35.235,certainty:'alta',note:'Identificação da cidade é segura; locais específicos dentro da Jerusalém antiga podem variar por período.'},
  'jerico':{label:'Jericó',modern:'Jericó / Tell es-Sultan',region:'Vale do Jordão',lat:31.871,lon:35.444,certainty:'debatida',note:'A cidade antiga é bem localizada; a correlação de estratos arqueológicos específicos com Josué 6 é debatida.'},
  'jordao':{label:'Rio Jordão',modern:'Rio Jordão',region:'Vale do Jordão',lat:31.84,lon:35.55,certainty:'regiao',note:'O rio e o vale são seguros; o ponto exato de travessia de algumas narrativas pode ser debatido.'},
  'canaa':{label:'Canaã',modern:'Levante meridional',region:'Região histórica',lat:31.8,lon:35.2,certainty:'regiao',note:'Canaã é uma região histórica ampla, não um único ponto geográfico.'},
  'egito':{label:'Egito',modern:'Egito',region:'Nordeste da África',lat:30.044,lon:31.236,certainty:'regiao',note:'Coordenada usada como referência regional; narrativas bíblicas envolvem diferentes áreas do Egito.'},
  'sinai':{label:'Sinai',modern:'Península do Sinai',region:'Egito',lat:28.54,lon:33.98,certainty:'debatida',note:'A península é identificável; a localização exata do monte Sinai possui propostas concorrentes.'},
  'mesopotamia':{label:'Mesopotâmia',modern:'Iraque e regiões vizinhas',region:'Antigo Oriente Próximo',lat:33.0,lon:44.0,certainty:'regiao',note:'Região histórica ampla entre os rios Tigre e Eufrates.'},
  'hebron':{label:'Hebrom',modern:'Hebron / al-Khalil',region:'Montanhas de Judá',lat:31.532,lon:35.099,certainty:'alta',note:'Identificação tradicional e geográfica amplamente estabelecida.'},
  'israel':{label:'Israel',modern:'Israel / territórios da região',region:'Levante',lat:31.8,lon:35.0,certainty:'regiao',note:'Usado como referência regional; fronteiras variam conforme o período bíblico.'},
  'samaria':{label:'Samaria',modern:'Sebastia / região da Samaria',region:'Montanhas centrais',lat:32.276,lon:35.189,certainty:'alta',note:'A cidade antiga de Samaria é identificada com o sítio de Sebastia; a região é mais ampla.'},
  'assiria':{label:'Assíria',modern:'Norte do Iraque',region:'Mesopotâmia setentrional',lat:36.35,lon:43.15,certainty:'regiao',note:'Referência regional ao núcleo do império neoassírio.'},
  'babilonia':{label:'Babilônia',modern:'Hillah, Iraque',region:'Mesopotâmia',lat:32.542,lon:44.421,certainty:'alta',note:'O sítio da Babilônia histórica é conhecido arqueologicamente.'},
  'persia':{label:'Pérsia',modern:'Irã',region:'Planalto iraniano',lat:32.0,lon:53.0,certainty:'regiao',note:'Referência regional ao império persa; centros administrativos eram múltiplos.'},
  'belem':{label:'Belém',modern:'Bethlehem',region:'Judeia',lat:31.705,lon:35.202,certainty:'alta',note:'Identificação tradicional da cidade é amplamente aceita.'},
  'nazare':{label:'Nazaré',modern:'Nazareth',region:'Galileia',lat:32.700,lon:35.303,certainty:'alta',note:'A localização da cidade é bem estabelecida.'},
  'judeia':{label:'Judeia',modern:'Região da Judeia',region:'Sul do Levante',lat:31.62,lon:35.13,certainty:'regiao',note:'Região histórica; limites mudaram ao longo dos períodos.'},
  'galileia':{label:'Galileia',modern:'Norte de Israel',region:'Galileia',lat:32.82,lon:35.50,certainty:'regiao',note:'Região histórica ampla; coordenada usada como centro aproximado.'},
  'cesareia':{label:'Cesareia Marítima',modern:'Caesarea',region:'Costa mediterrânea',lat:32.50,lon:34.89,certainty:'alta',note:'Sítio arqueológico e cidade romana bem localizados.'},
  'damasco':{label:'Damasco',modern:'Damascus',region:'Síria',lat:33.513,lon:36.292,certainty:'alta',note:'Cidade continuamente ocupada; localização segura.'},
  'antioquia':{label:'Antioquia da Síria',modern:'Antakya, Turquia',region:'Vale do Orontes',lat:36.20,lon:36.16,certainty:'alta',note:'Identificação da antiga Antioquia é bem estabelecida.'},
  'chipre':{label:'Chipre',modern:'Chipre',region:'Mediterrâneo oriental',lat:35.126,lon:33.430,certainty:'regiao',note:'Ilha; rotas missionárias envolveram várias cidades.'},
  'asia menor':{label:'Ásia Menor',modern:'Turquia ocidental/central',region:'Anatólia',lat:39.0,lon:32.0,certainty:'regiao',note:'Região ampla; não representa uma cidade específica.'},
  'macedonia':{label:'Macedônia',modern:'Norte da Grécia / região balcânica',region:'Macedônia romana',lat:40.75,lon:22.90,certainty:'regiao',note:'Região provincial ampla no contexto de Atos.'},
  'acaia':{label:'Acaia',modern:'Sul da Grécia',region:'Província romana da Acaia',lat:37.7,lon:22.7,certainty:'regiao',note:'Região provincial; Corinto era importante centro administrativo.'},
  'filipos':{label:'Filipos',modern:'Philippi, Grécia',region:'Macedônia',lat:41.013,lon:24.286,certainty:'alta',note:'Sítio arqueológico bem identificado.'},
  'tessalonica':{label:'Tessalônica',modern:'Thessaloniki',region:'Macedônia',lat:40.640,lon:22.944,certainty:'alta',note:'Cidade antiga sob a cidade moderna.'},
  'corinto':{label:'Corinto',modern:'Ancient Corinth, Grécia',region:'Acaia',lat:37.906,lon:22.879,certainty:'alta',note:'Sítio arqueológico bem estabelecido.'},
  'efeso':{label:'Éfeso',modern:'Selçuk, Turquia',region:'Ásia romana',lat:37.940,lon:27.341,certainty:'alta',note:'Sítio arqueológico monumental e bem identificado.'},
  'roma':{label:'Roma',modern:'Roma, Itália',region:'Lácio',lat:41.9028,lon:12.4964,certainty:'alta',note:'Localização da capital imperial é segura.'},
  'mediterraneo':{label:'Mediterrâneo',modern:'Mar Mediterrâneo',region:'Mediterrâneo oriental',lat:35.0,lon:20.0,certainty:'regiao',note:'Referência marítima ampla; rotas específicas dependem do texto e de reconstrução histórica.'},
  'esmirna':{label:'Esmirna',modern:'İzmir, Turquia',region:'Ásia romana',lat:38.4237,lon:27.1428,certainty:'alta',note:'Cidade antiga corresponde à atual İzmir.'},
  'pergamo':{label:'Pérgamo',modern:'Bergama, Turquia',region:'Ásia romana',lat:39.1214,lon:27.1778,certainty:'alta',note:'Sítio da antiga Pérgamo é bem identificado.'},
  'tiatira':{label:'Tiatira',modern:'Akhisar, Turquia',region:'Ásia romana',lat:38.92,lon:27.84,certainty:'alta',note:'Identificação com Akhisar é amplamente aceita.'},
  'sardes':{label:'Sardes',modern:'Sart, Turquia',region:'Ásia romana',lat:38.488,lon:28.040,certainty:'alta',note:'Sítio arqueológico da antiga Sardes é conhecido.'},
  'filadelfia':{label:'Filadélfia',modern:'Alaşehir, Turquia',region:'Ásia romana',lat:38.35,lon:28.52,certainty:'alta',note:'Identificação com Alaşehir é tradicionalmente aceita.'},
  'laodiceia':{label:'Laodiceia',modern:'Laodikeia, Denizli, Turquia',region:'Ásia romana',lat:37.835,lon:29.107,certainty:'alta',note:'Sítio arqueológico bem localizado.'}
 };
 const ROUTES=[
  ['Gênesis',12,36,['Canaã','Mesopotâmia','Egito']],['Gênesis',37,50,['Canaã','Egito']],
  ['Êxodo',1,15,['Egito','Sinai']],['Êxodo',16,40,['Sinai']],
  ['Josué',1,12,['Jordão','Jericó','Canaã']],
  ['2 Samuel',1,24,['Hebrom','Jerusalém','Israel']],['2 Reis',17,17,['Samaria','Assíria']],['2 Reis',24,25,['Jerusalém','Babilônia']],
  ['Esdras',1,10,['Pérsia','Babilônia','Jerusalém']],['Neemias',1,13,['Jerusalém']],
  ['Mateus',1,4,['Belém','Egito','Nazaré','Judeia','Galileia']],['Mateus',21,28,['Jerusalém','Judeia']],
  ['Lucas',1,4,['Judeia','Belém','Nazaré','Galileia']],['João',18,21,['Jerusalém']],
  ['Atos',1,7,['Jerusalém']],['Atos',8,12,['Judeia','Samaria','Cesareia','Damasco','Antioquia']],
  ['Atos',13,21,['Antioquia','Chipre','Ásia Menor','Macedônia','Acaia']],['Atos',22,28,['Jerusalém','Cesareia','Mediterrâneo','Roma']],
  ['Apocalipse',1,3,['Éfeso','Esmirna','Pérgamo','Tiatira','Sardes','Filadélfia','Laodiceia']]
 ];
 const ATLAS={
  ot:{label:'Antigo Testamento',entries:[
   ['mesopotamia','Gênesis 11:31; 24:10'],['canaa','Gênesis 12:5–9; Êxodo 6:4'],['egito','Gênesis 12:10; Êxodo 1–14'],['sinai','Êxodo 19–20; Números 10:11–12'],['jordao','Números 22:1; Josué 3'],['jerico','Josué 6'],['hebron','Gênesis 23; 2 Samuel 2:1'],['jerusalem','2 Samuel 5:6–10; 1 Reis 8'],['israel','1 Samuel 9–10; 2 Samuel 5'],['samaria','1 Reis 16:24; 2 Reis 17'],['assiria','2 Reis 17:3–6; Isaías 7–8'],['babilonia','2 Reis 24–25; Daniel 1'],['persia','Esdras 1; Ester 1']
  ]},
  nt:{label:'Novo Testamento',entries:[
   ['belem','Mateus 2:1; Lucas 2:4–7'],['nazare','Mateus 2:23; Lucas 4:16'],['galileia','Mateus 4:12–25; Marcos 1:14–39'],['judeia','Mateus 2:1; João 4:3–4'],['jerusalem','Mateus 21:1–11; Atos 2'],['samaria','João 4:4–42; Atos 8:5–25'],['cesareia','Atos 10:1–48; 23:23–35'],['damasco','Atos 9:1–25'],['antioquia','Atos 11:19–26; 13:1–3'],['chipre','Atos 13:4–12'],['asia menor','Atos 13–14; 16:6'],['filipos','Atos 16:11–40'],['tessalonica','Atos 17:1–9'],['corinto','Atos 18:1–18'],['efeso','Atos 19:1–41'],['macedonia','Atos 16:9–17:15'],['acaia','Atos 18:12–17; 2 Coríntios 1:1'],['mediterraneo','Atos 27:1–28:14'],['roma','Atos 28:14–31; Romanos 1:7'],['esmirna','Apocalipse 2:8–11'],['pergamo','Apocalipse 2:12–17'],['tiatira','Apocalipse 2:18–29'],['sardes','Apocalipse 3:1–6'],['filadelfia','Apocalipse 3:7–13'],['laodiceia','Apocalipse 3:14–22']
  ]}
 };
 let atlasTestament='ot',atlasSelectedKey=null;
 const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
 const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
 function current(){return window.BEREIA_STUDY_SESSION?.getCurrent?.()||window.selectedVerse||(()=>{try{return JSON.parse(localStorage.getItem('bereia:lastVerse')||'null')}catch(e){return null}})()}
 function ref(v){return v?((v.book||'')+' '+v.chapter+':'+v.verse):''}
 function eventFor(v){return (window.BEREIA_PASSAGE_EVENTS||[]).find(x=>x.book===v?.book&&Number(v.chapter)>=Number(x.from)&&Number(v.chapter)<=Number(x.to))}
 function routeFor(v){
   const r=ROUTES.find(x=>x[0]===v?.book&&Number(v.chapter)>=x[1]&&Number(v.chapter)<=x[2]);if(r)return r[3];
   const e=eventFor(v);if(!e)return [];
   return String(e.place||'').replace(/\([^)]*\)/g,'').replace(/\b(e|ou|rumo ao|rumo a|arredores)\b/gi,',').split(/[,/;]+/).map(x=>x.trim()).filter(Boolean);
 }
 function place(name){
   const n=norm(name);
   const aliases={'jerusalem':'jerusalem','jerico':'jerico','jordao':'jordao','canaa':'canaa','egito':'egito','sinai':'sinai','mesopotamia':'mesopotamia','hebrom':'hebron','hebron':'hebron','israel':'israel','samaria':'samaria','assiria':'assiria','babilonia':'babilonia','persia':'persia','belem':'belem','nazare':'nazare','judeia':'judeia','galileia':'galileia','cesareia':'cesareia','damasco':'damasco','antioquia':'antioquia','chipre':'chipre','asia menor':'asia menor','macedonia':'macedonia','acaia':'acaia','filipos':'filipos','tessalonica':'tessalonica','corinto':'corinto','efeso':'efeso','roma':'roma','mediterraneo':'mediterraneo','esmirna':'esmirna','pergamo':'pergamo','tiatira':'tiatira','sardes':'sardes','filadelfia':'filadelfia','laodiceia':'laodiceia'};
   const k=aliases[n]||Object.keys(P).find(k=>n.includes(k)||k.includes(n));return k?{key:k,...P[k]}:null;
 }
 function pointsFor(v){return routeFor(v).map(place).filter(Boolean)}
 function hav(a,b){
   const R=6371,toRad=x=>x*Math.PI/180,dLat=toRad(b.lat-a.lat),dLon=toRad(b.lon-a.lon);
   const q=Math.sin(dLat/2)**2+Math.cos(toRad(a.lat))*Math.cos(toRad(b.lat))*Math.sin(dLon/2)**2;
   return Math.round(2*R*Math.asin(Math.sqrt(q)));
 }
 function bbox(p){const d=p.certainty==='regiao'?1.4:.45;return [p.lon-d,p.lat-d,p.lon+d,p.lat+d]}
 function embed(p){const b=bbox(p);return 'https://www.openstreetmap.org/export/embed.html?bbox='+b[0]+'%2C'+b[1]+'%2C'+b[2]+'%2C'+b[3]+'&layer=mapnik&marker='+p.lat+'%2C'+p.lon}
 function osm(p){return 'https://www.openstreetmap.org/?mlat='+p.lat+'&mlon='+p.lon+'#map='+(p.certainty==='regiao'?7:11)+'/'+p.lat+'/'+p.lon}
 function confidence(p){
   if(p.certainty==='debatida')return '<span class="b56Confidence debatida">identificação debatida</span>';
   if(p.certainty==='regiao')return '<span class="b56Confidence regiao">referência regional</span>';
   return '<span class="b56Confidence">localização segura</span>';
 }
 function stopHTML(p,i,prev){
   const d=prev?haversineLabel(prev,p):'Ponto inicial da sequência';
   return '<div class="b56Stop"><div class="b56Dot">'+(i+1)+'</div><div><b>'+esc(p.label)+'</b><span>'+esc(p.modern)+' • '+esc(p.region)+'</span><span class="b56Distance">'+esc(d)+'</span></div></div>';
 }
 function haversineLabel(a,b){return hav(a,b)+' km aprox. em linha reta'}
 function routeTotal(pts){let t=0;for(let i=1;i<pts.length;i++)t+=hav(pts[i-1],pts[i]);return t}
 function infoHTML(p){
   return '<div class="b56PlaceInfo"><div class="b56Info"><b>Nome bíblico/histórico</b>'+esc(p.label)+'</div><div class="b56Info"><b>Referência atual</b>'+esc(p.modern)+'</div><div class="b56Info"><b>Região</b>'+esc(p.region)+'</div><div class="b56Info"><b>Grau de localização</b>'+confidence(p)+'</div></div><div class="b56Caution" style="margin-top:9px">'+esc(p.note)+'</div>';
 }
 function mapBlock(pts,selectedKey){
   const p=pts.find(x=>x.key===selectedKey)||pts[0];if(!p)return '<div class="b56Empty">Ainda não há coordenadas verificadas cadastradas para os lugares desta passagem.</div>';
   return '<div class="b56Places">'+pts.map(x=>'<button class="b56Place '+(x.key===p.key?'active':'')+'" data-b56-place="'+esc(x.key)+'">'+esc(x.label)+'</button>').join('')+'</div>'+
    '<div style="margin-top:9px"><iframe class="b56Map" loading="lazy" src="'+embed(p)+'"></iframe></div>'+
    infoHTML(p)+'<div class="b56MapActions"><a class="b56Btn primary" target="_blank" rel="noopener" href="'+osm(p)+'">Abrir mapa interativo ↗</a></div>';
 }
 function bindPlaces(root,pts,rerender){
   root.querySelectorAll('[data-b56-place]').forEach(b=>b.onclick=()=>rerender(b.dataset.b56Place));
 }
 function ensureGeo(){
   const s=document.getElementById('geography');if(!s)return null;s.classList.add('b56Ready');
   let x=document.getElementById('b56GeoLab');if(!x){x=document.createElement('div');x.id='b56GeoLab';const a=s.querySelector('.b54Trail')||s.querySelector('h1');a?.insertAdjacentElement('afterend',x)}return x;
 }
 function ensureMaps(){
   const s=document.getElementById('maps');if(!s)return null;
   let x=document.getElementById('b56MapLab');if(!x){x=document.createElement('div');x.id='b56MapLab';const a=s.querySelector('.b54Trail')||s.querySelector('h1');a?.insertAdjacentElement('afterend',x)}return x;
 }
 function renderGeo(selectedKey){
   const root=ensureGeo();if(!root)return;
   const group=ATLAS[atlasTestament]||ATLAS.ot;
   const chosen=group.entries.find(x=>x[0]===(selectedKey||atlasSelectedKey))||group.entries[0];
   if(!chosen){root.innerHTML='<div class="b56Empty">Ainda não há lugares cadastrados nesta seção.</div>';return}
   atlasSelectedKey=chosen[0];
   try{localStorage.setItem('bereia:atlas-testament',atlasTestament);localStorage.setItem('bereia:atlas-place',atlasSelectedKey)}catch(e){}
   const selected=P[chosen[0]];
   const entries=group.entries.map(([key,refs])=>'<button type="button" class="b56AtlasItem '+(key===atlasSelectedKey?'active':'')+'" data-b56-atlas-place="'+esc(key)+'"><b>'+esc(P[key].label)+'</b><span>Passagens: '+esc(refs)+'</span></button>').join('');
   root.innerHTML='<div class="b56Hero"><small>ATLAS INDEPENDENTE DA LEITURA</small><h2>Geografia BEREIA</h2><p>Lugares bíblicos e passagens organizados do Antigo Testamento ao Novo Testamento. A seleção do leitor não altera este Atlas.</p></div>'+
    '<div class="b56AtlasTabs" role="tablist" aria-label="Testamento"><button type="button" role="tab" aria-selected="'+(atlasTestament==='ot')+'" class="'+(atlasTestament==='ot'?'active':'')+'" data-b56-testament="ot">Antigo Testamento</button><button type="button" role="tab" aria-selected="'+(atlasTestament==='nt')+'" class="'+(atlasTestament==='nt'?'active':'')+'" data-b56-testament="nt">Novo Testamento</button></div>'+
    '<div class="b56Grid"><div class="b56Card"><strong>📚 Lugares e passagens • '+esc(group.label)+'</strong><div class="b56AtlasList">'+entries+'</div></div><div class="b56Card"><strong>📍 '+esc(selected.label)+'</strong><div class="b56Caution">Passagens relacionadas: '+esc(chosen[1])+'</div>'+mapBlock([selected],selected.key)+'</div></div>'+
    '<div class="b56Caution">As referências bíblicas servem como índice de consulta. Este Atlas não acompanha nem destaca o capítulo ou versículo aberto no leitor.</div>';
   root.querySelectorAll('[data-b56-testament]').forEach(b=>b.onclick=()=>{atlasTestament=b.dataset.b56Testament;atlasSelectedKey=null;renderGeo()});
   root.querySelectorAll('[data-b56-atlas-place]').forEach(b=>b.onclick=()=>renderGeo(b.dataset.b56AtlasPlace));
   bindPlaces(root,[selected],k=>renderGeo(k));
 }
 function renderMaps(selectedKey){return renderGeo(selectedKey)}
 function openGeography(){if(typeof go==='function')go('geography');setTimeout(()=>renderGeo(),0)}
 function openMaps(){return openGeography()}
 function hook(){
   window.openPassageGeography=openGeography;window.openPassageMaps=openMaps;
   const v52=window.BEREIA_V52;if(v52&&!v52.__v56){
     const old=v52.openContext;
     v52.openContext=function(k){if(k==='geography'||k==='maps')return openGeography();return old.apply(this,arguments)};
     v52.__v56=true;
   }
   const oldTopic=window.studyTopic;if(typeof oldTopic==='function'&&!oldTopic.__v56){
     const w=function(t){const n=norm(t);if(n==='geografia'||n==='lugares'||n==='mapas'||n==='atlas')return openGeography();return oldTopic.apply(this,arguments)};w.__v56=true;window.studyTopic=w;
   }
   const b=document.getElementById('bereiaBuildBadge');if(b)b.textContent='BEREIA • '+BUILD;
 }
 function refresh(){
   const active=document.querySelector('.screen.active')?.id;if(active==='geography')renderGeo();
 }
 // O Atlas não recebe nem persiste a seleção do leitor.
 window.BEREIA_V56_GEO={renderGeo,renderMaps,openGeography,openMaps,pointsFor,place};
 
 window.addEventListener('load',()=>{setTimeout(hook,260);setTimeout(hook,1100);setTimeout(refresh,1200)});setTimeout(hook,700);
})();
