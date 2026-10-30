
const BEREIA_STUDY_LAYERS={
 geography:{title:"Geografia e Atlas bíblico",body:"Consulte lugares, cidades, regiões, mapas, rotas e viagens bíblicas em uma única área. O Atlas é organizado do Antigo ao Novo Testamento e mantém suas referências separadas da passagem aberta no leitor.",tags:["Antigo Testamento","Novo Testamento","Lugares","Rotas","Cidades","Regiões"]},
 archaeology:{title:"Arqueologia bíblica",body:"Achados, inscrições, sítios e manuscritos relacionados ao contexto bíblico serão apresentados com fonte e grau de certeza, separando evidência, interpretação e hipótese.",tags:["Sítios","Inscrições","Manuscritos","Evidências"]},
 apocrypha:{title:"Apócrifos e deuterocanônicos",body:"Biblioteca complementar, separada dos 66 livros. O BEREIA indicará a tradição/cânon em que cada obra é recebida e não apresentará esses textos como se houvesse um único cânon compartilhado por todas as tradições.",tags:["Deuterocanônicos","Apócrifos","Cânones","Contexto"]}
};
function bereiaToggleLayer(k){
 if(k==="maps")k="geography";
 const box=document.getElementById("bereiaStudyPanel"),d=BEREIA_STUDY_LAYERS[k]; if(!box||!d)return;
 box.innerHTML="<h3>"+d.title+"</h3><p>"+d.body+"</p><div>"+d.tags.map(x=>'<span class="bst-tag">'+x+"</span>").join("")+"</div>";
 box.classList.add("show"); box.scrollIntoView({behavior:"smooth",block:"nearest"});
}
window.addEventListener("load",()=>{
 if(document.getElementById("bereiaStudyTools"))return;
 const entry=document.getElementById("bereiaSimpleEntry"); if(!entry)return;
 const s=document.createElement("section");s.id="bereiaStudyTools";
 s.innerHTML='<div class="bst-title">APROFUNDAMENTO BÍBLICO</div><div class="bst-grid"><button class="bst-card" onclick="bereiaToggleLayer(\'geography\')"><b>🌍 Geografia</b><span>Atlas, lugares, passagens e rotas bíblicas.</span></button><button class="bst-card" onclick="bereiaToggleLayer(\'archaeology\')"><b>🏺 Arqueologia</b><span>Achados e evidências com fontes.</span></button><button class="bst-card" onclick="bereiaToggleLayer(\'apocrypha\')"><b>📜 Apócrifos</b><span>Biblioteca complementar e cânones.</span></button></div><div id="bereiaStudyPanel" class="bst-panel"></div>';
 entry.insertAdjacentElement("afterend",s);
 const badge=document.getElementById("bereiaBuildBadge");if(badge)badge.textContent="BEREIA • V8";
});
