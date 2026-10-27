/* Bíblia Portuguesa Mundial (BPM): leitor oficial e recursos deuterocanônicos em português. */
window.BEREIA_PT_CATHOLIC={
 "Tobias":{code:"TOB",chapters:14},
 "Judite":{code:"JDT",chapters:16},
 "Sabedoria":{code:"WIS",chapters:19},
 "Eclesiástico (Sirácida)":{code:"SIR",chapters:51},
 "Baruc":{code:"BAR",chapters:6},
 "1 Macabeus":{code:"1MA",chapters:16},
 "2 Macabeus":{code:"2MA",chapters:15},
 "Adições a Ester":{code:"ESG",chapters:16,label:"Ester (Grego)"},
 "Adições a Daniel":{code:"DAG",chapters:14,label:"Daniel (Grego)"}
};
function bereiaPtCatholicUrl(book,ch){
 const d=BEREIA_PT_CATHOLIC[book],n=Number(ch)||1;
 return d&&n>=1&&n<=d.chapters?"https://ebible.org/porbrbsl/"+d.code+String(n).padStart(2,"0")+".htm":"https://ebible.org/porbrbsl/";
}
function bereiaPtChapterSelect(book){
 const d=BEREIA_PT_CATHOLIC[book];if(!d)return "";
 return '<label for="bereiaPtChapter">Capítulo</label><select id="bereiaPtChapter" onchange="bereiaLoadPtChapter(\''+book.replace(/'/g,"\\\\'")+'\')" style="background:#151515;color:#ddd;border:1px solid #3b3323;border-radius:10px;padding:9px">'+Array.from({length:d.chapters},(_,i)=>'<option value="'+(i+1)+'">Capítulo '+(i+1)+'</option>').join("")+'</select>';
}
function bereiaLoadPtChapter(book){
 const ch=document.getElementById("bereiaPtChapter")?.value||1,fr=document.getElementById("bereiaPtFrame"),link=document.getElementById("bereiaPtOpen");
 const url=bereiaPtCatholicUrl(book,ch);if(fr)fr.src=url;if(link)link.href=url;
}
function bereiaBpmNotice(){
 return '<div class="bpmNotice"><b>Bíblia Portuguesa Mundial (BPM)</b><p>Texto em português brasileiro identificado pelo eBible.org como domínio público. O projeto informa que esta tradução ainda é um rascunho em revisão e não apresenta imprimatur. O BEREIA mantém a fonte original sem editar o texto.</p><a href="https://ebible.org/porbrbsl/" target="_blank" rel="noopener noreferrer">Abrir a Bíblia completa no eBible.org ↗</a></div>';
}
const _extraV15=window.bereiaOpenExtraBook;
window.bereiaOpenExtraBook=function(mode,i){
 if(mode!=="catholic")return _extraV15(mode,i);
 const x=BEREIA_CATHOLIC_BOOKS[i],d=x&&BEREIA_PT_CATHOLIC[x[0]],box=document.getElementById("bereiaStudyPanel");
 if(!x||!box)return;
 if(!d)return _extraV15(mode,i);
 const first=bereiaPtCatholicUrl(x[0],1);
 box.innerHTML='<div class="bereia-library-reader"><h3>'+x[0]+'</h3><p>'+x[1]+'</p>'+bereiaBpmNotice()+bereiaPtChapterSelect(x[0])+'<div class="bereia-pt-reader"><div class="bereia-reader-head"><b>Leitura em português — fonte eBible.org</b><p>O texto é carregado diretamente da página da edição.</p></div><iframe id="bereiaPtFrame" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="'+first+'" title="'+x[0]+' — Bíblia Portuguesa Mundial"></iframe><p><a id="bereiaPtOpen" href="'+first+'" target="_blank" rel="noopener noreferrer">Se a leitura não aparecer aqui, abrir este capítulo no eBible.org ↗</a></p></div></div>'+bereiaExtraBooks("catholic");
 box.classList.add("show");box.scrollIntoView({behavior:"smooth",block:"nearest"});
};
const _setLibraryBpm=window.bereiaSetLibrary;
window.bereiaSetLibrary=function(mode){
 if(mode!=="catholic")return _setLibraryBpm(mode);
 const box=document.getElementById("bereiaStudyPanel");if(!box)return;
 box.innerHTML='<div class="bereia-library-reader"><h3>Bíblia Portuguesa Mundial</h3>'+bereiaBpmNotice()+'<p>A edição online inclui o texto bíblico e livros de outras coleções antigas. Para o cânon católico, use os 66 livros já disponíveis no leitor do BEREIA e a seção de livros deuterocanônicos abaixo. As formas gregas de Ester e Daniel são apresentadas como expansões textuais, não como livros adicionais independentes.</p><div class="bpmCatalog"><iframe loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://ebible.org/porbrbsl/" title="Catálogo da Bíblia Portuguesa Mundial no eBible.org"></iframe></div><p><a href="https://ebible.org/porbrbsl/" target="_blank" rel="noopener noreferrer">Se o catálogo não aparecer, abrir no eBible.org ↗</a></p><h3>Livros deuterocanônicos e formas gregas</h3>'+bereiaExtraBooks("catholic")+'</div>';
 box.classList.add("show");box.scrollIntoView({behavior:"smooth",block:"nearest"});
};
(function addBpmStyles(){
 if(document.getElementById("bereiaBpmStyles"))return;
 const s=document.createElement("style");s.id="bereiaBpmStyles";s.textContent=".bpmNotice{margin:12px 0;padding:14px;border:1px solid #6b5832;border-left:3px solid #d7b56d;border-radius:12px;background:#181710;color:#d6d1c5;font:12px/1.6 system-ui}.bpmNotice b{color:#e6c979}.bpmNotice p{margin:6px 0}.bpmNotice a,.bereia-library-reader>a{color:#e6c979}.bpmCatalog{margin:12px 0;border:1px solid #38372f;border-radius:14px;overflow:hidden;background:#101318}.bpmCatalog iframe{width:100%;height:min(68vh,720px);min-height:480px;border:0;background:#fff}.bereia-pt-reader iframe{width:100%;height:min(68vh,720px);min-height:480px;border:1px solid #38372f;border-radius:12px;background:#fff}.bereia-pt-reader p a{color:#e6c979}";
 document.head.append(s);
})();
window.addEventListener("load",()=>{const badge=document.getElementById("bereiaBuildBadge");if(badge)badge.textContent="BEREIA • V64"});
