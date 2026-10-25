
/* V18 — fonte única da Mensagem do Dia */
function bereiaDailyToday(){
 const list=(typeof DAILY!=="undefined"&&Array.isArray(DAILY)&&DAILY.length)?DAILY:(window.BEREIA_DAILY_FALLBACK||[]);
 if(!list.length)return null;
 const now=new Date(),start=new Date(now.getFullYear(),0,0),day=Math.floor((now-start)/86400000);
 return list[day%list.length];
}
function bereiaApplyDaily(){
 const d=bereiaDailyToday();if(!d)return null;window.dailyCurrent=d;
 [["dailyMessage","text"],["dailyRef","ref"],["bdcText","text"],["bdcRef","ref"],["dailyArtVerse","text"],["dailyArtRef","ref"]].forEach(([id,k])=>{const e=document.getElementById(id);if(e)e.textContent=(k==="text"?"“":"")+d[k]+(k==="text"?"”":"")});
 ["dailyVisual","bereiaDailyCover","dailyArtPreview"].forEach(id=>{const e=document.getElementById(id);if(e&&d.img)e.style.backgroundImage='url("'+d.img+'")'});
 return d;
}
window.initDaily=function(){return bereiaApplyDaily()};
window.openDailyArt=function(ev){
 if(ev&&ev.stopPropagation)ev.stopPropagation();const d=bereiaApplyDaily(),modal=document.getElementById("dailyArtModal");if(!d||!modal)return;
 const site=document.getElementById("dailyArtSite");if(site)site.textContent=typeof bereiaSiteUrl==="function"?(bereiaSiteUrl()||"Site oficial BEREIA"):"Site oficial BEREIA";
 modal.classList.add("open");document.body.style.overflow="hidden";
};
window.addEventListener("load",()=>{setTimeout(bereiaApplyDaily,0);setTimeout(bereiaApplyDaily,250);const badge=document.getElementById("bereiaBuildBadge");if(badge)badge.textContent="BEREIA • V18"});
