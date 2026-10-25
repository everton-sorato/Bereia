
window.BEREIA_CATHOLIC_BOOKS=[
 ["Tobias","Deuterocanônico"],["Judite","Deuterocanônico"],["Sabedoria","Deuterocanônico"],["Eclesiástico (Sirácida)","Deuterocanônico"],["Baruc","Deuterocanônico"],["1 Macabeus","Deuterocanônico"],["2 Macabeus","Deuterocanônico"],["Adições a Ester","Adições deuterocanônicas"],["Adições a Daniel","Susana; Bel e o Dragão; Oração/Cântico dos três jovens"]
];
window.BEREIA_ANCIENT_BOOKS=[
 ["1 Enoque","Canônico na tradição ortodoxa etíope; literatura judaica antiga em outras tradições."],["Jubileus","Recepção canônica na tradição etíope; literatura do Segundo Templo."],["1 Esdras","Recepção varia entre tradições ortodoxas."],["Oração de Manassés","Presente em algumas coleções e tradições."],["Salmo 151","Presente na Septuaginta e em tradições ortodoxas."],["3 Macabeus","Recebido em algumas tradições ortodoxas."],["4 Macabeus","Frequentemente tratado como apêndice em tradições específicas."],["Salmos de Salomão","Literatura judaica antiga; não canônica no protestantismo/catolicismo romano."]
];
function bereiaExtraBooks(mode){
 const a=mode==="catholic"?BEREIA_CATHOLIC_BOOKS:BEREIA_ANCIENT_BOOKS;
 return '<div class="bereia-extra-books">'+a.map((x,i)=>'<button class="bereia-extra-book" onclick="bereiaOpenExtraBook(\''+mode+'\','+i+')">'+x[0]+'<small>'+x[1]+'</small></button>').join("")+'</div>';
}
function bereiaOpenExtraBook(mode,i){
 const a=mode==="catholic"?BEREIA_CATHOLIC_BOOKS:BEREIA_ANCIENT_BOOKS,x=a[i],box=document.getElementById("bereiaStudyPanel");if(!x||!box)return;
 box.innerHTML='<div class="bereia-library-reader"><h3>'+x[0]+'</h3><p>'+x[1]+'</p><p><b>Status do texto:</b> catálogo habilitado. O texto integral será disponibilizado somente a partir de edição com licença compatível, preservando atribuição e tradição canônica.</p></div>'+bereiaExtraBooks(mode);box.classList.add("show");box.scrollIntoView({behavior:"smooth",block:"nearest"});
}
const _setLibraryV13=window.bereiaSetLibrary;
window.bereiaSetLibrary=function(mode){
 if(typeof _setLibraryV13==="function")_setLibraryV13(mode);
 const box=document.getElementById("bereiaStudyPanel");
 if(mode==="catholic"&&box){box.innerHTML='<h3>Livros adicionais do cânon católico</h3><p>Selecione um livro.</p>'+bereiaExtraBooks("catholic");box.classList.add("show")}
 if(mode==="ancient"&&box){box.innerHTML='<h3>Apócrifos e Literatura Bíblica Antiga</h3><p>Selecione uma obra. A recepção canônica é indicada individualmente.</p>'+bereiaExtraBooks("ancient");box.classList.add("show")}
};
window.addEventListener("load",()=>{const badge=document.getElementById("bereiaBuildBadge");if(badge)badge.textContent="BEREIA • V13"});
