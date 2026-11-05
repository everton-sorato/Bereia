
(function(){
 const oldOpen=window.openSimpleBible;
 window.openSimpleBible=function(){
  if(typeof oldOpen==="function")oldOpen();
  setTimeout(()=>{document.getElementById("bibleBook")?.focus({preventScroll:true});document.querySelector('[data-page="bible"]')?.scrollIntoView({block:"start"});},180);
 };
 const oldBook=window.bookChanged;
 if(typeof oldBook==="function")window.bookChanged=function(){const r=oldBook.apply(this,arguments);setTimeout(()=>document.getElementById("bibleChapter")?.focus({preventScroll:true}),80);return r};
 window.addEventListener("load",()=>{const b=document.getElementById("bereiaBuildBadge");if(b)b.textContent="BEREIA • V30"});
})();

