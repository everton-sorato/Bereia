
(function(){
 const BUILD='V46';
 const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
 const cleanQuote=s=>String(s||'').trim().replace(/^[“"']+|[”"']+$/g,'').trim();

 function bgUrl(el){
   if(!el)return '';
   const raw=(el.style.backgroundImage||getComputedStyle(el).backgroundImage||'');
   const m=raw.match(/url\((['"]?)(.*?)\1\)/i);
   return m?m[2]:'';
 }

 function parseRef(ref){
   const m=String(ref||'').trim().match(/^(.+?)\s+(\d+):(\d+)(?:[-–](\d+))?$/);
   if(!m)return null;
   return {ref:String(ref).trim(),bookName:m[1].trim(),chapter:Number(m[2]),verse:Number(m[3]),verseEnd:m[4]?Number(m[4]):Number(m[3])};
 }

 function getVisibleDaily(){
   const cover=document.getElementById('bereiaDailyCover');
   const preview=document.getElementById('dailyArtPreview');
   const text=cleanQuote(document.getElementById('bdcText')?.textContent||document.getElementById('dailyMessage')?.textContent||'');
   const ref=String(document.getElementById('bdcRef')?.textContent||document.getElementById('dailyRef')?.textContent||'').trim();
   const img=bgUrl(cover)||bgUrl(preview);
   const theme=String(document.getElementById('bdcTheme')?.textContent||'').replace(/^Tema\s*·\s*/i,'').trim();
   const parsed=parseRef(ref);
   return parsed?{...parsed,text,img,theme}:null;
 }

 const state=window.BEREIA_STATE={build:BUILD,daily:null,selected:null};

 function refreshState(){
   const visible=getVisibleDaily();
   if(visible){state.daily={...visible};window.dailyCurrent={...(window.dailyCurrent||{}),...visible,book:visible.bookName};}
   return state.daily;
 }

 function selectExactBook(name){
   const select=document.getElementById('bibleBook');if(!select)return -1;
   const opts=Array.from(select.options);
   let idx=opts.findIndex(o=>norm(o.textContent)===norm(name));
   if(idx<0&&typeof bibleBooks!=='undefined')idx=bibleBooks.findIndex(b=>norm(b[1])===norm(name));
   if(idx<0)return -1;
   select.selectedIndex=idx;
   select.value=select.options[idx]?.value??String(idx);
   return idx;
 }

 async function openReference(target){
   if(!target)return null;
   document.body.classList.add('simpleBibleOpen');
   if(typeof go==='function')go('bible');
   const book=document.getElementById('bibleBook'),chapter=document.getElementById('bibleChapter');
   if(!book||!chapter)return null;

   if(selectExactBook(target.bookName)<0)return null;
   if(typeof renderChapterOptions==='function')renderChapterOptions(target.chapter);
   chapter.value=String(target.chapter);
   if(typeof loadChapter==='function')await loadChapter(false);

   const ensure=async()=>{
     if(norm(book.options[book.selectedIndex]?.textContent)!==norm(target.bookName)){
       selectExactBook(target.bookName);
       if(typeof renderChapterOptions==='function')renderChapterOptions(target.chapter);
       chapter.value=String(target.chapter);
       if(typeof loadChapter==='function')await loadChapter(false);
     }
     const el=document.querySelector('#bibleReader [data-verse="'+target.verse+'"]');
     if(el){
       if(typeof selectRealVerse==='function')selectRealVerse(el,target.verse);
       el.scrollIntoView({behavior:'smooth',block:'center'});
     }
     return {...target,el};
   };

   const out=await ensure();
   setTimeout(()=>ensure(),700);
   return out;
 }

 const legacyApply=window.bereiaApplyDaily;
 window.bereiaApplyDaily=function(){
   const d=typeof legacyApply==='function'?legacyApply.apply(this,arguments):null;
   setTimeout(refreshState,0);
   return d||refreshState();
 };

 window.openDailyVerse=async function(){
   const d=refreshState()||parseRef(document.getElementById('bdcRef')?.textContent||'');
   return openReference(d);
 };

 window.bereiaOpenDailyDeep=async function(){
   const d=refreshState();if(!d)return;
   const t=await openReference(d);if(!t?.el)return;
   if(typeof selectBereiaVerse==='function')selectBereiaVerse(t.el);
   if(typeof bereiaSelected!=='undefined'){
     const vt=t.el.querySelector('.verseText,.vt,.verse-text');
     bereiaSelected.book=d.bookName;
     bereiaSelected.chapter=d.chapter;
     bereiaSelected.verse=d.verse;
     bereiaSelected.ref=d.ref;
     bereiaSelected.text=(vt?.textContent||d.text||'').trim();
     state.selected={...bereiaSelected};
   }
   const label=document.getElementById('deepSelectionText');if(label)label.textContent=d.ref;
   if(typeof openOriginalStudy==='function')openOriginalStudy();
 };

 function syncSharePreview(d){
   if(!d)return;
   const v=document.getElementById('dailyArtVerse'),r=document.getElementById('dailyArtRef'),p=document.getElementById('dailyArtPreview');
   if(v)v.textContent='“'+d.text+'”';
   if(r)r.textContent=d.ref;
   if(p&&d.img)p.style.backgroundImage='url("'+String(d.img).replace(/"/g,'%22')+'")';
   const site=document.getElementById('dailyArtSite');
   if(site)site.textContent=typeof bereiaSiteUrl==='function'?(bereiaSiteUrl()||'Site oficial BEREIA'):'Site oficial BEREIA';
   window.BEREIA_SHARE_SNAPSHOT={...d};
 }

 window.openDailyArt=function(ev){
   if(ev?.stopPropagation)ev.stopPropagation();
   const d=refreshState();if(!d)return;
   syncSharePreview(d);
   const modal=document.getElementById('dailyArtModal');
   if(modal){modal.classList.add('open');document.body.style.overflow='hidden';}
 };

 window.makeDailyImage=async function(forced){
   const d=forced||refreshState();if(!d)return null;
   const W=1080,H=1350,canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;
   const ctx=canvas.getContext('2d');ctx.fillStyle='#11151a';ctx.fillRect(0,0,W,H);

   if(d.img){
     try{
       const img=new Image();img.crossOrigin='anonymous';
       await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject;img.src=d.img});
       const scale=Math.max(W/img.width,H/img.height),dw=img.width*scale,dh=img.height*scale;
       ctx.drawImage(img,(W-dw)/2,(H-dh)/2,dw,dh);
     }catch(e){
       const g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,'#24313a');g.addColorStop(1,'#0c0f13');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
     }
   }

   const grad=ctx.createLinearGradient(0,180,0,H);
   grad.addColorStop(0,'rgba(0,0,0,.05)');grad.addColorStop(.45,'rgba(0,0,0,.28)');grad.addColorStop(1,'rgba(0,0,0,.94)');
   ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);

   const left=82,max=W-164;
   ctx.fillStyle='#e8c76f';ctx.font='700 28px Arial';ctx.fillText('BEREIA',left,700);
   if(d.theme){ctx.fillStyle='#ead28f';ctx.font='700 22px Arial';ctx.fillText(('TEMA · '+d.theme).toUpperCase(),left,746);}
   ctx.fillStyle='#fff';ctx.font='700 58px Georgia';
   let y=typeof wrapCanvasText==='function'?wrapCanvasText(ctx,'“'+d.text+'”',left,d.theme?815:780,max,69,6):(d.theme?815:780);
   ctx.fillStyle='#ead28f';ctx.font='36px Arial';ctx.fillText(d.ref,left,y+24);

   const lineY=H-170;
   ctx.strokeStyle='rgba(255,255,255,.30)';ctx.beginPath();ctx.moveTo(left,lineY);ctx.lineTo(W-left,lineY);ctx.stroke();
   ctx.fillStyle='#e8c76f';ctx.font='700 25px Arial';ctx.fillText('BEREIA',left,lineY+45);
   ctx.fillStyle='#f1f1f1';ctx.font='23px Arial';ctx.fillText('Conheça a Palavra. Viva a Palavra. Compartilhe a Palavra.',left,lineY+82);
   const site=typeof bereiaSiteUrl==='function'?bereiaSiteUrl():'';
   if(site){ctx.fillStyle='#d8d8d8';ctx.font='20px Arial';ctx.fillText(site,left,lineY+116);}

   return await new Promise(resolve=>canvas.toBlob(resolve,'image/png',.96));
 };

 window.shareDailyImage=async function(){
   const d=refreshState();if(!d)return;
   syncSharePreview(d);
   if(typeof toast==='function')toast('Preparando a imagem…');
   const blob=await window.makeDailyImage(d);if(!blob){if(typeof toast==='function')toast('Não foi possível gerar a imagem');return;}
   const safeRef=d.ref.replace(/[^a-zA-Z0-9À-ÿ_-]+/g,'-');
   const file=new File([blob],'BEREIA-'+safeRef+'.png',{type:'image/png'});
   const url=typeof bereiaSiteUrl==='function'?bereiaSiteUrl():'';
   const text='BEREIA • '+d.ref+(url?'\n'+url:'');
   try{
     if(navigator.canShare&&navigator.canShare({files:[file]})&&navigator.share){
       await navigator.share({title:'BEREIA • '+d.ref,text,files:[file]});return;
     }
   }catch(e){if(e?.name==='AbortError')return;}
   if(typeof downloadDailyBlob==='function')downloadDailyBlob(blob);
   if(url)navigator.clipboard?.writeText(url);
   if(typeof toast==='function')toast(url?'Imagem salva e link copiado':'Imagem salva');
 };

 window.saveDailyImage=async function(){
   const d=refreshState();if(!d)return;
   syncSharePreview(d);
   const blob=await window.makeDailyImage(d);
   if(blob&&typeof downloadDailyBlob==='function')downloadDailyBlob(blob);
 };

 function wire(){
   refreshState();
   const deep=document.getElementById('bereiaDailyDeepBtn');
   if(deep)deep.onclick=e=>{e.stopPropagation();window.bereiaOpenDailyDeep();};
   const badge=document.getElementById('bereiaBuildBadge');if(badge)badge.textContent='BEREIA • '+BUILD;
   document.body.dataset.bereiaBuild=BUILD;
 }
 window.BEREIA_CORE_V46={build:BUILD,state,refreshState,parseRef,openReference};

 if('serviceWorker' in navigator){
   // Registration is owned by release.js.
 }
 window.addEventListener('load',()=>{setTimeout(wire,250);setTimeout(wire,900);});
 setTimeout(wire,500);
})();
