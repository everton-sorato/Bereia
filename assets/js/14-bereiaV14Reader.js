
window.BEREIA_WEBC={
 "Tobias":{code:"TOB",chapters:14,en:"Tobit"},"Judite":{code:"JDT",chapters:16,en:"Judith"},"Sabedoria":{code:"WIS",chapters:19,en:"Wisdom"},"Eclesiástico (Sirácida)":{code:"SIR",chapters:51,en:"Sirach"},"Baruc":{code:"BAR",chapters:6,en:"Baruch"},"1 Macabeus":{code:"1MA",chapters:16,en:"1 Maccabees"},"2 Macabeus":{code:"2MA",chapters:15,en:"2 Maccabees"},"Adições a Ester":{code:"ESG",chapters:16,en:"Esther (Greek)"},"Adições a Daniel":{code:"DAG",chapters:14,en:"Daniel (Greek)"}
};
function bereiaWebcUrl(book,ch){const d=BEREIA_WEBC[book];if(!d)return "";return "https://ebible.org/eng-web-c/"+d.code+String(ch||1).padStart(2,"0")+".htm"}
function bereiaWebcChapterSelect(book){const d=BEREIA_WEBC[book];if(!d)return "";return '<select id="bereiaWebcChapter" onchange="bereiaUpdateWebcLink(\''+book.replace(/'/g,"\\'")+'\')" style="background:#151515;color:#ddd;border:1px solid #3b3323;border-radius:10px;padding:9px">'+Array.from({length:d.chapters},(_,i)=>'<option value="'+(i+1)+'">Capítulo '+(i+1)+'</option>').join("")+'</select>'}
function bereiaUpdateWebcLink(book){const ch=document.getElementById("bereiaWebcChapter")?.value||1,a=document.getElementById("bereiaWebcOpen");if(a)a.href=bereiaWebcUrl(book,ch)}
const _openExtraV14=window.bereiaOpenExtraBook;
window.bereiaOpenExtraBook=function(mode,i){
 if(mode!=="catholic")return _openExtraV14(mode,i);
 const x=BEREIA_CATHOLIC_BOOKS[i],d=x&&BEREIA_WEBC[x[0]],box=document.getElementById("bereiaStudyPanel");if(!x||!d||!box)return;
 box.innerHTML='<div class="bereia-library-reader"><h3>'+x[0]+'</h3><p>'+x[1]+'</p><p><b>Edição de leitura:</b> World English Bible — Catholic Book Order (inglês).</p>'+bereiaWebcChapterSelect(x[0])+'<div class="bereia-read-actions"><a id="bereiaWebcOpen" target="_blank" rel="noopener" href="'+bereiaWebcUrl(x[0],1)+'">📖 Ler capítulo completo</a></div><div class="bereia-license">Texto integral da WEB Catholic em domínio público. O BEREIA mantém o texto da edição sem alteração e identifica a fonte.</div></div>'+bereiaExtraBooks("catholic");box.classList.add("show");box.scrollIntoView({behavior:"smooth",block:"nearest"});
};
window.addEventListener("load",()=>{const badge=document.getElementById("bereiaBuildBadge");if(badge)badge.textContent="BEREIA • V14"});
