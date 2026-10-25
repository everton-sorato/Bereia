
(function(){
 const PT={
  'μη':'não','μην':'não','ου':'não','ουκ':'não','ουχ':'não',
  'συσχηματιζω':'conformar-se; moldar-se a um padrão',
  'αιων':'era; século; mundo presente',
  'θεος':'Deus','κυριος':'Senhor; mestre','ιησους':'Jesus','χριστος':'Cristo; Messias; Ungido',
  'λογος':'palavra; mensagem; discurso','αγαπη':'amor','αγαπαω':'amar',
  'πιστις':'fé; confiança; fidelidade','πιστευω':'crer; confiar',
  'ζωη':'vida','κοσμος':'mundo; humanidade; ordem criada','πνευμα':'espírito; vento; sopro',
  'αγιος':'santo; separado','χαρις':'graça; favor','ειρηνη':'paz; bem-estar',
  'αληθεια':'verdade','φως':'luz','σωμα':'corpo','εκκλησια':'assembleia; igreja',
  'βασιλεια':'reino; reinado','ουρανος':'céu','ανθρωπος':'ser humano; homem',
  'καρδια':'coração; centro interior','μαθητης':'discípulo; aprendiz','αποστολος':'enviado; apóstolo',
  'σωτηρια':'salvação','αμαρτια':'pecado','δικαιοσυνη':'justiça; retidão',
  'δυναμις':'poder; capacidade','σοφια':'sabedoria','οδος':'caminho',
  'νους':'mente; entendimento','ανακαινωσις':'renovação','μεταμορφοω':'transformar; transfigurar',
  'αγαθος':'bom; benéfico','τελειος':'perfeito; completo; maduro',
  'θελημα':'vontade; propósito','παρακαλεω':'exortar; encorajar; chamar para perto',
  'αδελφος':'irmão','οικτιρμος':'misericórdia; compaixão','θυσια':'sacrifício',
  'ζαω':'viver','λατρεια':'culto; serviço sagrado'
 };
 function key(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ς/g,'σ').toLowerCase().replace(/[^\p{L}]/gu,'')}
 function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
 function portuguese(w,lang){
   if(w.translation)return w.translation;
   const lemmaKey=key(w.lemma||w.original);
   if(lang==='Grego koiné'&&PT[lemmaKey])return PT[lemmaKey];
   const m=String(w.meaning||'').trim();
   if(m&&!/Lema identificado|ainda não está|em expansão/i.test(m))return m.split(';').slice(0,3).join(';');
   return '';
 }
 window.bereiaRenderOriginalWords=function(items,lang){
   const words=document.getElementById('bomWords');if(!words)return;words.innerHTML='';
   items.forEach(w=>{
     const pt=portuguese(w,lang);
     const d=document.createElement('div');d.className='bomWord';
     d.innerHTML='<div class="original">'+esc(w.original||'')+'</div>'+
       '<div class="translit">'+esc(w.transliteration||w.translit||'')+'</div>'+
       '<div class="ptTranslation '+(pt?'':'translationPending')+'"><b>Português:</b> '+esc(pt||'tradução em expansão')+'</div>'+
       '<div class="lemmaLine">'+(w.lemma?'Lema: '+esc(w.lemma):'')+(w.morph?' · Morfologia: '+esc(w.morph):'')+'</div>'+
       '<div class="meaning"><b>Sentido lexical:</b> '+esc(w.meaning||pt||'Em expansão.')+'</div>'+
       (w.literal?'<div class="contextSense"><b>Neste versículo:</b> '+esc(w.literal)+'</div>':'');
     words.appendChild(d);
   });
   const status=document.getElementById('bomStatus');
   if(status)status.innerHTML='<i></i><span>'+items.length+' palavra'+(items.length===1?'':'s')+' principal'+(items.length===1?'':'is')+' em '+esc(lang)+'</span>';
 };
 const oldFetch=window.bereiaFetchGreek;
 if(typeof oldFetch==='function')window.bereiaFetchGreek=async function(){
   const items=await oldFetch.apply(this,arguments);
   return (items||[]).map(w=>({...w,translation:PT[key(w.lemma||w.original)]||w.translation||''}));
 };
 window.addEventListener('load',()=>{const b=document.getElementById('bereiaBuildBadge');if(b)b.textContent='BEREIA • V44'});
})();
