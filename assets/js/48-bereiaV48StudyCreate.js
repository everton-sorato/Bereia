
(function(){
 const BUILD='V48',COL_KEY='bereia:collections:v1',NOTE_KEY='bereia:verseNotes:v1';
 let copyFormat='simple',imageTemplate='devotional',imageBg={type:'gradient',value:'linear-gradient(145deg,#1b3524,#090d0a)'},imageMeta=null;
 const gradients=[
  ['Aurora','linear-gradient(145deg,#3b2a43,#c06c4f)'],['Floresta','linear-gradient(145deg,#173325,#07120c)'],['Céu','linear-gradient(145deg,#275b86,#9bc7dc)'],['Noite','linear-gradient(145deg,#101a2e,#05070c)'],['Deserto','linear-gradient(145deg,#6d4d2f,#c9975b)'],['Ouro','linear-gradient(145deg,#2a2113,#8b6b2d)']
 ];
 function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
 function load(key,def){try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(def))}catch(e){return def}}
 function save(key,val){localStorage.setItem(key,JSON.stringify(val))}
 function sel(){return window.BEREIA_VERSE_ACTIONS?.selected?Array.from(window.BEREIA_VERSE_ACTIONS.selected.values()).sort((a,b)=>a.bookIndex-b.bookIndex||a.chapter-b.chapter||a.verse-b.verse):[]}
 function ref(v){return v.book+' '+v.chapter+':'+v.verse}
 function refs(){return sel().map(ref)}
 function open(id){document.getElementById(id)?.classList.add('open');document.body.style.overflow='hidden'}
 function close(id){document.getElementById(id)?.classList.remove('open');if(!document.querySelector('.b48Modal.open'))document.body.style.overflow=''}
 document.addEventListener('click',e=>{const c=e.target.closest('[data-close]');if(c)close(c.dataset.close);if(e.target.classList.contains('b48Modal'))close(e.target.id)});

 function formatText(fmt){
  const a=sel();if(!a.length)return '';
  if(fmt==='simple')return a.map(v=>ref(v)+' — '+v.text).join('\n\n');
  if(fmt==='devotional')return a.map(v=>'“'+v.text+'”\n'+ref(v)).join('\n\n');
  return a.map(v=>'📖 *'+ref(v)+'*\n'+v.text).join('\n\n')+'\n\n— BEREIA';
 }
 function refreshCopy(){document.getElementById('b48CopyPreview').textContent=formatText(copyFormat);document.querySelectorAll('#b48CopyFormats button').forEach(b=>b.classList.toggle('active',b.dataset.format===copyFormat))}
 document.getElementById('b48CopyFormats').addEventListener('click',e=>{const b=e.target.closest('[data-format]');if(!b)return;copyFormat=b.dataset.format;refreshCopy()});
 async function copyOut(){const t=formatText(copyFormat);if(!t)return;try{await navigator.clipboard.writeText(t)}catch(e){const x=document.createElement('textarea');x.value=t;document.body.appendChild(x);x.select();document.execCommand('copy');x.remove()}if(typeof toast==='function')toast('Texto copiado')}
 document.getElementById('b48DoCopy').onclick=copyOut;
 document.getElementById('b48DoShareText').onclick=async()=>{const t=formatText(copyFormat);try{if(navigator.share){await navigator.share({title:'BEREIA • Bíblia',text:t});return}}catch(e){if(e?.name==='AbortError')return}await copyOut()};

 function noteKey(){return sel().map(v=>v.id).join('|')}
 function openNote(){const a=sel();if(!a.length)return;const all=load(NOTE_KEY,{}),k=noteKey();document.getElementById('b48NoteRefs').innerHTML='<b>'+esc(refs().join(', '))+'</b>';document.getElementById('b48NoteText').value=all[k]?.text||'';open('b48NoteModal')}
 document.getElementById('b48SaveNote').onclick=()=>{const all=load(NOTE_KEY,{}),k=noteKey(),t=document.getElementById('b48NoteText').value.trim();if(t)all[k]={text:t,refs:refs(),updated:new Date().toISOString()};else delete all[k];save(NOTE_KEY,all);close('b48NoteModal');if(typeof toast==='function')toast('Nota salva')};
 document.getElementById('b48DeleteNote').onclick=()=>{const all=load(NOTE_KEY,{});delete all[noteKey()];save(NOTE_KEY,all);document.getElementById('b48NoteText').value='';if(typeof toast==='function')toast('Nota removida')};

 function collections(){const d=load(COL_KEY,null);return d||{Promessas:[],Pregações:[],'Escola Bíblica':[],Doutrina:[],Oração:[],Evangelismo:[]}}
 function saveToCollection(name){const all=collections(),a=sel();all[name]=all[name]||[];for(const v of a){if(!all[name].some(x=>x.id===v.id))all[name].push({...v,savedAt:new Date().toISOString()})}save(COL_KEY,all);renderCollections();if(typeof toast==='function')toast('Salvo em '+name)}
 function renderCollections(){const all=collections(),box=document.getElementById('b48Collections');box.innerHTML='';Object.keys(all).forEach(name=>{const b=document.createElement('button');b.className='b48Btn';b.innerHTML='<b>'+esc(name)+'</b><br><small>'+all[name].length+' item(ns)</small>';b.onclick=()=>saveToCollection(name);box.appendChild(b)})}
 function renderLibrary(){const all=collections(),box=document.getElementById('b48LibraryList');box.innerHTML=Object.entries(all).map(([n,arr])=>'<div class="b48Card"><b>'+esc(n)+'</b><div style="color:#aaa;font:11px/1.5 system-ui;margin-top:5px">'+(arr.length?arr.slice(-8).map(v=>esc(ref(v))).join(' • '):'Nenhum versículo salvo.')+'</div></div>').join('')}
 document.getElementById('b48NewCollection').onclick=()=>{const name=prompt('Nome da nova coleção:');if(!name?.trim())return;const all=collections();all[name.trim()]=all[name.trim()]||[];save(COL_KEY,all);renderCollections()};
 document.getElementById('b48OpenLibrary').onclick=renderLibrary;

 function setBg(bg,meta){imageBg=bg;imageMeta=meta||null;const p=document.getElementById('b48ImagePreview');p.style.backgroundImage='';p.style.background=bg.type==='gradient'?bg.value:'#111';if(bg.type==='image'){p.style.backgroundImage='url("'+bg.value.replace(/"/g,'%22')+'")';p.style.backgroundSize='cover';p.style.backgroundPosition='center'}document.getElementById('b48ImageLicense').textContent=meta?(meta.title+' • '+meta.license+(meta.artist?' • '+meta.artist:'')):'Fundos internos do BEREIA.'}
 function refreshImagePreview(){const a=sel(),t=a.map(v=>'“'+v.text+'”').join('\n\n'),r=a.map(ref).join(' • ');document.getElementById('b48ImageText').textContent=t;document.getElementById('b48ImageRef').textContent=r;document.querySelectorAll('#b48Templates button').forEach(b=>b.classList.toggle('active',b.dataset.template===imageTemplate));const p=document.getElementById('b48ImagePreview');p.dataset.template=imageTemplate;if(imageTemplate==='minimal'){p.querySelector('.b48PreviewShade').style.background='rgba(0,0,0,.18)'}else if(imageTemplate==='sermon'){p.querySelector('.b48PreviewShade').style.background='linear-gradient(90deg,rgba(0,0,0,.78),rgba(0,0,0,.24))'}else p.querySelector('.b48PreviewShade').style.background='linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.78))'}
 document.getElementById('b48Templates').addEventListener('click',e=>{const b=e.target.closest('[data-template]');if(!b)return;imageTemplate=b.dataset.template;refreshImagePreview()});
 const bgBox=document.getElementById('b48Backgrounds');gradients.forEach(([name,g])=>{const b=document.createElement('button');b.className='b48BgSwatch';b.title=name;b.style.background=g;b.onclick=()=>setBg({type:'gradient',value:g},{title:'BEREIA • '+name,license:'Fundo interno'});bgBox.appendChild(b)});
 document.getElementById('b48UseDaily').onclick=()=>{const cover=document.getElementById('bereiaDailyCover'),raw=cover?.style.backgroundImage||getComputedStyle(cover||document.body).backgroundImage||'',m=raw.match(/url\((['"]?)(.*?)\1\)/);if(m)setBg({type:'image',value:m[2]},{title:'Imagem do dia',license:'Fonte já utilizada na Mensagem do Dia'})};

 async function searchCommons(){
  const q=document.getElementById('b48ImageSearch').value.trim();if(!q)return;
  const box=document.getElementById('b48ImageResults');box.innerHTML='<div class="b48License">Buscando imagens abertas…</div>';
  const url='https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch='+encodeURIComponent(q)+'&gsrnamespace=6&gsrlimit=9&prop=imageinfo&iiprop=url%7Cextmetadata&iiurlwidth=900&format=json&origin=*';
  try{
   const r=await fetch(url),j=await r.json(),pages=Object.values(j.query?.pages||{});
   box.innerHTML='';
   pages.forEach(p=>{
    const ii=p.imageinfo?.[0],thumb=ii?.thumburl||ii?.url;if(!thumb)return;
    const meta=ii.extmetadata||{},license=meta.LicenseShortName?.value||meta.UsageTerms?.value||'Licença não identificada',artist=String(meta.Artist?.value||'').replace(/<[^>]*>/g,'').trim(),title=p.title.replace(/^File:/,'');
    const d=document.createElement('div');d.className='b48Result';d.innerHTML='<img src="'+esc(thumb)+'" alt=""><small>'+esc(title)+'</small>';d.onclick=()=>setBg({type:'image',value:thumb},{title,license,artist});box.appendChild(d);
   });
   if(!box.children.length)box.innerHTML='<div class="b48License">Nenhuma imagem encontrada.</div>';
  }catch(e){box.innerHTML='<div class="b48License">Não foi possível consultar a Wikimedia Commons agora.</div>'}
 }
 document.getElementById('b48SearchCommons').onclick=searchCommons;
 document.getElementById('b48ImageSearch').addEventListener('keydown',e=>{if(e.key==='Enter')searchCommons()});

 function wrap(ctx,text,x,y,max,line,maxLines){const words=String(text).split(/\s+/);let cur='',lines=[];for(const w of words){const t=cur?cur+' '+w:w;if(ctx.measureText(t).width>max&&cur){lines.push(cur);cur=w}else cur=t}if(cur)lines.push(cur);if(lines.length>maxLines)lines=lines.slice(0,maxLines);lines.forEach((l,i)=>ctx.fillText(l,x,y+i*line));return y+lines.length*line}
 async function renderCanvas(){
  const a=sel();if(!a.length)return null;const W=1080,H=1350,cv=document.createElement('canvas');cv.width=W;cv.height=H;const ctx=cv.getContext('2d');
  if(imageBg.type==='gradient'){
   const grd=ctx.createLinearGradient(0,0,W,H);grd.addColorStop(0,imageBg.value.includes('#')?imageBg.value.match(/#[0-9a-fA-F]{6}/)?.[0]||'#1b3524':'#1b3524');grd.addColorStop(1,'#080b09');ctx.fillStyle=grd;ctx.fillRect(0,0,W,H);
  }else{
   ctx.fillStyle='#101510';ctx.fillRect(0,0,W,H);try{const im=new Image();im.crossOrigin='anonymous';await new Promise((ok,no)=>{im.onload=ok;im.onerror=no;im.src=imageBg.value});const sc=Math.max(W/im.width,H/im.height),dw=im.width*sc,dh=im.height*sc;ctx.drawImage(im,(W-dw)/2,(H-dh)/2,dw,dh)}catch(e){}
  }
  if(imageTemplate==='sermon'){const g=ctx.createLinearGradient(0,0,W,0);g.addColorStop(0,'rgba(0,0,0,.82)');g.addColorStop(1,'rgba(0,0,0,.22)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}
  else{const g=ctx.createLinearGradient(0,180,0,H);g.addColorStop(0,'rgba(0,0,0,.05)');g.addColorStop(1,imageTemplate==='minimal'?'rgba(0,0,0,.40)':'rgba(0,0,0,.86)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H)}
  const left=imageTemplate==='sermon'?72:86;ctx.fillStyle='#e8c76f';ctx.font='800 27px Arial';ctx.fillText('BEREIA',left,100);
  let y=imageTemplate==='status'?430:500;for(const v of a.slice(0,4)){ctx.fillStyle='#fff';ctx.font=imageTemplate==='minimal'?'700 53px Georgia':'700 58px Georgia';y=wrap(ctx,'“'+v.text+'”',left,y,W-left*2,68,5)+32;ctx.fillStyle='#efd58c';ctx.font='700 31px Arial';ctx.fillText(ref(v),left,y);y+=76;if(y>1130)break}
  ctx.fillStyle='#d7d7d7';ctx.font='20px Arial';ctx.fillText('Conheça a Palavra. Viva a Palavra. Compartilhe a Palavra.',left,1260);
  if(imageMeta?.license){ctx.fillStyle='#aaa';ctx.font='15px Arial';ctx.fillText((imageMeta.title+' • '+imageMeta.license).slice(0,105),left,1300)}
  return await new Promise(r=>cv.toBlob(r,'image/png',.96));
 }
 async function exportImage(shareIt){
  if(typeof toast==='function')toast('Gerando sua imagem…');const blob=await renderCanvas();if(!blob)return;
  const file=new File([blob],'BEREIA-versiculos.png',{type:'image/png'});
  if(shareIt){try{if(navigator.canShare&&navigator.canShare({files:[file]})&&navigator.share){await navigator.share({title:'BEREIA • Versículos',files:[file],text:refs().join(', ')});return}}catch(e){if(e?.name==='AbortError')return}}
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='BEREIA-versiculos.png';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1500);if(typeof toast==='function')toast('Imagem pronta');
 }
 document.getElementById('b48ShareImage').onclick=()=>exportImage(true);document.getElementById('b48SaveImage').onclick=()=>exportImage(false);

 function openImage(){if(!sel().length)return;refreshImagePreview();setBg(imageBg,imageMeta);open('b48ImageModal')}
 function openCopy(){if(!sel().length)return;refreshCopy();open('b48CopyModal')}
 function openSave(){if(!sel().length)return;renderCollections();document.getElementById('b48LibraryList').innerHTML='';open('b48SaveModal')}

 function upgradeBar(){
  const bar=document.getElementById('bereiaVerseActions');if(!bar)return false;
  const btns=bar.querySelector('.bvaBtns');if(btns&&!btns.querySelector('[data-act="save"]'))btns.innerHTML='<button type="button" data-act="mark">🖍 Marcar</button><button type="button" data-act="copy">📋 Copiar</button><button type="button" data-act="image">🖼 Imagem</button><button type="button" data-act="note">📝 Nota</button><button type="button" data-act="save">★ Salvar</button><button type="button" data-act="share">↗ Compartilhar</button>';
  if(!bar.dataset.v48){
   bar.dataset.v48='1';
   bar.addEventListener('click',e=>{
    const act=e.target.closest('[data-act]')?.dataset.act;if(!act)return;
    if(['copy','image','note','save'].includes(act)){e.preventDefault();e.stopImmediatePropagation();if(act==='copy')openCopy();if(act==='image')openImage();if(act==='note')openNote();if(act==='save')openSave()}
   },true);
  }
  return true;
 }
 function boot(){upgradeBar();const b=document.getElementById('bereiaBuildBadge');if(b)b.textContent='BEREIA • '+BUILD}
 window.BEREIA_STUDY_CREATE={openImage,openCopy,openNote,openSave,collections};
 window.addEventListener('load',()=>{setTimeout(boot,300);setTimeout(boot,1200)});setTimeout(boot,700);
})();
