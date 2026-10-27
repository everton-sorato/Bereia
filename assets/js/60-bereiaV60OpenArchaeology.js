/* BEREIA V69 — fichas arqueológicas e imagens com licença conferida. */
(()=>{'use strict';
const rows=[
 ["2 Reis",3,3,"Estela de Mesha","","Musée du Louvre + Wikimedia Commons","https://collections.louvre.fr/en/ark:/53355/cl010120339"],
 ["Esdras",1,1,"Cilindro de Ciro","","British Museum BM 90920 + Wikimedia Commons","https://www.britishmuseum.org/collection/term/BIB5392"],
 ["2 Crônicas",36,36,"Cilindro de Ciro","","British Museum BM 90920 + Wikimedia Commons","https://www.britishmuseum.org/collection/term/BIB5392"],
 ["Isaías",45,45,"Cilindro de Ciro","","British Museum BM 90920 + Wikimedia Commons","https://www.britishmuseum.org/collection/term/BIB5392"]
];
window.BEREIA_PASSAGE_SOURCES=window.BEREIA_PASSAGE_SOURCES||[];
for(const row of rows)if(!window.BEREIA_PASSAGE_SOURCES.some(x=>x[0]===row[0]&&x[1]===row[1]&&x[3]===row[3]))window.BEREIA_PASSAGE_SOURCES.push(row);
window.addEventListener('load',()=>{const badge=document.getElementById('bereiaBuildBadge');if(badge)badge.textContent='BEREIA • V69';});
})();