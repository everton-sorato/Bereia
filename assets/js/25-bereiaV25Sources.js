
window.BEREIA_PASSAGE_SOURCES=[["2 Samuel",1,24,"Estela de Tel Dan","Inscrição aramaica do século IX a.C. menciona a Casa de Davi; não comprova cada episódio do reinado.","https://thejewishmuseum.org/exhibitions/tel-dan-stele/"],["2 Reis",20,20,"Túnel e inscrição de Siloé","Inscrição descreve obra hidráulica em Jerusalém; relacionada ao contexto de Ezequias.","https://image-database.nes.lsa.umich.edu/items/show/86"],["2 Crônicas",32,32,"Túnel e inscrição de Siloé","Documentação epigráfica e arqueológica do sistema de água da Jerusalém antiga.","https://image-database.nes.lsa.umich.edu/items/show/86"],["Isaías",1,66,"Grande Rolo de Isaías","Testemunho antigo da transmissão do texto; não é prova dos acontecimentos narrados.","https://www.imj.org.il/en/exhibitions/voice-desert"],["Êxodo",15,15,"Manuscritos do cântico do mar","Fragmentos antigos de Êxodo 15 ajudam a estudar a transmissão textual.","https://www.imj.org.il/en/exhibitions/piecing-together-past"],["Gênesis",6,15,"Apócrifo de Gênesis","Releitura judaica antiga de Gênesis, descoberta entre os Manuscritos do Mar Morto.","https://www.imj.org.il/en/exhibitions/genesis-retold-0"]];
const _v25context=window.bereiaContextHTML;
window.bereiaContextHTML=function(){
 const base=typeof _v25context==="function"?_v25context():"";
 const s=typeof bereiaSelected!=="undefined"?bereiaSelected:{};
 const matches=BEREIA_PASSAGE_SOURCES.filter(x=>x[0]===s.book&&Number(s.chapter)>=x[1]&&Number(s.chapter)<=x[2]);
 return base+matches.map(x=>'<div style="margin-top:10px;border:1px solid #54462b;border-radius:12px;padding:12px;background:#111;color:#ddd;font:12px/1.5 system-ui"><b style="color:#e8c67b">🏺 '+x[3]+'</b><p>'+x[4]+'</p><a style="color:#e8c67b" href="'+x[5]+'" target="_blank" rel="noopener noreferrer">Consultar fonte documentada ↗</a></div>').join("");
};
window.addEventListener("load",()=>{const b=document.getElementById("bereiaBuildBadge");if(b)b.textContent="BEREIA • V25"});
