
window.BEREIA_RESEARCH=[
 {group:"historia",title:"Israel e o mundo bíblico — fontes primárias",note:"Biblioteca digital de textos e objetos históricos. Pesquise inscrições e manuscritos; não confundir uma peça histórica com prova de todos os relatos bíblicos.",source:"British Museum — coleção",url:"https://www.britishmuseum.org/collection",rights:"Metadados e páginas consultáveis; licença de cada imagem ou objeto deve ser conferida."},
 {group:"historia",title:"História de Israel — enciclopédia acadêmica",note:"Artigos históricos e geográficos com bibliografia. Diferenciar pesquisa acadêmica de interpretação religiosa.",source:"World History Encyclopedia",url:"https://www.worldhistory.org/israel/",rights:"Leitura e links; reprodução integral requer verificação de direitos."},
 {group:"arqueologia",title:"Arqueologia de Israel",note:"Autoridade de Antiguidades de Israel: descobertas, escavações e documentação arqueológica.",source:"Israel Antiquities Authority",url:"https://www.antiquities.org.il/",rights:"Consulta e referência; imagens e textos não são automaticamente livres."},
 {group:"arqueologia",title:"Objetos e manuscritos do Oriente Próximo",note:"Catálogo museológico para verificar datação, procedência e identificação de artefatos.",source:"British Museum",url:"https://www.britishmuseum.org/collection",rights:"Citar ficha de catálogo; reutilizar imagem só após conferir licença."},
 {group:"mapas",title:"Localização dos lugares bíblicos",note:"Base com possíveis localizações e graus de confiança; citar incerteza quando houver.",source:"OpenBible.info Bible Geocoding",url:"https://openbible.info/geo/",rights:"Base CC BY, atribuir OpenBible.info; mapas e fotos podem ter licenças diferentes."},
 {group:"originais",title:"Hebraico bíblico e morfologia",note:"Ferramentas e dados lexicais com licenças que variam por conjunto; conferir antes de incorporar.",source:"STEP Bible / Tyndale",url:"https://tyndale.github.io/STEPBible-Data/",rights:"Licenças por arquivo/conjunto; não tratar toda a plataforma como domínio público."},
 {group:"originais",title:"Manuscritos bíblicos digitais",note:"Acervo de manuscritos e materiais de pesquisa para estudos textuais.",source:"Center for the Study of New Testament Manuscripts",url:"https://www.csntm.org/",rights:"Consulta; permissões de reprodução dependem do acervo."},
 {group:"traducoes",title:"ARC, ARA, NAA e NTLH",note:"Solicitar autorização para disponibilizar texto integral, armazenamento offline, pesquisa, comparação de versículos e uso comercial.",source:"Sociedade Bíblica do Brasil",url:"https://www.sbb.org.br/",rights:"Permissão para texto integral ainda não obtida."},
 {group:"traducoes",title:"Nova Versão Internacional (NVI)",note:"Solicitar licença de texto integral e integração no aplicativo, inclusive distribuição digital.",source:"Biblica",url:"https://www.biblica.com/",rights:"Permissão ainda não obtida."},
 {group:"traducoes",title:"King James Version",note:"Verificar edição e jurisdição: direitos da Coroa britânica no Reino Unido e regras de uso podem variar.",source:"STEP Bible — KJV",url:"https://www.stepbible.org/version.jsp?version=KJV",rights:"Não presumir liberação mundial irrestrita."}
];
window.bereiaShowResearch=function(group){
 const root=document.getElementById("bereiaResearchCards");if(!root)return;
 const items=BEREIA_RESEARCH.filter(x=>x.group===group);
 root.innerHTML=items.map(x=>'<article class="bh-card"><b>'+x.title+'</b><p>'+x.note+'</p><div class="bh-status">Fonte: '+x.source+'</div><div class="bh-status">Direitos: '+x.rights+'</div><a href="'+x.url+'" target="_blank" rel="noopener noreferrer">Consultar fonte oficial ↗</a></article>').join("");
};
window.addEventListener("load",()=>{
 if(document.getElementById("bereiaResearchHub"))return;
 const anchor=document.getElementById("bereiaSourcesSection")||document.getElementById("bereiaSimpleEntry");if(!anchor)return;
 const hub=document.createElement("section");hub.id="bereiaResearchHub";
 hub.innerHTML='<details><summary>🏺 Centro de pesquisa bíblica — história, arqueologia e licenças</summary><p style="font-size:12px;color:#aaa">Fontes externas identificadas para consulta. Integração de conteúdo e reprodução de imagens dependem das respectivas licenças.</p><div class="bh-tabs"><button onclick="bereiaShowResearch(\'historia\')">História de Israel</button><button onclick="bereiaShowResearch(\'arqueologia\')">Arqueologia</button><button onclick="bereiaShowResearch(\'mapas\')">Mapas</button><button onclick="bereiaShowResearch(\'originais\')">Originais</button><button onclick="bereiaShowResearch(\'traducoes\')">Licenças de traduções</button></div><div id="bereiaResearchCards"></div></details>';
 anchor.insertAdjacentElement("afterend",hub);bereiaShowResearch("historia");
 const badge=document.getElementById("bereiaBuildBadge");if(badge)badge.textContent="BEREIA • V20";
});
