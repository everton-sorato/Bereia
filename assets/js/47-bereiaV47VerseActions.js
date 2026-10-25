
(function(){
 const STORAGE_HL='bereia:highlights:v1',STORAGE_NOTES='bereia:verseNotes:v1';
 const selected=new Map();
 function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
 function loadObj(key){try{return JSON.parse(localStorage.getItem(key)||'{}')}catch(e){return {}}}
 function saveObj(key,obj){localStorage.setItem(key,JSON.stringify(obj))}
 function currentMeta(n,el){
   const bi=Number(document.getElementById('bibleBook')?.value||0),b=typeof bibleBooks!=='undefined'?bibleBooks[bi]:null,ch=Number(document.getElementById('bibleChapter')?.value||0);
   const text=(el?.querySelector('.verseText,.vt,.verse-text')?.textContent||'').trim();
   return {id:(b?.[0]||bi)+':'+ch+':'+n,bookIndex:bi,book:b?.[1]||'',osis:b?.[0]||'',chapter:ch,verse:Number(n),text,version:document.getElementById('bibleVersion')?.value||''};
 }
 function ensureBar(){
   let bar=document.getElementById('bereiaVerseActions');if(bar)return bar;
   bar=document.createElement('div');bar.id='bereiaVerseActions';
   bar.innerHTML='<div class="bvaTop"><b id="bvaCount">1 versículo selecionado</b><button type="button" id="bvaClear">Limpar seleção</button></div>'+
   '<div class="bvaBtns"><button type="button" data-act="mark">🖍 Marcar</button><button type="button" data-act="copy">📋 Copiar</button><button type="button" data-act="image">🖼 Imagem</button><button type="button" data-act="note">📝 Nota</button><button type="button" data-act="share">↗ Compartilhar</button></div>'+
   '<div id="bereiaColorPalette">'+
   '<button data-color="yellow" style="background:#f3d84b" title="Amarelo"></button><button data-color="green" style="background:#5dd37e" title="Verde"></button><button data-color="blue" style="background:#59a6ff" title="Azul"></button><button data-color="purple" style="background:#ad71ff" title="Roxo"></button><button data-color="red" style="background:#ff6565" title="Vermelho"></button><button data-color="orange" style="background:#ffa648" title="Laranja"></button><button data-color="none" title="Remover marcação"></button>'+
   '</div>';
   document.body.appendChild(bar);
   bar.addEventListener('click',async e=>{
     const color=e.target.closest('[data-color]')?.dataset.color;
     if(color){applyHighlight(color);return}
     const act=e.target.closest('[data-act]')?.dataset.act;if(!act)return;
     if(act==='mark')document.getElementById('bereiaColorPalette')?.classList.toggle('show');
     if(act==='copy')await copySelected();
     if(act==='note')addNote();
     if(act==='share')await shareSelected();
     if(act==='image')await imageSelected();
   });
   bar.querySelector('#bvaClear').onclick=clearSelection;
   return bar;
 }
 function updateBar(){
   const bar=ensureBar(),n=selected.size;
   bar.classList.toggle('show',n>0);
   const count=bar.querySelector('#bvaCount');if(count)count.textContent=n+(n===1?' versículo selecionado':' versículos selecionados');
   if(!n)document.getElementById('bereiaColorPalette')?.classList.remove('show');
 }
 function clearSelection(){
   selected.clear();document.querySelectorAll('#bibleReader .v.bereiaMultiSelected').forEach(x=>x.classList.remove('bereiaMultiSelected'));updateBar();
 }
 function refFor(v){return v.book+' '+v.chapter+':'+v.verse}
 function selectedArray(){return Array.from(selected.values()).sort((a,b)=>a.bookIndex-b.bookIndex||a.chapter-b.chapter||a.verse-b.verse)}
 function textBlock(){
   const a=selectedArray();if(!a.length)return '';
   return a.map(v=>'📖 '+refFor(v)+'\n'+v.text).join('\n\n');
 }
 function applyHighlight(color){
   const h=loadObj(STORAGE_HL);
   selected.forEach(v=>{if(color==='none')delete h[v.id];else h[v.id]=color;const el=document.querySelector('#bibleReader .v[data-verse="'+v.verse+'"]');if(el){if(color==='none')el.removeAttribute('data-bereia-highlight');else el.setAttribute('data-bereia-highlight',color)}});
   saveObj(STORAGE_HL,h);document.getElementById('bereiaColorPalette')?.classList.remove('show');if(typeof toast==='function')toast(color==='none'?'Marcação removida':'Versículo marcado');
 }
 async function copySelected(){
   const txt=textBlock();if(!txt)return;
   try{await navigator.clipboard.writeText(txt);if(typeof toast==='function')toast('Versículo(s) copiado(s)')}catch(e){const ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();if(typeof toast==='function')toast('Versículo(s) copiado(s)')}
 }
 function addNote(){
   const a=selectedArray();if(!a.length)return;
   const notes=loadObj(STORAGE_NOTES),key=a.map(v=>v.id).join('|'),old=notes[key]?.text||'';
   const text=prompt('Escreva sua anotação para '+(a.length===1?refFor(a[0]):a.length+' versículos')+':',old);
   if(text===null)return;
   if(text.trim())notes[key]={text:text.trim(),refs:a.map(refFor),updated:new Date().toISOString()};else delete notes[key];
   saveObj(STORAGE_NOTES,notes);if(typeof toast==='function')toast(text.trim()?'Nota salva':'Nota removida');
 }
 async function shareSelected(){
   const txt=textBlock();if(!txt)return;
   try{if(navigator.share){await navigator.share({title:'BEREIA • Bíblia',text:txt});return}}catch(e){if(e?.name==='AbortError')return}
   await copySelected();if(typeof toast==='function')toast('Texto copiado para compartilhar');
 }
 function wrap(ctx,text,x,y,maxWidth,lineHeight,maxLines){
   const words=String(text).split(/\s+/);let line='',lines=[];
   for(const word of words){const test=line?line+' '+word:word;if(ctx.measureText(test).width>maxWidth&&line){lines.push(line);line=word}else line=test}
   if(line)lines.push(line);if(lines.length>maxLines)lines=lines.slice(0,maxLines);
   lines.forEach((l,i)=>ctx.fillText(l,x,y+i*lineHeight));return y+lines.length*lineHeight;
 }
 async function imageSelected(){
   const a=selectedArray();if(!a.length)return;
   if(typeof toast==='function')toast('Criando imagem…');
   const W=1080,H=1350,cv=document.createElement('canvas');cv.width=W;cv.height=H;const ctx=cv.getContext('2d');
   const g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,'#17231a');g.addColorStop(1,'#080b09');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
   ctx.fillStyle='#dfbd66';ctx.font='700 30px Arial';ctx.fillText('BEREIA',80,110);
   ctx.fillStyle='#9fa99f';ctx.font='22px Arial';ctx.fillText('Versículo'+(a.length>1?'s':'')+' selecionado'+(a.length>1?'s':''),80,150);
   let y=250;for(const v of a.slice(0,5)){ctx.fillStyle='#ead28f';ctx.font='700 30px Arial';ctx.fillText(refFor(v),80,y);y+=54;ctx.fillStyle='#fff';ctx.font='700 47px Georgia';y=wrap(ctx,'“'+v.text+'”',80,y,920,60,4)+54;if(y>1120)break}
   ctx.fillStyle='#8d978f';ctx.font='21px Arial';ctx.fillText('Conheça a Palavra. Viva a Palavra. Compartilhe a Palavra.',80,1260);
   const blob=await new Promise(r=>cv.toBlob(r,'image/png',.96));if(!blob)return;
   const file=new File([blob],'BEREIA-versiculos.png',{type:'image/png'});
   try{if(navigator.canShare&&navigator.canShare({files:[file]})&&navigator.share){await navigator.share({title:'BEREIA • Versículos',files:[file],text:a.map(refFor).join(', ')});return}}catch(e){if(e?.name==='AbortError')return}
   const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='BEREIA-versiculos.png';link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1500);
   if(typeof toast==='function')toast('Imagem criada');
 }
 function restoreHighlights(){
   const h=loadObj(STORAGE_HL),bi=Number(document.getElementById('bibleBook')?.value||0),b=typeof bibleBooks!=='undefined'?bibleBooks[bi]:null,ch=Number(document.getElementById('bibleChapter')?.value||0);
   document.querySelectorAll('#bibleReader .v[data-verse]').forEach(el=>{const id=(b?.[0]||bi)+':'+ch+':'+Number(el.dataset.verse),color=h[id];if(color)el.setAttribute('data-bereia-highlight',color);else el.removeAttribute('data-bereia-highlight')});
 }
 const oldSelect=window.selectRealVerse;
 window.selectRealVerse=function(el,n){
   const v=currentMeta(n,el),already=selected.has(v.id);
   if(already){selected.delete(v.id);el.classList.remove('bereiaMultiSelected')}else{selected.set(v.id,v);el.classList.add('bereiaMultiSelected')}
   selectedVerse=v;const ref=refFor(v);const sr=document.getElementById('selectedRef');if(sr)sr.textContent=ref;localStorage.setItem('bereia:lastVerse',JSON.stringify(v));
   if(typeof selectBereiaVerse==='function'&&!already)try{selectBereiaVerse(el)}catch(e){}
   updateBar();
 };
 const oldRender=window.renderBibleVerses;
 if(typeof oldRender==='function')window.renderBibleVerses=function(){const r=oldRender.apply(this,arguments);setTimeout(()=>{restoreHighlights();clearSelection()},0);return r};
 window.BEREIA_VERSE_ACTIONS={selected,clearSelection,restoreHighlights};
 window.addEventListener('load',()=>{ensureBar();setTimeout(restoreHighlights,400);const b=document.getElementById('bereiaBuildBadge');if(b)b.textContent='BEREIA • V47'});
})();
