
(function(){
 const BUILD='V51';
 const COORDS={
  'jerusalém':[31.778,35.235],'jerusalem':[31.778,35.235],'jericó':[31.871,35.444],'jerico':[31.871,35.444],
  'belém':[31.705,35.202],'belem':[31.705,35.202],'nazaré':[32.700,35.303],'nazare':[32.700,35.303],
  'galileia':[32.82,35.50],'judeia':[31.62,35.13],'samaria':[32.28,35.20],'cesareia':[32.50,34.89],
  'damasco':[33.513,36.292],'antioquia':[36.20,36.16],'corinto':[37.906,22.879],'éfeso':[37.940,27.341],'efeso':[37.940,27.341],
  'filipos':[41.013,24.286],'tessalônica':[40.640,22.944],'tessalonica':[40.640,22.944],'roma':[41.9028,12.4964],
  'babilônia':[32.542,44.421],'babilonia':[32.542,44.421],'nínive':[36.36,43.15],'ninive':[36.36,43.15],
  'laquis':[31.565,34.849],'hebron':[31.532,35.099],'hebrom':[31.532,35.099],'sinai':[28.539,33.975],
  'egito':[30.044,31.236],'canãa':[31.8,35.2],'canaã':[31.8,35.2],'canaa':[31.8,35.2],
  'chipre':[35.126,33.430],'macedônia':[40.75,22.90],'macedonia':[40.75,22.90],'acaia':[37.7,22.7],
  'ásia menor':[39.0,32.0],'asia menor':[39.0,32.0],'pérsia':[32.0,53.0],'persia':[32.0,53.0],
  'mesopotâmia':[33.0,44.0],'mesopotamia':[33.0,44.0],'israel':[31.8,35.0],'judá':[31.6,35.1],'juda':[31.6,35.1]
 };
 const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
 const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
 function selected(){
   const multi=window.BEREIA_VERSE_ACTIONS?.selected;
   if(multi&&multi.size)return Array.from(multi.values()).sort((a,b)=>a.verse-b.verse)[0];
   if(window.selectedVerse?.book)return window.selectedVerse;
   if(typeof bereiaSelected!=='undefined'&&bereiaSelected?.book)return bereiaSelected;
   try{return JSON.parse(localStorage.getItem('bereia:lastVerse')||'null')}catch(e){return null}
 }
 function chapter(v){return Number(v?.chapter||0)}
 function reference(v){return v?((v.book||'')+' '+chapter(v)+':'+(v.verse||'')).trim():'Passagem não selecionada'}
 function eventFor(v){return (window.BEREIA_PASSAGE_EVENTS||[]).find(x=>x.book===v?.book&&chapter(v)>=Number(x.from)&&chapter(v)<=Number(x.to))}
 function contextFor(v){try{return typeof bereiaBookContext==='function'?bereiaBookContext(v.book):null}catch(e){return null}}
 function sourcesFor(v){return (window.BEREIA_PASSAGE_SOURCES||[]).filter(x=>x[0]===v?.book&&chapter(v)>=Number(x[1])&&chapter(v)<=Number(x[2]))}
 function sourceURL(x){const u=x.slice().reverse().find(v=>/^https?:\/\//i.test(String(v||'')));return u||''}
 function sourceLabel(x){const urlIndex=x.findIndex(v=>/^https?:\/\//i.test(String(v||'')));return urlIndex>5?String(x[urlIndex-1]||'Fonte documentada'):'Fonte documentada'}
 function splitPlaces(text){
   const raw=String(text||'').replace(/\([^)]*\)/g,'').replace(/\b(e|ou|rumo a|arredores)\b/gi,',');
   return [...new Set(raw.split(/[,/;]+/).map(x=>x.trim()).filter(x=>x&&x.length<45))];
 }
 function coordFor(place){
   const n=norm(place);
   for(const [k,v] of Object.entries(COORDS))if(n.includes(norm(k))||norm(k).includes(n))return v;
   return null;
 }
 function osmLink(place,coord){
   if(coord)return 'https://www.openstreetmap.org/?mlat='+coord[0]+'&mlon='+coord[1]+'#map=9/'+coord[0]+'/'+coord[1];
   return 'https://www.openstreetmap.org/search?query='+encodeURIComponent(place);
 }
 function embedURL(coord){if(!coord)return '';const [lat,lon]=coord,d=.65;return 'https://www.openstreetmap.org/export/embed.html?bbox='+(lon-d)+'%2C'+(lat-d)+'%2C'+(lon+d)+'%2C'+(lat+d)+'&layer=mapnik&marker='+lat+'%2C'+lon}
 function geoData(v){
   const ev=eventFor(v),ctx=contextFor(v),placeText=ev?.place||ctx?.geo||'';
   const places=splitPlaces(placeText);
   return {ev,ctx,placeText,places};
 }
 function renderGeo(){
   const box=document.getElementById('b51GeoContent');if(!box)return;
   const v=selected();if(!v){box.innerHTML='<div class="b51Empty">Selecione um versículo na Bíblia para abrir a geografia relacionada à passagem.</div>';return}
   const d=geoData(v),primary=d.places.find(p=>coordFor(p))||d.places[0]||'',coord=coordFor(primary);
   box.innerHTML='<div class="b51Hero"><small>'+esc(reference(v))+'</small><h2>'+(d.ev?esc(d.ev.title):'Contexto geográfico')+'</h2><p>'+(d.placeText?esc(d.placeText):'Os dados geográficos específicos desta passagem ainda estão em expansão.')+'</p></div>'+
   (d.places.length?'<div class="b51Card"><strong>🗺️ Lugares e regiões relacionados</strong><div class="b51Places">'+d.places.map(p=>'<button class="b51Place" data-b51-place="'+esc(p)+'">'+esc(p)+'</button>').join('')+'</div></div>':'')+
   '<div class="b51Grid" style="margin-top:10px"><div class="b51Card"><strong>📍 Onde a passagem se encaixa</strong>'+(d.ev?esc(d.ev.history):(d.ctx?esc(d.ctx.geo||d.ctx.history):'Contexto geográfico específico ainda não cadastrado.'))+'</div><div class="b51Card"><strong>⚖️ Cuidado geográfico</strong>'+(d.ev?esc(d.ev.evidence):'O BEREIA diferencia localizações bem estabelecidas de rotas e identificações debatidas.')+'</div></div>'+
   (coord?'<div style="margin-top:12px"><iframe id="b51MapFrame" loading="lazy" src="'+embedURL(coord)+'"></iframe><a class="b51Btn" target="_blank" rel="noopener" href="'+osmLink(primary,coord)+'">Abrir '+esc(primary)+' no mapa interativo ↗</a></div>':'<div class="b51Card" style="margin-top:12px"><strong>Mapa</strong><a class="b51Btn" target="_blank" rel="noopener" href="'+osmLink(primary||d.placeText,null)+'">Pesquisar esta região no OpenStreetMap ↗</a></div>');
   box.querySelectorAll('[data-b51-place]').forEach(b=>b.onclick=()=>{const p=b.dataset.b51Place,c=coordFor(p),frame=document.getElementById('b51MapFrame');if(c&&frame)frame.src=embedURL(c);else window.open(osmLink(p,c),'_blank','noopener')});
 }
 function renderArchaeology(){
   const box=document.getElementById('b51ArchContent');if(!box)return;
   const v=selected();if(!v){box.innerHTML='<div class="b51Empty">Selecione um versículo na Bíblia para consultar arqueologia e fontes relacionadas.</div>';return}
   const ev=eventFor(v),src=sourcesFor(v);
   let html='<div class="b51Hero"><small>'+esc(reference(v))+'</small><h2>Arqueologia da passagem</h2><p>'+(ev?esc(ev.evidence):'O BEREIA só exibe achados específicos quando possui uma fonte documentada relacionada à passagem.')+'</p></div>';
   if(src.length){
     html+='<div class="b51Grid">'+src.map(x=>'<div class="b51Card b51Evidence"><strong>🏺 '+esc(x[3])+'</strong><div>'+esc(x[4])+'</div><div class="b51Caution">'+esc(sourceLabel(x))+'</div>'+(sourceURL(x)?'<a target="_blank" rel="noopener noreferrer" href="'+esc(sourceURL(x))+'">Consultar fonte ↗</a>':'')+'</div>').join('')+'</div>';
   }else{
     html+='<div class="b51Empty">Ainda não há um achado arqueológico específico cadastrado para '+esc(reference(v))+'. Isso não significa ausência de contexto histórico; significa apenas que o BEREIA não vai atribuir uma evidência sem fonte adequada.</div>';
   }
   if(ev)html+='<div class="b51Card" style="margin-top:10px"><strong>📜 Contexto histórico relacionado</strong>'+esc(ev.history)+'<div class="b51Caution"><b>Limite da evidência:</b> '+esc(ev.evidence)+'</div></div>';
   box.innerHTML=html;
 }
 function mapContext(){
   const maps=document.getElementById('maps');if(!maps)return;
   let panel=document.getElementById('b51MapContext');if(!panel){panel=document.createElement('div');panel.id='b51MapContext';const lead=maps.querySelector('.lead');(lead||maps.querySelector('h1')).insertAdjacentElement('afterend',panel)}
   const v=selected();
   if(!v){panel.innerHTML='<div class="b51Card"><strong>🗺️ Atlas geral</strong>Selecione um versículo para o BEREIA relacionar a passagem a lugares, regiões e mapas.</div>';return}
   const d=geoData(v);
   panel.innerHTML='<div class="b51Hero"><small>MAPAS DA PASSAGEM • '+esc(reference(v))+'</small><h2>'+(d.ev?esc(d.ev.title):'Atlas relacionado')+'</h2><p>'+(d.placeText?esc(d.placeText):'Use os mapas gerais abaixo enquanto a indexação geográfica desta passagem é ampliada.')+'</p><div class="b51Actions"><button class="b51Btn" onclick="openPassageGeography()">Ver geografia</button> <button class="b51Btn" onclick="openPassageArchaeology()">Ver arqueologia</button></div></div>';
   const text=norm((d.ev?.title||'')+' '+(d.placeText||''));
   let cat='todos';if(/paulo|macedonia|acaia|asia menor|chipre|roma/.test(text))cat='paulo';else if(/jesus|galileia|judeia|nazare|belem/.test(text))cat='jesus';else if(/exodo|sinai|egito/.test(text))cat='exodo';else if(v.bookIndex>=39)cat='nt';
   const chip=Array.from(maps.querySelectorAll('.filterChips .chip')).find(b=>norm(b.textContent).includes(norm(cat))||(cat==='nt'&&norm(b.textContent).includes('novo testamento')));
   if(chip&&typeof filterRealMaps==='function')filterRealMaps(chip,cat);
 }
 window.openPassageGeography=function(){renderGeo();if(typeof go==='function')go('geography')};
 window.openPassageArchaeology=function(){renderArchaeology();if(typeof go==='function')go('archaeology')};
 window.openPassageMaps=function(){mapContext();if(typeof go==='function')go('maps');setTimeout(mapContext,80)};

 const oldGo=window.go;
 if(typeof oldGo==='function')window.go=function(id){
   const args=[...arguments];if(id==='atlas')args[0]='maps';
   const out=oldGo.apply(this,args);
   if(args[0]==='geography')setTimeout(renderGeo,0);
   if(args[0]==='archaeology')setTimeout(renderArchaeology,0);
   if(args[0]==='maps')setTimeout(mapContext,0);
   return out;
 };
 const oldStudy=window.studyTopic;
 window.studyTopic=function(topic){
   const n=norm(topic);
   if(n==='arqueologia')return window.openPassageArchaeology();
   if(n==='geografia'||n==='lugares')return window.openPassageGeography();
   if(n==='mapas'||n==='atlas')return window.openPassageMaps();
   return typeof oldStudy==='function'?oldStudy.apply(this,arguments):undefined;
 };
 function rewire(){
   document.querySelectorAll('.topicCard,.module,#worldDrawer button,.baActions button').forEach(el=>{
     const t=norm(el.textContent);
     if(t.includes('arqueologia'))el.onclick=()=>window.openPassageArchaeology();
     else if(t.includes('geografia')||t.includes('lugares e regioes biblicas'))el.onclick=()=>window.openPassageGeography();
     else if(t.includes('mapas')||t.includes('atlas'))el.onclick=()=>window.openPassageMaps();
   });
   const badge=document.getElementById('bereiaBuildBadge');if(badge)badge.textContent='BEREIA • '+BUILD;
 }
 window.BEREIA_GEO_ARCH_V51={selected,renderGeo,renderArchaeology,mapContext};
 
 window.addEventListener('load',()=>{setTimeout(rewire,350);setTimeout(rewire,1200)});setTimeout(rewire,700);
})();
