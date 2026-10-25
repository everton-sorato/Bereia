
function bereiaBookContext(book){
 const d=(window.BEREIA_BOOK_DOSSIERS||{})[book],r=(window.BEREIA_BOOK_REFERENCE||{})[book];
 if(d)return {history:d.period,geo:d.geo,topics:d.topics,note:d.note};
 if(r)return {history:r[0],geo:r[1],topics:"Referências específicas por capítulo e versículo em expansão.",note:"O contexto exibido é do livro; não significa que todo dado se aplique diretamente a este versículo."};
 return null;
}
function bereiaContextHTML(){
 const s=(typeof bereiaSelected!=="undefined"?bereiaSelected:(window.bereiaSelected||{})),d=bereiaBookContext(s.book);if(!d)return '<div class="bereia-context-note">Referências históricas e geográficas específicas desta passagem ainda estão em expansão.</div>';
 return '<div class="bereia-context-pack"><div class="bereia-context-item"><b>🏺 Contexto histórico do livro</b><span>'+d.history+'</span></div><div class="bereia-context-item"><b>🗺️ Geografia relacionada</b><span>'+d.geo+'</span></div><div class="bereia-context-item"><b>🔎 Temas para investigação</b><span>'+d.topics+'</span></div><div class="bereia-context-item"><b>⚖️ Nota de evidência</b><span>'+d.note+'</span></div></div><div class="bereia-context-note">Estas informações contextualizam o livro. Evidência arqueológica direta de um versículo só será indicada quando houver fonte específica.</div>';
}
function bereiaInjectVerseContext(){
 const modal=document.getElementById("bereiaOriginalModal");if(!modal)return;
 let box=document.getElementById("bereiaVerseContext");if(!box){box=document.createElement("section");box.id="bereiaVerseContext";const target=document.getElementById("bomWords")||modal;target.insertAdjacentElement("afterend",box)}
 box.innerHTML='<h4 style="color:#e7ca7d;margin:14px 0 5px;font-family:system-ui">Contexto da passagem</h4>'+bereiaContextHTML();
}
const _origV23=window.openOriginalStudy;
window.openOriginalStudy=function(){const r=typeof _origV23==="function"?_origV23.apply(this,arguments):undefined;setTimeout(bereiaInjectVerseContext,30);return r};
const _deepContextV23=window.openBereiaDeep;
if(typeof _deepContextV23==="function")window.openBereiaDeep=async function(){const r=await _deepContextV23.apply(this,arguments);setTimeout(bereiaInjectVerseContext,100);return r};
window.addEventListener("load",()=>{const badge=document.getElementById("bereiaBuildBadge");if(badge)badge.textContent="BEREIA • V23"});
