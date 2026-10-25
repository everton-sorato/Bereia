
/* V16 — uma única Mensagem do Dia em capa, modal e imagem compartilhável */
function bereiaSyncDailyEverywhere(){
 const d=window.dailyCurrent||(typeof DAILY!=="undefined"?DAILY[0]:null);if(!d)return;
 const m=document.getElementById("dailyMessage"),r=document.getElementById("dailyRef"),v=document.getElementById("dailyVisual");
 if(m)m.textContent="“"+d.text+"”";if(r)r.textContent=d.ref;if(v)v.style.backgroundImage='url("'+d.img+'")';
 const av=document.getElementById("dailyArtVerse"),ar=document.getElementById("dailyArtRef"),ap=document.getElementById("dailyArtPreview");
 if(av)av.textContent="“"+d.text+"”";if(ar)ar.textContent=d.ref;if(ap)ap.style.backgroundImage='url("'+d.img+'")';
}
const _initDailyV16=window.initDaily;
window.initDaily=function(){if(typeof _initDailyV16==="function")_initDailyV16.apply(this,arguments);bereiaSyncDailyEverywhere()};
const _openDailyArtV16=window.openDailyArt;
window.openDailyArt=function(ev){
 if(ev&&ev.stopPropagation)ev.stopPropagation();
 bereiaSyncDailyEverywhere();
 const d=window.dailyCurrent||(typeof DAILY!=="undefined"?DAILY[0]:null),modal=document.getElementById("dailyArtModal");if(!d||!modal)return;
 document.getElementById("dailyArtVerse").textContent="“"+d.text+"”";
 document.getElementById("dailyArtRef").textContent=d.ref;
 document.getElementById("dailyArtPreview").style.backgroundImage='url("'+d.img+'")';
 const site=document.getElementById("dailyArtSite");if(site)site.textContent=typeof bereiaSiteUrl==="function"?(bereiaSiteUrl()||"Site oficial BEREIA"):"Site oficial BEREIA";
 modal.classList.add("open");document.body.style.overflow="hidden";
};
window.addEventListener("load",()=>{bereiaSyncDailyEverywhere();const badge=document.getElementById("bereiaBuildBadge");if(badge)badge.textContent="BEREIA • V16"});
