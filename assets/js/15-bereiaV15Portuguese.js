
window.BEREIA_PT_CATHOLIC={
 "Tobias":{slug:"tobias",chapters:14},"Judite":{slug:"judite",chapters:16},"Sabedoria":{slug:"sabedoria",chapters:19},"Eclesiástico (Sirácida)":{slug:"eclesiastico",chapters:51},"Baruc":{slug:"baruc",chapters:6},"1 Macabeus":{slug:"1-macabeus",chapters:16},"2 Macabeus":{slug:"2-macabeus",chapters:15},"Adições a Daniel":{slug:"daniel",chapters:14}
};
function bereiaPtCatholicUrl(book,ch){const d=BEREIA_PT_CATHOLIC[book];return d?"https://saosebastiaomococa.com.br/biblia/"+d.slug+"/"+(ch||1):""}
function bereiaPtChapterSelect(book){const d=BEREIA_PT_CATHOLIC[book];if(!d)return "";return '<select id="bereiaPtChapter" onchange="bereiaLoadPtChapter(\''+book.replace(/'/g,"\\'")+'\')" style="background:#151515;color:#ddd;border:1px solid #3b3323;border-radius:10px;padding:9px">'+Array.from({length:d.chapters},(_,i)=>'<option value="'+(i+1)+'">Capítulo '+(i+1)+'</option>').join("")+'</select>'}
function bereiaLoadPtChapter(book){const ch=document.getElementById("bereiaPtChapter")?.value||1,fr=document.getElementById("bereiaPtFrame");if(fr)fr.src=bereiaPtCatholicUrl(book,ch)}
const _extraV15=window.bereiaOpenExtraBook;
window.bereiaOpenExtraBook=function(mode,i){
 if(mode!=="catholic")return _extraV15(mode,i);
 const x=BEREIA_CATHOLIC_BOOKS[i],d=x&&BEREIA_PT_CATHOLIC[x[0]],box=document.getElementById("bereiaStudyPanel");if(!x||!box)return;
 if(!d)return _extraV15(mode,i);
 box.innerHTML='<div class="bereia-library-reader"><h3>'+x[0]+'</h3><p>'+x[1]+'</p>'+bereiaPtChapterSelect(x[0])+'<div class="bereia-pt-reader"><div class="bereia-reader-head"><b>Leitura em português</b><p>Pe. Antônio Pereira de Figueiredo — edição em domínio público; digitalização em revisão pela fonte.</p></div><iframe id="bereiaPtFrame" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="'+bereiaPtCatholicUrl(x[0],1)+'" title="'+x[0]+' em português"></iframe></div></div>'+bereiaExtraBooks("catholic");box.classList.add("show");box.scrollIntoView({behavior:"smooth",block:"nearest"});
};
window.addEventListener("load",()=>{const badge=document.getElementById("bereiaBuildBadge");if(badge)badge.textContent="BEREIA • V15"});
