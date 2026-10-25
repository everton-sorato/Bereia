
window.BEREIA_LIBRARY_MODE="protestant";
window.BEREIA_LIBRARIES={
 protestant:{label:"66 Livros",desc:"Cânon protestante: 39 livros do Antigo Testamento e 27 do Novo Testamento."},
 catholic:{label:"Católica",desc:"Cânon católico: inclui os livros deuterocanônicos e as adições reconhecidas nessa tradição."},
 ancient:{label:"Apócrifos / Literatura Antiga",desc:"Biblioteca complementar. Cada obra deve indicar claramente sua tradição, recepção canônica e fonte textual."}
};
function bereiaSetLibrary(mode){
 if(!BEREIA_LIBRARIES[mode])return;BEREIA_LIBRARY_MODE=mode;
 document.querySelectorAll(".bereia-library-tabs button").forEach(x=>x.classList.toggle("active",x.dataset.lib===mode));
 const i=document.getElementById("bereiaLibraryInfo");if(i)i.textContent=BEREIA_LIBRARIES[mode].desc;
 if(mode==="ancient"&&typeof bereiaOpenCanon==="function")bereiaOpenCanon("historical");
 if(mode==="catholic"&&typeof bereiaOpenCanon==="function")bereiaOpenCanon("catholic");
}
window.addEventListener("load",()=>{
 if(document.getElementById("bereiaLibrarySwitch"))return;
 const entry=document.getElementById("bereiaSimpleEntry");if(!entry)return;
 const w=document.createElement("section");w.id="bereiaLibrarySwitch";w.className="bereia-library-switch";
 w.innerHTML='<div class="bereia-library-title">ESCOLHA SUA BIBLIOTECA BÍBLICA</div><div class="bereia-library-tabs"><button data-lib="protestant" class="active" onclick="bereiaSetLibrary(\'protestant\')">📖 66 Livros</button><button data-lib="catholic" onclick="bereiaSetLibrary(\'catholic\')">✝ Católica</button><button data-lib="ancient" onclick="bereiaSetLibrary(\'ancient\')">📜 Apócrifos</button></div><div id="bereiaLibraryInfo" class="bereia-library-info">'+BEREIA_LIBRARIES.protestant.desc+'</div>';
 entry.insertAdjacentElement("afterend",w);
 const badge=document.getElementById("bereiaBuildBadge");if(badge)badge.textContent="BEREIA • V12";
});
