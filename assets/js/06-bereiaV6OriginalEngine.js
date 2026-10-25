
const BEREIA_BOOK_CODES={
 "Mateus":"Mt","Marcos":"Mk","Lucas":"Lk","João":"Jn","Joao":"Jn","Atos":"Ac","Romanos":"Ro",
 "1 Coríntios":"1Co","1 Corintios":"1Co","2 Coríntios":"2Co","2 Corintios":"2Co","Gálatas":"Ga","Galatas":"Ga",
 "Efésios":"Eph","Efesios":"Eph","Filipenses":"Php","Colossenses":"Col","1 Tessalonicenses":"1Th","2 Tessalonicenses":"2Th",
 "1 Timóteo":"1Ti","1 Timoteo":"1Ti","2 Timóteo":"2Ti","2 Timoteo":"2Ti","Tito":"Tit","Filemom":"Phm","Hebreus":"Heb",
 "Tiago":"Jas","1 Pedro":"1Pe","2 Pedro":"2Pe","1 João":"1Jn","1 Joao":"1Jn","2 João":"2Jn","2 Joao":"2Jn",
 "3 João":"3Jn","3 Joao":"3Jn","Judas":"Jud","Apocalipse":"Re"
};
const BEREIA_MORPH_FILES={
 Mt:"61-Mt-morphgnt.txt",Mk:"62-Mk-morphgnt.txt",Lk:"63-Lk-morphgnt.txt",Jn:"64-Jn-morphgnt.txt",
 Ac:"65-Ac-morphgnt.txt",Ro:"66-Ro-morphgnt.txt","1Co":"67-1Co-morphgnt.txt","2Co":"68-2Co-morphgnt.txt",
 Ga:"69-Ga-morphgnt.txt",Eph:"70-Eph-morphgnt.txt",Php:"71-Php-morphgnt.txt",Col:"72-Col-morphgnt.txt",
 "1Th":"73-1Th-morphgnt.txt","2Th":"74-2Th-morphgnt.txt","1Ti":"75-1Ti-morphgnt.txt","2Ti":"76-2Ti-morphgnt.txt",
 Tit:"77-Tit-morphgnt.txt",Phm:"78-Phm-morphgnt.txt",Heb:"79-Heb-morphgnt.txt",Jas:"80-Jas-morphgnt.txt",
 "1Pe":"81-1Pe-morphgnt.txt","2Pe":"82-2Pe-morphgnt.txt","1Jn":"83-1Jn-morphgnt.txt","2Jn":"84-2Jn-morphgnt.txt",
 "3Jn":"85-3Jn-morphgnt.txt",Jud:"86-Jud-morphgnt.txt",Re:"87-Re-morphgnt.txt"
};
const BEREIA_GREEK_GLOSSES={
 "θεός":"Deus","κύριος":"Senhor; mestre","Ἰησοῦς":"Jesus","Χριστός":"Cristo; Messias; Ungido",
 "λόγος":"palavra; mensagem; discurso","ἀγάπη":"amor","ἀγαπάω":"amar; demonstrar amor","πίστις":"fé; confiança; fidelidade",
 "πιστεύω":"crer; confiar","ζωή":"vida","κόσμος":"mundo; humanidade; ordem criada","πνεῦμα":"espírito; vento; sopro",
 "ἅγιος":"santo; separado","χάρις":"graça; favor","εἰρήνη":"paz; bem-estar","ἀλήθεια":"verdade","φῶς":"luz",
 "σῶμα":"corpo","ἐκκλησία":"assembleia; igreja","βασιλεία":"reino; reinado","οὐρανός":"céu","ἄνθρωπος":"ser humano; homem",
 "καρδία":"coração; centro interior","μαθητής":"discípulo; aprendiz","ἀπόστολος":"enviado; apóstolo","σωτηρία":"salvação",
 "ἁμαρτία":"pecado","δικαιοσύνη":"justiça; retidão","δύναμις":"poder; capacidade","σοφία":"sabedoria","ὁδός":"caminho"
};
function bereiaGreekTranslit(s){
 const m={"α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"ē","θ":"th","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"x","ο":"o","π":"p","ρ":"r","σ":"s","ς":"s","τ":"t","υ":"y","φ":"ph","χ":"ch","ψ":"ps","ω":"ō"};
 return [...String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"")].map(c=>m[c.toLowerCase()]||c).join("");
}
function bereiaImportantGreek(row){
 const pos=row.pos||"";
 return pos.startsWith("N")||pos.startsWith("V")||pos.startsWith("A")||pos.startsWith("D");
}
async function bereiaFetchGreek(book,chapter,verse){
 const code=BEREIA_BOOK_CODES[book],file=BEREIA_MORPH_FILES[code]; if(!file)return [];
 const url="https://raw.githubusercontent.com/morphgnt/sblgnt/master/"+file;
 const res=await fetch(url,{cache:"force-cache"}); if(!res.ok)throw new Error("Fonte grega indisponível");
 const txt=await res.text(),target=String(chapter).padStart(2,"0")+String(verse).padStart(2,"0");
 const rows=[];
 for(const line of txt.split(/\r?\n/)){
   if(!line.trim())continue;
   const cols=line.trim().split(/\s+/); if(cols.length<7)continue;
   const bc=cols[0]; if(!bc.endsWith(target))continue;
   rows.push({pos:cols[1],parse:cols[2],text:cols[3],word:cols[4],norm:cols[5],lemma:cols.slice(6).join(" ")});
 }
 let imp=rows.filter(bereiaImportantGreek);
 if(imp.length>8)imp=imp.slice(0,8); if(!imp.length)imp=rows.slice(0,8);
 return imp.map(w=>({original:w.word,transliteration:bereiaGreekTranslit(w.lemma||w.norm),lemma:w.lemma,
   meaning:BEREIA_GREEK_GLOSSES[w.lemma]||"Lema identificado; significado lexical ampliado ainda não está no dicionário local.",
   literal:"Forma encontrada no texto grego deste versículo.",morph:w.parse}));
}
function bereiaRenderOriginalWords(items,lang){
 const words=document.getElementById("bomWords"); words.innerHTML="";
 items.forEach(w=>{
   const d=document.createElement("div");d.className="bomWord";
   d.innerHTML=`<div class="original">${w.original||""}</div>
   <div class="translit">${w.transliteration||""}</div>
   <div class="lemmaLine">${w.lemma?`Lema: ${w.lemma}`:""}${w.morph?` · Morfologia: ${w.morph}`:""}</div>
   <div class="meaning"><b>Sentido lexical:</b> ${w.meaning||""}</div>
   ${w.literal?`<div class="contextSense"><b>Neste versículo:</b> ${w.literal}</div>`:""}`;
   words.appendChild(d);
 });
 document.getElementById("bomStatus").innerHTML=`<i></i><span>${items.length} palavra${items.length===1?"":"s"} principal${items.length===1?"":"is"} em ${lang}</span>`;
}
const _bereiaOldOpen=window.openOriginalStudy;
window.openOriginalStudy=async function(){
 if(!bereiaSelected.el)return;
 const lang=originalLanguage(bereiaSelected.book,bereiaSelected.chapter);
 document.getElementById("bomTitle").textContent=bereiaSelected.ref||"Texto original";
 document.getElementById("bomVerse").textContent=bereiaSelected.text;
 document.getElementById("bomLang").textContent="Idioma-base: "+lang;
 document.getElementById("bomWords").innerHTML="";
 document.getElementById("bomNotice").style.display="none";
 document.getElementById("bomStatus").innerHTML='<i></i><span>Carregando palavras do texto original…</span>';
 document.getElementById("bereiaOriginalModal").classList.add("open");
 try{
   let items=[];
   if(lang==="Grego koiné")items=await bereiaFetchGreek(bereiaSelected.book,bibNum(bereiaSelected.chapter),bibNum(bereiaSelected.verse));
   // Existing local verified Hebrew/Aramaic examples are retained until OSHB XML adapter is loaded.
   if(!items.length && typeof bereiaKeyWords==="function")items=bereiaKeyWords(bereiaSelected.ref);
   if(items.length){bereiaRenderOriginalWords(items,lang);return}
   throw new Error("Sem dados locais para esta referência");
 }catch(e){
   const local=(typeof bereiaKeyWords==="function")?bereiaKeyWords(bereiaSelected.ref):[];
   if(local.length){bereiaRenderOriginalWords(local,lang);return}
   document.getElementById("bomStatus").innerHTML='<i></i><span>Base original não pôde ser carregada neste modo</span>';
   document.getElementById("bomNotice").style.display="block";
   document.getElementById("bomNotice").textContent=
     location.protocol==="file:"?
     "Este arquivo foi aberto diretamente no celular (content:// ou file://). O navegador pode bloquear a consulta à base linguística externa. Quando o BEREIA estiver publicado em HTTPS, a consulta automática poderá funcionar. Os exemplos já incorporados continuam disponíveis.":
     "Não foi possível consultar a base linguística agora. Verifique a conexão e tente novamente.";
 }
}
function bibNum(x){const m=String(x||"").match(/\d+/);return m?Number(m[0]):0}
