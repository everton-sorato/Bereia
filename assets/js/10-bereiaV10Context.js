
window.BEREIA_CONTEXT_INDEX={
 "Gênesis 1":{geo:"Mesopotâmia e antigo Oriente Próximo formam o horizonte geográfico-cultural das narrativas de origem.",arch:"O estudo arqueológico aqui serve ao contexto do antigo Oriente Próximo; não deve ser apresentado como prova direta de eventos primordiais.",map:"Contextualizar o antigo Oriente Próximo."},
 "Êxodo":{geo:"Egito, Sinai e Canaã são os principais eixos geográficos.",arch:"Evidências do Egito e do Levante ajudam a reconstruir o ambiente histórico; identificação de rotas e sítios específicos pode ser debatida.",map:"Eixo Egito → Sinai → Canaã."},
 "Daniel":{geo:"Judá e Babilônia são centrais ao contexto do exílio.",arch:"Fontes mesopotâmicas e sítios babilônicos ajudam a contextualizar impérios, administração e vida urbana.",map:"Jerusalém → Babilônia."},
 "Mateus":{geo:"Judeia, Galileia e Jerusalém estruturam grande parte da narrativa.",arch:"Sítios e inscrições do período do Segundo Templo ajudam a contextualizar o mundo de Jesus.",map:"Galileia → Judeia → Jerusalém."},
 "João":{geo:"Galileia, Samaria, Judeia e Jerusalém aparecem em movimentos importantes da narrativa.",arch:"Locais de Jerusalém associados ao período do Segundo Templo são relevantes ao contexto joanino.",map:"Galileia, Samaria e Jerusalém."},
 "Atos":{geo:"Jerusalém, Judeia, Samaria, Ásia Menor, Grécia e Roma acompanham a expansão narrada em Atos.",arch:"Inscrições, vias romanas e cidades greco-romanas ajudam a contextualizar viagens e comunidades.",map:"Jerusalém → Mediterrâneo oriental → Roma."}
};
function bereiaContextFor(ref){
 ref=String(ref||"");let hit=null,key="";
 for(const k of Object.keys(BEREIA_CONTEXT_INDEX)){if(ref.startsWith(k)){hit=BEREIA_CONTEXT_INDEX[k];key=k;break}}
 if(!hit)return '<div class="bereia-context-note">Camada contextual preparada. O BEREIA só exibirá afirmações específicas quando houver dados e fontes adequados para a passagem.</div>';
 return '<div class="bereia-context-note"><b>Geografia:</b> '+hit.geo+'<br><b>Mapa:</b> '+hit.map+'<br><b>Arqueologia:</b> '+hit.arch+'</div>';
}
function bereiaInjectContext(){
 const modal=document.querySelector("#bereiaDeepModal .deepContent,#bereiaDeepModal .modalBody,#bereiaDeepModal .sheetBody,#bereiaDeepModal");if(!modal||modal.querySelector(".bereia-context-tools"))return;
 const ref=window.bereiaSelected?.ref||"";
 modal.insertAdjacentHTML("beforeend",'<div class="bereia-context-tools"><button onclick="bereiaToggleLayer(\'maps\')">🗺️ Mapa</button><button onclick="bereiaToggleLayer(\'geography\')">🌍 Geografia</button><button onclick="bereiaToggleLayer(\'archaeology\')">🏺 Arqueologia</button></div>'+bereiaContextFor(ref));
}
const _deepV10=window.openBereiaDeep;if(typeof _deepV10==="function"){window.openBereiaDeep=async function(){const r=await _deepV10.apply(this,arguments);setTimeout(bereiaInjectContext,100);return r}}
window.addEventListener("load",()=>{const badge=document.getElementById("bereiaBuildBadge");if(badge)badge.textContent="BEREIA • V10"});
