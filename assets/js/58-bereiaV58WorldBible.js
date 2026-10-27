/* BEREIA V64 — Biblioteca online da Bíblia Portuguesa Mundial. */
(()=>{'use strict';
const books={
 "Tobias":{code:"TOB",chapters:14},
 "Judite":{code:"JDT",chapters:16},
 "Sabedoria":{code:"WIS",chapters:19},
 "Eclesiástico (Sirácida)":{code:"SIR",chapters:51},
 "Baruc":{code:"BAR",chapters:6},
 "1 Macabeus":{code:"1MA",chapters:16},
 "2 Macabeus":{code:"2MA",chapters:15},
 "Adições a Ester":{code:"ESG",chapters:16},
 "Adições a Daniel":{code:"DAG",chapters:14}
};
function chapterUrl(book,ch){const d=books[book],n=Number(ch)||1;return d&&n>=1&&n<=d.chapters?"https://ebible.org/porbrbsl/"+d.code+String(n).padStart(2,"0")+".htm":"https://ebible.org/porbrbsl/"}
function notice(){return '<div class="bpmNotice"><b>Bíblia Portuguesa Mundial (BPM)</b><p>O eBible.org identifica esta tradução em português brasileiro como domínio público. O próprio projeto informa que o texto ainda é um rascunho em revisão e não apresenta imprimatur. O BEREIA abre a fonte original sem alterar o texto.</p><a href="https://ebible.org/porbrbsl/" target="_blank" rel="noopener noreferrer">Abrir a Bíblia completa no eBible.org ↗</a></div>'}
function chapterSelector(book){const d=books[book];if(!d)return "";return '<label for="bereiaPtChapter">Capítulo</label><select id="bereiaPtChapter" onchange="bereiaBpmLoadChapter(\''+book+'\')" style="background:#151515;color:#ddd;border:1px solid #3b3323;border-radius:10px;padding:9px">'+Array.from({length:d.chapters},(_,i)=>'<option value="'+(i+1)+'">Capítulo '+(i+1)+'</option>').join("")+'</select>'}
window.bereiaBpmLoadChapter=function(book){const ch=document.getElementById("bereiaPtChapter")?.value||1,url=chapterUrl(book,ch),frame=document.getElementById("bereiaPtFrame"),link=document.getElementById("bereiaPtOpen");if(frame)frame.src=url;if(link)link.href=url}
const previousSet=window.bereiaSetLibrary,previousOpen=window.bereiaOpenExtraBook;
window.bereiaSetLibrary=function(mode){
 if(mode!=="catholic")return previousSet(mode);
 const box=document.getElementById("bereiaStudyPanel");if(!box)return;
 box.innerHTML='<div class="bereia-library-reader"><h3>Bíblia Portuguesa Mundial</h3>'+notice()+'<p>A leitura online da BPM traz o texto bíblico e livros de outras coleções antigas. Para a tradição católica, consulte os 66 livros do leitor principal e os livros deuterocanônicos listados abaixo. As formas gregas de Ester e Daniel são expansões textuais, não livros independentes adicionais.</p><div class="bpmCatalog"><iframe loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://ebible.org/porbrbsl/" title="Catálogo da Bíblia Portuguesa Mundial no eBible.org"></iframe></div><p><a href="https://ebible.org/porbrbsl/" target="_blank" rel="noopener noreferrer">Se o catálogo não aparecer, abrir no eBible.org ↗</a></p><h3>Livros deuterocanônicos e formas gregas</h3>'+bereiaExtraBooks("catholic")+'</div>';
 box.classList.add("show");box.scrollIntoView({behavior:"smooth",block:"nearest"});
};
window.bereiaOpenExtraBook=function(mode,i){
 if(mode!=="catholic")return previousOpen(mode,i);
 const x=BEREIA_CATHOLIC_BOOKS[i],d=x&&books[x[0]],box=document.getElementById("bereiaStudyPanel");if(!x||!box)return;
 if(!d)return previousOpen(mode,i);
 const first=chapterUrl(x[0],1);
 box.innerHTML='<div class="bereia-library-reader"><h3>'+x[0]+'</h3><p>'+x[1]+'</p>'+notice()+chapterSelector(x[0])+'<div class="bereia-pt-reader"><p>Leitura carregada diretamente da fonte eBible.org.</p><iframe id="bereiaPtFrame" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="'+first+'" title="'+x[0]+' — Bíblia Portuguesa Mundial"></iframe><p><a id="bereiaPtOpen" href="'+first+'" target="_blank" rel="noopener noreferrer">Se a leitura não aparecer aqui, abrir o capítulo no eBible.org ↗</a></p></div></div>'+bereiaExtraBooks("catholic");
 box.classList.add("show");box.scrollIntoView({behavior:"smooth",block:"nearest"});
};
if(!document.getElementById("bereiaBpmStyles")){const s=document.createElement("style");s.id="bereiaBpmStyles";s.textContent=".bpmNotice{margin:12px 0;padding:14px;border:1px solid #6b5832;border-left:3px solid #d7b56d;border-radius:12px;background:#181710;color:#d6d1c5;font:12px/1.6 system-ui}.bpmNotice b{color:#e6c979}.bpmNotice p{margin:6px 0}.bpmNotice a{color:#e6c979}.bpmCatalog{margin:12px 0;border:1px solid #38372f;border-radius:14px;overflow:hidden;background:#101318}.bpmCatalog iframe,.bereia-pt-reader iframe{width:100%;height:min(68vh,720px);min-height:480px;border:1px solid #38372f;border-radius:12px;background:#fff}";document.head.append(s)}
window.addEventListener("load",()=>{const badge=document.getElementById("bereiaBuildBadge");if(badge)badge.textContent="BEREIA • V64"});
})();
