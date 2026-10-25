
let bereiaSelected={el:null,verse:null,text:"",ref:"",book:"",chapter:null};

function openSimpleBible(){
 document.body.classList.add("simpleBibleOpen");
 if(typeof go==="function") go("bible");
 setTimeout(bindBereiaVerses,250);
}
function simpleHome(){
 document.body.classList.remove("simpleBibleOpen");
 document.getElementById("bereiaDeepBar")?.classList.remove("show");
 if(typeof go==="function") try{go("home")}catch(e){}
 window.scrollTo({top:0,behavior:"smooth"});
}
function bindBereiaVerses(){
 const reader=document.getElementById("bibleReader")||document;
 reader.querySelectorAll(".v,.verse,[data-verse]").forEach(el=>{
   if(el.dataset.bereiaBound)return;el.dataset.bereiaBound="1";
   el.addEventListener("click",()=>selectBereiaVerse(el));
 });
}
function selectBereiaVerse(el){
 if(bereiaSelected.el)bereiaSelected.el.classList.remove("bereiaSelectedVerse");
 el.classList.add("bereiaSelectedVerse");
 const n=el.dataset.verse||el.querySelector(".vn,.verse-num")?.textContent?.trim()||"";
 const text=(el.querySelector(".vt,.verse-text")?.textContent||el.textContent||"").trim();
 const book=document.getElementById("bibleBook")?.value||"";
 const chapter=document.getElementById("bibleChapter")?.value||"";
 bereiaSelected={el,verse:n,text,ref:[book,chapter+(n?":"+n:"")].filter(Boolean).join(" "),book,chapter};
 document.getElementById("deepSelectionText").textContent=bereiaSelected.ref||("Versículo "+n);
 document.getElementById("bereiaDeepBar").classList.add("show");
}
const OT_BOOKS=["Gênesis","Genesis","Êxodo","Exodo","Levítico","Levitico","Números","Numeros","Deuteronômio","Deuteronomio","Josué","Josue","Juízes","Juizes","Rute","1 Samuel","2 Samuel","1 Reis","2 Reis","1 Crônicas","1 Cronicas","2 Crônicas","2 Cronicas","Esdras","Neemias","Ester","Jó","Jo","Salmos","Provérbios","Proverbios","Eclesiastes","Cânticos","Canticos","Isaías","Isaias","Jeremias","Lamentações","Lamentacoes","Ezequiel","Daniel","Oséias","Oseias","Joel","Amós","Amos","Obadias","Jonas","Miquéias","Miqueias","Naum","Habacuque","Sofonias","Ageu","Zacarias","Malaquias"];
function originalLanguage(book,chapter){
 const b=(book||"").toLowerCase(),c=Number(chapter||0);
 if(b.includes("daniel")&&c>=2&&c<=7)return "Aramaico bíblico";
 if(b.includes("esdras")&&c>=4&&c<=7)return "Aramaico bíblico";
 return OT_BOOKS.some(x=>x.toLowerCase()===b)?"Hebraico bíblico":"Grego koiné";
}
function openOriginalStudy(){
 if(!bereiaSelected.el)return;
 const lang=originalLanguage(bereiaSelected.book,bereiaSelected.chapter);
 document.getElementById("bomTitle").textContent=bereiaSelected.ref||"Texto original";
 document.getElementById("bomVerse").textContent=bereiaSelected.text;
 document.getElementById("bomLang").textContent="Idioma-base: "+lang;
 const words=document.getElementById("bomWords");words.innerHTML="";
 // Reuse only verified lexical data already present in the app, if available.
 const available=(window.BEREIA_LEXICON&&bereiaSelected.ref&&window.BEREIA_LEXICON[bereiaSelected.ref])||[];
 if(available.length){
   available.forEach(w=>{const d=document.createElement("div");d.className="bomWord";d.innerHTML=`<div class="original">${w.original||""}</div><div class="translit">${w.transliteration||w.translit||""}</div><div class="meaning">${w.meaning||""}</div>`;words.appendChild(d)});
   document.getElementById("bomNotice").style.display="none";
 }else{
   document.getElementById("bomNotice").style.display="block";
   document.getElementById("bomNotice").textContent=`Os dados palavra por palavra em ${lang} ainda não estão carregados para este versículo. O BEREIA não exibirá conteúdo inventado.`;
 }
 document.getElementById("bereiaOriginalModal").classList.add("open");
}
function closeOriginalStudy(){document.getElementById("bereiaOriginalModal").classList.remove("open")}

// Rebind after chapter changes / asynchronous rendering.
const bereiaObserver=new MutationObserver(()=>bindBereiaVerses());
window.addEventListener("load",()=>{const r=document.getElementById("bibleReader");if(r)bereiaObserver.observe(r,{childList:true,subtree:true});bindBereiaVerses()});
