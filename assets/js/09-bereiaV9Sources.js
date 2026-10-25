
window.BEREIA_SOURCES={
 hebrew:{name:"Open Scriptures Hebrew Bible (OSHB / WLC)",license:"WLC: domínio público; lema e morfologia OSHB: CC BY 4.0",credit:"Open Scriptures Hebrew Bible Project"},
 greek:{name:"SBL Greek New Testament + MorphGNT",license:"SBLGNT: CC BY 4.0; análise MorphGNT: CC BY-SA",credit:"Society of Biblical Literature / Logos Bible Software / James Tauber, MorphGNT"}
};
function bereiaTestament(book){
 const nt=["Mateus","Marcos","Lucas","João","Atos","Romanos","1 Coríntios","2 Coríntios","Gálatas","Efésios","Filipenses","Colossenses","1 Tessalonicenses","2 Tessalonicenses","1 Timóteo","2 Timóteo","Tito","Filemom","Hebreus","Tiago","1 Pedro","2 Pedro","1 João","2 João","3 João","Judas","Apocalipse"];
 return nt.includes(String(book||"").trim())?"NT":"AT";
}
function bereiaOriginalSourceNote(book){
 const nt=bereiaTestament(book)==="NT",s=nt?BEREIA_SOURCES.greek:BEREIA_SOURCES.hebrew;
 return '<div class="bereia-sourcebox"><b>Fonte do texto original</b><br>'+s.name+'<br>'+s.license+'<br><span class="bereia-original-status">'+(nt?'Grego koiné':'Hebraico / aramaico quando aplicável')+'</span></div>';
}
const _openDeepV9=window.openBereiaDeep;
if(typeof _openDeepV9==="function"){
 window.openBereiaDeep=async function(){
   const r=await _openDeepV9.apply(this,arguments);
   setTimeout(()=>{const target=document.querySelector("#bereiaDeepModal .deepContent,#bereiaDeepModal .modalBody,#bereiaDeepModal .sheetBody,#bereiaDeepModal");if(target&&!target.querySelector(".bereia-sourcebox"))target.insertAdjacentHTML("beforeend",bereiaOriginalSourceNote(window.bereiaSelected?.book||bereiaCurrentBookName()));},50);
   return r;
 };
}
