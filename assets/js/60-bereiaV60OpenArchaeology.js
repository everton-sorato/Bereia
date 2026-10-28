/* BEREIA V72 — fichas arqueológicas e imagens com licença identificada. */
(()=>{'use strict';
const rows=[
 ["2 Reis",3,3,"Estela de Mesha","","Musée du Louvre + Wikimedia Commons","https://collections.louvre.fr/en/ark:/53355/cl010120339"],
 ["Esdras",1,1,"Cilindro de Ciro","","British Museum BM 90920 + Wikimedia Commons","https://www.britishmuseum.org/collection/term/BIB5392"],
 ["2 Crônicas",36,36,"Cilindro de Ciro","","British Museum BM 90920 + Wikimedia Commons","https://www.britishmuseum.org/collection/term/BIB5392"],
 ["Isaías",45,45,"Cilindro de Ciro","","British Museum BM 90920 + Wikimedia Commons","https://www.britishmuseum.org/collection/term/BIB5392"],
 ["2 Reis",8,9,"Estela de Tel Dan","","Israel Antiquities Authority / Israel Museum + Wikimedia Commons","https://www.atiqot.org.il/en/objects/tel-dan-stele/"],
 ["2 Reis",20,20,"Inscrição de Siloé","","City of David / Istanbul Archaeological Museums + Wikimedia Commons","https://cityofdavid.org.il/en/the-siloam-inscription-eng/"],
 ["2 Crônicas",32,32,"Inscrição de Siloé","","City of David / Istanbul Archaeological Museums + Wikimedia Commons","https://cityofdavid.org.il/en/the-siloam-inscription-eng/"],
 ["2 Reis",18,18,"Relevos de Laquis","","British Museum + Wikimedia Commons","https://www.britishmuseum.org/collection/object/W_1856-0909-14_1"],
 ["Isaías",36,36,"Relevos de Laquis","","British Museum + Wikimedia Commons","https://www.britishmuseum.org/collection/object/W_1856-0909-14_1"],
 ["2 Crônicas",32,32,"Relevos de Laquis","","British Museum + Wikimedia Commons","https://www.britishmuseum.org/collection/object/W_1856-0909-14_1"]
];
window.BEREIA_PASSAGE_SOURCES=window.BEREIA_PASSAGE_SOURCES||[];
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const legacyTitles=new Set(['tunel e inscricao de siloe','cerco de laquis (701 a.c.)','campanha de senaqueribe']);
window.BEREIA_PASSAGE_SOURCES=window.BEREIA_PASSAGE_SOURCES.filter(x=>!legacyTitles.has(norm(x[3])));
for(const row of rows)if(!window.BEREIA_PASSAGE_SOURCES.some(x=>x[0]===row[0]&&x[1]===row[1]&&x[3]===row[3]))window.BEREIA_PASSAGE_SOURCES.push(row);
window.addEventListener('load',()=>{const badge=document.getElementById('bereiaBuildBadge');if(badge)badge.textContent='BEREIA • V72';});
})();