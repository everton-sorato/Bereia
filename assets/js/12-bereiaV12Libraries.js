
window.BEREIA_LIBRARY_MODE="protestant";
window.BEREIA_LIBRARIES={
 protestant:{label:"66 Livros",desc:"Cânon protestante: 39 livros do Antigo Testamento e 27 do Novo Testamento."},
 catholic:{label:"Católica",desc:"Cânon católico: inclui os livros deuterocanônicos e as adições reconhecidas nessa tradição."},
 ancient:{label:"Apócrifos / Literatura Antiga",desc:"Biblioteca complementar. Cada obra deve indicar claramente sua tradição, recepção canônica e fonte textual."}
};
function bereiaSetLibrary(mode,options={}){
 if(!BEREIA_LIBRARIES[mode])return;BEREIA_LIBRARY_MODE=mode;
 const persist=options.persist!==false,navigate=options.navigate!==false;
 if(persist){try{localStorage.setItem("bereia:libraryMode",mode)}catch{}}
 document.querySelectorAll(".bereia-library-tabs button").forEach(x=>{
  const selected=x.dataset.lib===mode;x.classList.toggle("active",selected);x.setAttribute("aria-pressed",selected?"true":"false");
 });
 const i=document.getElementById("bereiaLibraryInfo");if(i)i.textContent=BEREIA_LIBRARIES[mode].desc;
 if(navigate&&mode==="ancient"&&typeof bereiaOpenCanon==="function")bereiaOpenCanon("historical");
 if(navigate&&mode==="catholic"&&typeof bereiaOpenCanon==="function")bereiaOpenCanon("catholic");
}
window.addEventListener("load",()=>{
 if(document.getElementById("bereiaLibrarySwitch"))return;
 const entry=document.getElementById("bereiaSimpleEntry");if(!entry)return;
 let saved="protestant";try{const value=localStorage.getItem("bereia:libraryMode");if(BEREIA_LIBRARIES[value])saved=value}catch{}
 const w=document.createElement("section");w.id="bereiaLibrarySwitch";w.className="bereia-library-switch";
 w.innerHTML='<div class="bereia-library-title">ESCOLHA SUA BIBLIOTECA BÍBLICA</div><div class="bereia-library-tabs"><button type="button" data-lib="protestant">📖 66 Livros</button><button type="button" data-lib="catholic">✝ Católica</button><button type="button" data-lib="ancient">📜 Apócrifos</button></div><div id="bereiaLibraryInfo" class="bereia-library-info">'+BEREIA_LIBRARIES.protestant.desc+'</div>';
 entry.insertAdjacentElement("afterend",w);
 w.querySelectorAll(".bereia-library-tabs button").forEach(button=>button.addEventListener("click",()=>bereiaSetLibrary(button.dataset.lib)));
 bereiaSetLibrary(saved,{persist:false,navigate:false});
 const badge=document.getElementById("bereiaBuildBadge");if(badge)badge.textContent="BEREIA • V12";
});
const style=document.createElement("style");style.id="bereiaLibrarySelectionStyles";style.textContent=".bereia-library-tabs button{transition:background .16s,border-color .16s,color .16s,box-shadow .16s}.bereia-library-tabs button.active,.bereia-library-tabs button[aria-pressed=true]{background:#dfbd66!important;border-color:#dfbd66!important;color:#17130b!important;box-shadow:0 0 0 2px rgba(223,189,102,.22),inset 0 0 0 1px rgba(23,19,11,.18);font-weight:800!important}.bereia-library-tabs button:focus-visible{outline:3px solid #f2d883!important;outline-offset:3px}";
document.head.appendChild(style);
