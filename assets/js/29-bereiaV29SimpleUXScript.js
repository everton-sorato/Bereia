
window.addEventListener("load",()=>{
 const route=location.hash.slice(1)||'home';
 if(typeof go==='function')go(route,false);
 const b=document.getElementById("bereiaBuildBadge");if(b)b.textContent="BEREIA • V29";
});

