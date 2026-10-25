
const BEREIA_PLACES={
 "jerusalém":{lat:31.778,lon:35.235,label:"Jerusalém"},
 "jerusalem":{lat:31.778,lon:35.235,label:"Jerusalém"},
 "jericó":{lat:31.871,lon:35.444,label:"Jericó"},
 "jerico":{lat:31.871,lon:35.444,label:"Jericó"},
 "belém":{lat:31.705,lon:35.202,label:"Belém"},
 "belem":{lat:31.705,lon:35.202,label:"Belém"},
 "nazaré":{lat:32.700,lon:35.303,label:"Nazaré"},
 "nazare":{lat:32.700,lon:35.303,label:"Nazaré"},
 "corinto":{lat:37.906,lon:22.879,label:"Corinto"},
 "éfeso":{lat:37.940,lon:27.341,label:"Éfeso"},
 "efeso":{lat:37.940,lon:27.341,label:"Éfeso"}
};
function atlasQuick(q){const i=document.getElementById('atlasPlaceQuery');if(i)i.value=q;searchAtlasPlace()}
function searchAtlasPlace(){
 const raw=(document.getElementById('atlasPlaceQuery')?.value||'').trim(),key=raw.toLocaleLowerCase('pt-BR'),p=BEREIA_PLACES[key],box=document.getElementById('atlasSearchResult');
 if(!raw){if(box)box.textContent='Digite um lugar bíblico.';return}
 if(p){
   const osm=`https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lon}#map=10/${p.lat}/${p.lon}`;
   box.innerHTML=`<b>${p.label}</b><br>Localização geográfica disponível. <a href="${osm}" target="_blank" rel="noopener">Abrir mapa interativo ↗</a>`;
 }else{
   const q=encodeURIComponent(raw+' biblical place');
   box.innerHTML=`Ainda não temos "${raw}" no índice local. <a href="https://www.openbible.info/geo/" target="_blank" rel="noopener">Pesquisar no atlas bíblico aberto ↗</a>`;
 }
}
