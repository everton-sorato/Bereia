
window.BEREIA_DEEP_MODEL={
 original:{title:"Texto original",desc:"Forma original, transliteração, lema e morfologia quando a fonte aberta fornecer esses dados."},
 lexical:{title:"Sentido lexical",desc:"Significado básico da palavra no idioma original, separado da aplicação devocional."},
 context:{title:"Contexto da passagem",desc:"Informações literárias e históricas diretamente úteis para compreender o versículo."},
 geography:{title:"Geografia e mapas",desc:"Locais, regiões, rotas e distâncias relacionados à passagem quando identificáveis."},
 archaeology:{title:"Arqueologia",desc:"Somente evidências documentadas, distinguindo achado, interpretação e hipótese."},
 parallels:{title:"Textos relacionados",desc:"Paralelos bíblicos e, quando pertinente, literatura antiga claramente identificada por tradição."}
};
function bereiaDeepFrameworkHTML(){
 return '<div class="bereia-deep-sections">'+Object.values(BEREIA_DEEP_MODEL).map(x=>'<div class="bereia-deep-section"><b>'+x.title+'</b><span>'+x.desc+'</span></div>').join("")+'</div>';
}
function bereiaEnsureDeepFramework(){
 const modal=document.querySelector("#bereiaDeepModal .deepContent,#bereiaDeepModal .modalBody,#bereiaDeepModal .sheetBody,#bereiaDeepModal");if(!modal||modal.querySelector(".bereia-deep-sections"))return;
 modal.insertAdjacentHTML("beforeend",bereiaDeepFrameworkHTML());
}
const _deepV17=window.openBereiaDeep;
if(typeof _deepV17==="function"){window.openBereiaDeep=async function(){const r=await _deepV17.apply(this,arguments);setTimeout(bereiaEnsureDeepFramework,140);return r}}
window.addEventListener("load",()=>{const badge=document.getElementById("bereiaBuildBadge");if(badge)badge.textContent="BEREIA • V17"});
