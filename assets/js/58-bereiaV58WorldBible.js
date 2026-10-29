/* BEREIA V73 — leitor BPM organizado no visual do aplicativo. */
(()=>{
'use strict';
const extras=[
 {name:"Tobias",code:"TOB",chapters:14,kind:"Deuterocanônico"},
 {name:"Judite",code:"JDT",chapters:16,kind:"Deuterocanônico"},
 {name:"Sabedoria",code:"WIS",chapters:19,kind:"Deuterocanônico"},
 {name:"Eclesiástico (Sirácida)",code:"SIR",chapters:51,kind:"Deuterocanônico"},
 {name:"Baruc",code:"BAR",chapters:6,kind:"Deuterocanônico"},
 {name:"1 Macabeus",code:"1MA",chapters:16,kind:"Deuterocanônico"},
 {name:"2 Macabeus",code:"2MA",chapters:15,kind:"Deuterocanônico"},
 {name:"Adições a Ester",code:"ESG",chapters:16,kind:"Suplemento textual"},
 {name:"Adições a Daniel",code:"DAG",chapters:14,kind:"Suplemento textual"}
];
const codes={Gen:"GEN",Exod:"EXO",Lev:"LEV",Num:"NUM",Deut:"DEU",Josh:"JOS",Judg:"JDG",Ruth:"RUT", "1Sam":"1SA","2Sam":"2SA","1Kgs":"1KI","2Kgs":"2KI","1Chr":"1CH","2Chr":"2CH",Ezra:"EZR",Neh:"NEH",Esth:"EST",Job:"JOB",Ps:"PSA",Prov:"PRO",Eccl:"ECC",Song:"SNG",Isa:"ISA",Jer:"JER",Lam:"LAM",Ezek:"EZK",Dan:"DAN",Hos:"HOS",Joel:"JOL",Amos:"AMO",Obad:"OBA",Jonah:"JON",Mic:"MIC",Nah:"NAM",Hab:"HAB",Zeph:"ZEP",Hag:"HAG",Zech:"ZEC",Mal:"MAL",Matt:"MAT",Mark:"MRK",Luke:"LUK",John:"JHN",Acts:"ACT",Rom:"ROM","1Cor":"1CO","2Cor":"2CO",Gal:"GAL",Eph:"EPH",Phil:"PHP",Col:"COL","1Thess":"1TH","2Thess":"2TH","1Tim":"1TI","2Tim":"2TI",Titus:"TIT",Phlm:"PHM",Heb:"HEB",Jas:"JAS","1Pet":"1PE","2Pet":"2PE","1John":"1JN","2John":"2JN","3John":"3JN",Jude:"JUD",Rev:"REV"};
const core=(typeof bibleBooks!=='undefined'?bibleBooks:[]).map(b=>({name:b[1],code:codes[b[0]],chapters:b[2],kind:+bibleBooks.indexOf(b)<39?"Antigo Testamento":"Novo Testamento"})).filter(x=>x.code);
const catalog=[...core,...extras];
function urlFor(book,ch){const n=Number(ch)||1,seq=book.code==="PSA"?String(n).padStart(3,"0"):String(n).padStart(2,"0");return "https://ebible.org/porbrbsl/"+book.code+seq+".htm"}
function notice(){return '<div class="bpmNotice"><b>Bíblia Portuguesa Mundial (BPM)</b><p>O eBible.org identifica esta tradução brasileira como domínio público. A própria fonte informa que a tradução ainda é um rascunho em revisão e não apresenta imprimatur.</p><a href="https://ebible.org/porbrbsl/" target="_blank" rel="noopener noreferrer">Fonte e catálogo oficiais ↗</a></div>'}
function safe(x){return typeof window.escapeHtml==="function"?window.escapeHtml(x):String(x).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function reader(bookName){
 const box=document.getElementById("bereiaStudyPanel");if(!box)return;
 const selected=catalog.find(x=>x.name===bookName)||core[0];if(!selected)return;
 box.innerHTML='<div class="bereia-library-reader bpmShell"><div class="bpmHeading"><small>LEITURA EM PORTUGUÊS</small><h3>Bíblia Portuguesa Mundial</h3></div>'+notice()+'<p class="bpmIntro">Escolha um livro e capítulo. A navegação e os controles ficam no BEREIA; o texto é carregado diretamente da fonte oficial.</p><div class="bpmControls"><label for="bereiaBpmBook">Livro</label><select id="bereiaBpmBook">'+catalog.map(x=>'<option value="'+safe(x.name)+'" '+(x.name===selected.name?'selected':'')+'>'+safe(x.name)+' · '+safe(x.kind)+'</option>').join("")+'</select><label for="bereiaBpmChapter">Capítulo</label><select id="bereiaBpmChapter"></select><button id="bereiaBpmRead" class="btn primary" type="button">Ler capítulo</button></div><div id="bereiaBpmText" class="bpmTextArea"><div class="bpmPlaceholder"><span>📖</span><b>Seu capítulo será aberto aqui</b><small>Selecione o capítulo e toque em “Ler capítulo”.</small></div></div><p class="bpmSourceLink" id="bereiaBpmSource"></p><h3 class="bpmCatalogTitle">Livros disponíveis</h3><div class="bpmBookGrid">'+catalog.map(x=>'<button class="bpmBook" data-bpm-book="'+safe(x.name)+'" type="button"><b>'+safe(x.name)+'</b><small>'+safe(x.kind)+' · '+x.chapters+' capítulos</small></button>').join("")+'</div></div>';
 const bookSelect=box.querySelector("#bereiaBpmBook"),chapterSelect=box.querySelector("#bereiaBpmChapter");
 function chapters(){const current=catalog.find(x=>x.name===bookSelect.value)||core[0];chapterSelect.innerHTML=Array.from({length:current.chapters},(_,i)=>'<option value="'+(i+1)+'">Capítulo '+(i+1)+'</option>').join("")}
 function load(){const current=catalog.find(x=>x.name===bookSelect.value)||core[0],n=Number(chapterSelect.value)||1,u=urlFor(current,n),area=box.querySelector("#bereiaBpmText");
  area.innerHTML='<iframe class="bpmFrame" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="'+u+'" title="'+safe(current.name)+' '+n+' — Bíblia Portuguesa Mundial"></iframe>';
  box.querySelector("#bereiaBpmSource").innerHTML='<a href="'+u+'" target="_blank" rel="noopener noreferrer">Abrir este capítulo no eBible.org ↗</a>';
 }
 bookSelect.addEventListener("change",chapters);box.querySelector("#bereiaBpmRead").addEventListener("click",load);box.querySelectorAll("[data-bpm-book]").forEach(b=>b.addEventListener("click",()=>{bookSelect.value=b.dataset.bpmBook;chapters();load()}));chapters();box.classList.add("show");box.scrollIntoView({behavior:"smooth",block:"nearest"});
}
const previousSet=window.bereiaSetLibrary,previousOpen=window.bereiaOpenExtraBook;
window.bereiaSetLibrary=function(mode){if(mode!=="catholic")return previousSet(mode);reader("Gênesis")};
window.bereiaOpenExtraBook=function(mode,i){
 if(mode!=="catholic")return previousOpen(mode,i);
 const entries=typeof BEREIA_CATHOLIC_BOOKS!=='undefined'?BEREIA_CATHOLIC_BOOKS:[],entry=entries[i],name=entry?.[0];
 if(name&&catalog.some(x=>x.name===name))return reader(name);
 return previousOpen(mode,i);
};
if(!document.getElementById("bereiaBpmStyles")){
 const s=document.createElement("style");s.id="bereiaBpmStyles";
 s.textContent=`.bpmShell{color:var(--text)}.bpmHeading small{color:var(--gold);letter-spacing:.14em;font-size:10px}.bpmHeading h3{margin:5px 0 12px}.bpmNotice{margin:12px 0;padding:14px;border:1px solid var(--line);border-left:3px solid var(--gold);border-radius:12px;background:var(--panel2);color:var(--text);font:12px/1.6 system-ui}.bpmNotice b{color:var(--gold)}.bpmNotice p{margin:6px 0}.bpmNotice a,.bpmSourceLink a{color:var(--gold)}.bpmIntro{color:var(--muted);font-size:13px;line-height:1.6}.bpmControls{display:grid;grid-template-columns:1fr 1fr auto;align-items:end;gap:9px;margin:14px 0}.bpmControls label{grid-row:1;color:var(--muted);font-size:11px}.bpmControls select{min-width:0;width:100%;grid-row:2;background:var(--panel);color:var(--text);border:1px solid var(--line);border-radius:11px;padding:11px}.bpmControls button{grid-column:3;grid-row:2;white-space:nowrap}.bpmTextArea{min-height:170px;border:1px solid var(--line);border-radius:15px;overflow:hidden;background:var(--panel)}.bpmPlaceholder{min-height:170px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:var(--muted);text-align:center;padding:20px}.bpmPlaceholder span{font-size:28px}.bpmPlaceholder b{color:var(--text)}.bpmFrame{display:block;width:100%;height:min(70vh,740px);min-height:480px;border:0;background:#fff}.bpmSourceLink{font-size:12px}.bpmCatalogTitle{margin-top:22px}.bpmBookGrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:9px;margin:12px 0}.bpmBook{display:block;text-align:left;background:var(--panel);color:var(--text);border:1px solid var(--line);border-radius:12px;padding:12px;cursor:pointer}.bpmBook:hover,.bpmBook:focus-visible{border-color:var(--gold)}.bpmBook b,.bpmBook small{display:block}.bpmBook small{margin-top:5px;color:var(--muted);font-size:10px}@media(max-width:600px){.bpmControls{grid-template-columns:1fr 1fr}.bpmControls label:nth-of-type(2){grid-column:2;grid-row:1}.bpmControls select:nth-of-type(2){grid-column:2;grid-row:2}.bpmControls button{grid-column:1/-1;grid-row:3}.bpmBookGrid{grid-template-columns:1fr 1fr}.bpmFrame{min-height:420px}}`;
 document.head.append(s);
}
})();
