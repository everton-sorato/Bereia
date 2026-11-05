/* Stories reuse the same validated, offline-capable chapter service as the reader. */
(()=>{'use strict';
const slug=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replaceAll(' ','-');
async function read(card){
 if(!card.open||card.dataset.passageLoaded==='true'||card.dataset.passageLoading==='true')return;
 const body=card.querySelector('[data-b62-passage-path]'),box=body?.querySelector('.b62PassageText');if(!box)return;
 card.dataset.passageLoading='true';box.setAttribute('aria-busy','true');box.textContent='Carregando o texto bíblico…';
 try{
  const [name,chapter,range]=body.dataset.b62PassagePath.split('/'),[start,end]=range.split('-').map(Number);
  const book=bibleBooks.find(b=>slug(b[1])===name);if(!book)throw Error('Referência não cadastrada.');
  const result=await BereiaScripture.load('almeida-livre',book[0],Number(chapter));
  const verses=result.verses.filter(v=>v.number>=start&&v.number<=(end||start));
  if(!verses.length)throw Error('Passagem não encontrada neste capítulo.');
  box.innerHTML=verses.map(v=>'<p class="b62BibleVerse"><sup>'+v.number+'</sup> '+escapeHtml(v.text)+'</p>').join('');
  const credit=body.querySelector('[data-b62-api-credit]');if(credit)credit.textContent='Bíblia Livre: © 2018 Diego Santos, Mario Sérgio e Marco Teles. Atualização da tradução de João Ferreira de Almeida de 1819. CC BY 4.0. Texto sem edição. '+(result.saved?'Capítulo disponível neste dispositivo.':'Texto online; não foi possível salvar offline.');
  card.dataset.passageLoaded='true';
 }catch(e){box.replaceChildren();const p=document.createElement('p');p.textContent=e.message;const retry=document.createElement('button');retry.type='button';retry.className='btn';retry.textContent='Tentar novamente';retry.onclick=()=>read(card);box.append(p,retry)}
 finally{card.dataset.passageLoading='false';box.setAttribute('aria-busy','false')}
}
document.querySelectorAll('details.b62StoryCard').forEach(card=>card.addEventListener('toggle',()=>read(card)));
})();
