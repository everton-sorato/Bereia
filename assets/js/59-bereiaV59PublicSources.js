/* Fontes públicas e licenças — inventário editorial BEREIA V65. */
(()=>{
'use strict';
const add=[
 {name:"Pleiades — lugares do mundo antigo",kind:"Nomes, referências e dados de geografia antiga para mapas próprios",license:"Creative Commons Atribuição 3.0 (CC BY 3.0). Dar crédito ao Pleiades; conferir as condições se o conjunto for adaptado.",status:"Dados abertos para uso com atribuição",url:"https://pleiades.stoa.org/help/using-pleiades-data",credit:"Pleiades: A Gazetteer of Ancient Places"},
 {name:"OpenBible.info — geografia bíblica",kind:"Nomes e coordenadas de lugares bíblicos para mapas próprios",license:"CC BY 4.0 para o conjunto. Geometrias derivadas do OpenStreetMap têm termos ODbL próprios; imagem de mapa não fica liberada automaticamente.",status:"Dados abertos; atribuir a fonte e conferir a camada cartográfica",url:"https://openbible.info/geo/",credit:"OpenBible.info; OpenStreetMap quando aplicável"},
 {name:"The Met — Open Access",kind:"Imagens de objetos arqueológicos e obras de acervo",license:"CC0 apenas para imagens de itens que o museu identifica como de domínio público e Open Access. Conferir a ficha de cada objeto.",status:"Reutilização gratuita nos itens elegíveis; confirmar item por item",url:"https://www.metmuseum.org/policies/image-resources",credit:"The Metropolitan Museum of Art"},
 {name:"Smithsonian Open Access",kind:"Imagens e dados de objetos de acervo, inclusive arqueológicos",license:"CC0 para materiais sinalizados como Open Access/CC0. Confirmar a licença e as notas específicas do item antes do uso.",status:"Reutilização nos itens marcados CC0; confirmar item por item",url:"https://www.si.edu/openaccess",credit:"Smithsonian Institution"},
 {name:"IPHAN — Banco de Imagens",kind:"Fotografias de patrimônio cultural e sítios arqueológicos brasileiros",license:"O banco informa CC BY-NC 4.0 como regra geral, mas a licença pode variar por item. Conferir o campo de licença na ficha; CC BY-NC exige atribuição e não permite uso comercial.",status:"Condicional; usar apenas após conferir a licença individual; CC BY-NC não serve para uso comercial",url:"https://bancodeimagens.iphan.gov.br/sobre-o-banco-de-imagens/",credit:"Instituto do Patrimônio Histórico e Artístico Nacional (IPHAN)"},
 {name:"Wikimedia Commons — imagens arqueológicas",kind:"Fotografias e mapas de achados, sítios e objetos",license:"A licença varia por arquivo. Usar somente após conferir a ficha; registrar autor, título, link da fonte, licença e alterações. CC BY-SA traz obrigação de compartilhar adaptações nos mesmos termos.",status:"Condicional à licença individual de cada arquivo",url:"https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia/pt",credit:"Autor indicado na página de cada arquivo"},
 {name:"Textos apócrifos em português sem fonte liberada",kind:"1 Enoque, Jubileus, Salmos de Salomão e outras traduções modernas",license:"A antiguidade do texto original não libera uma tradução moderna. É necessário localizar uma edição em domínio público/licença aberta ou obter autorização.",status:"Texto integral não incluído até confirmar uma edição reutilizável",url:"https://ebible.org/porbrbsl/",credit:"Identificar o tradutor e a edição antes de publicar"},
 {name:"King James em português e notas de estudo",kind:"BKJ/KJA em português e conteúdo editorial da Bíblia de Estudo Pentecostal",license:"A KJV inglesa de 1769 já listada no app não é a tradução brasileira BKJ/KJA. Notas de estudo também têm direitos próprios e precisam de autorização.",status:"Não incorporar texto integral ou notas sem licença escrita",url:"https://www.bvbooks.com.br/contato",credit:"Titular indicado na edição; notas pentecostais: CPAD"}
];
for(const item of add){if(!window.BEREIA_SOURCE_REGISTRY.some(x=>x.name===item.name))window.BEREIA_SOURCE_REGISTRY.push(item)}
const bpm=window.BEREIA_SOURCE_REGISTRY.find(x=>x.name.includes("Bíblia Portuguesa Mundial"));
if(bpm){bpm.kind="Leitor online em português brasileiro; a página da edição lista os 73 livros do cânon católico e outros textos antigos";bpm.license="A fonte identifica como domínio público. O projeto declara que é um rascunho em revisão e não apresenta imprimatur. O catálogo inclui também livros de outras coleções; não é uma aprovação eclesiástica.";bpm.status="Disponível online no BEREIA; texto não baixado nem habilitado para leitura offline"}
window.addEventListener("load",()=>{
 const p=document.querySelector("#bereiaSourcesSection details p");
 if(p)p.textContent="Inventário de textos, dados geográficos e imagens com domínio público ou licença aberta, além de fontes condicionais e conteúdos ainda sem autorização. Confira a licença de cada arquivo; a página de uma fonte não libera automaticamente todas as imagens do acervo.";
 const visible=[...document.querySelectorAll("details")].find(d=>d.querySelector("summary")?.textContent.includes("Fontes e licenças do BEREIA"));
 const sourceCards=document.querySelectorAll("#bereiaSourcesSection .source-card");
 if(visible&&sourceCards.length&&!document.querySelector("#bereiaPublicSourcesInventory")){
  const index=document.createElement("details");index.id="bereiaPublicSourcesInventory";index.style.cssText="margin-top:12px;padding:12px;border:1px solid #303640;border-radius:12px;background:#11151a";
  const title=document.createElement("summary");title.textContent="📚 Consultar fontes por item ("+sourceCards.length+")";title.style.cssText="cursor:pointer;color:#d7b56d;font-weight:600";index.append(title);
  const note=document.createElement("p");note.textContent="Licença, crédito e link de conferência. Imagens e mapas devem ser verificados individualmente; a licença dos dados não cobre automaticamente a imagem do mapa.";note.style.cssText="font-size:11px;color:#aaa;line-height:1.5";index.append(note);
  const list=document.createElement("div");list.className="public-source-list";list.style.cssText="display:grid;gap:10px;margin-top:12px";
  sourceCards.forEach(card=>list.append(card.cloneNode(true)));index.append(list);
  const grid=visible.querySelector(".blc-grid");(grid||visible).after(index);
 }
});
})();
