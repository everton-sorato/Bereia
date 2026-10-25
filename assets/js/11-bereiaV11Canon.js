
window.BEREIA_CANON_LIBRARY={
 catholic:[
 ["Tobias","Deuterocanônico no cânon católico."],["Judite","Deuterocanônico no cânon católico."],["Sabedoria","Deuterocanônico no cânon católico."],["Eclesiástico (Sirácida)","Deuterocanônico no cânon católico."],["Baruc","Deuterocanônico no cânon católico."],["1 Macabeus","Deuterocanônico no cânon católico."],["2 Macabeus","Deuterocanônico no cânon católico."],["Adições a Ester","Material adicional presente em tradições textuais/canônicas específicas."],["Adições a Daniel","Inclui tradições como Susana, Bel e o Dragão e a Oração/Cântico dos três jovens."]
 ],
 orthodox:[
 ["1 Esdras","Recepção varia entre tradições ortodoxas."],["Oração de Manassés","Presente em coleções/cânones de algumas tradições."],["Salmo 151","Presente na Septuaginta e em tradições ortodoxas."],["3 Macabeus","Recebido em algumas tradições ortodoxas."],["4 Macabeus","Frequentemente tratado como apêndice em tradições específicas."]
 ],
 historical:[
 ["1 Enoque","Literatura judaica antiga; canônico na Igreja Ortodoxa Etíope, não no cânon protestante/católico romano."],["Jubileus","Literatura judaica do período do Segundo Templo; recepção canônica em tradição etíope."],["Salmos de Salomão","Coleção judaica antiga não pertencente aos cânones protestante ou católico romano."]
 ]
};
function bereiaCanonRender(kind){
 const names={catholic:"Deuterocanônicos — tradição católica",orthodox:"Tradições ortodoxas",historical:"Literatura antiga relacionada"};
 const a=BEREIA_CANON_LIBRARY[kind]||[];
 return '<h3>'+names[kind]+'</h3><p>Biblioteca complementar. A classificação abaixo não mistura estes escritos com os 66 livros do cânon protestante.</p><div class="bereia-apoc-list">'+a.map(x=>'<div class="bereia-apoc-item"><b>'+x[0]+'</b><span>'+x[1]+'</span></div>').join("")+'</div>';
}
function bereiaOpenCanon(kind){
 const box=document.getElementById("bereiaStudyPanel");if(!box)return;
 box.innerHTML='<div class="bereia-canon-tabs"><button onclick="bereiaOpenCanon(\'catholic\')">Católico</button><button onclick="bereiaOpenCanon(\'orthodox\')">Ortodoxo</button><button onclick="bereiaOpenCanon(\'historical\')">Literatura antiga</button></div>'+bereiaCanonRender(kind||"catholic");box.classList.add("show");box.scrollIntoView({behavior:"smooth",block:"nearest"});
}
const _toggleV11=window.bereiaToggleLayer;
window.bereiaToggleLayer=function(k){if(k==="apocrypha")return bereiaOpenCanon("catholic");return _toggleV11(k)}
window.addEventListener("load",()=>{const badge=document.getElementById("bereiaBuildBadge");if(badge)badge.textContent="BEREIA • V11"});
