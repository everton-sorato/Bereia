
(function(){
 function cleanQuote(s){return String(s||'').trim().replace(/^[“"']+|[”"']+$/g,'').trim()}
 function bgUrl(el){
   if(!el)return '';
   const raw=(el.style.backgroundImage||getComputedStyle(el).backgroundImage||'');
   const m=raw.match(/url\((['"]?)(.*?)\1\)/i);return m?m[2]:'';
 }
 function snapshot(){
   const cover=document.getElementById('bereiaDailyCover');
   const preview=document.getElementById('dailyArtPreview');
   const text=cleanQuote(document.getElementById('bdcText')?.textContent||document.getElementById('dailyMessage')?.textContent||'');
   const ref=String(document.getElementById('bdcRef')?.textContent||document.getElementById('dailyRef')?.textContent||'').trim();
   const img=bgUrl(cover)||bgUrl(preview);
   const theme=String(document.getElementById('bdcTheme')?.textContent||'').trim();
   return {text,ref,img,theme};
 }
 function syncModal(s){
   const v=document.getElementById('dailyArtVerse'),r=document.getElementById('dailyArtRef'),p=document.getElementById('dailyArtPreview');
   if(v)v.textContent='“'+s.text+'”';if(r)r.textContent=s.ref;if(p&&s.img)p.style.backgroundImage='url("'+s.img.replace(/"/g,'%22')+'")';
   const site=document.getElementById('dailyArtSite');if(site)site.textContent=typeof bereiaSiteUrl==='function'?(bereiaSiteUrl()||'Site oficial BEREIA'):'Site oficial BEREIA';
   window.BEREIA_SHARE_SNAPSHOT={...s};
 }
 window.openDailyArt=function(ev){
   if(ev&&ev.stopPropagation)ev.stopPropagation();
   const s=snapshot();if(!s.text||!s.ref)return;
   syncModal(s);
   const modal=document.getElementById('dailyArtModal');if(modal){modal.classList.add('open');document.body.style.overflow='hidden'}
 };
 window.makeDailyImage=async function(forced){
   const d=forced||window.BEREIA_SHARE_SNAPSHOT||snapshot(),W=1080,H=1350,canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;
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
   const grad=ctx.createLinearGradient(0,180,0,H);grad.addColorStop(0,'rgba(0,0,0,.05)');grad.addColorStop(.45,'rgba(0,0,0,.28)');grad.addColorStop(1,'rgba(0,0,0,.94)');ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
   const left=82,max=W-164;
   ctx.fillStyle='#e8c76f';ctx.font='700 28px Arial';ctx.fillText('BEREIA',left,700);
   if(d.theme){ctx.fillStyle='#ead28f';ctx.font='700 22px Arial';ctx.fillText(d.theme.toUpperCase(),left,746)}
   ctx.fillStyle='#fff';ctx.font='700 58px Georgia';
   let y=typeof wrapCanvasText==='function'?wrapCanvasText(ctx,'“'+d.text+'”',left,d.theme?815:780,max,69,6):(d.theme?815:780);
   ctx.fillStyle='#ead28f';ctx.font='36px Arial';ctx.fillText(d.ref,left,y+24);
   const lineY=H-170;ctx.strokeStyle='rgba(255,255,255,.30)';ctx.beginPath();ctx.moveTo(left,lineY);ctx.lineTo(W-left,lineY);ctx.stroke();
   ctx.fillStyle='#e8c76f';ctx.font='700 25px Arial';ctx.fillText('BEREIA',left,lineY+45);
   ctx.fillStyle='#f1f1f1';ctx.font='23px Arial';ctx.fillText('Conheça a Palavra. Viva a Palavra. Compartilhe a Palavra.',left,lineY+82);
   const site=typeof bereiaSiteUrl==='function'?bereiaSiteUrl():'';if(site){ctx.fillStyle='#d8d8d8';ctx.font='20px Arial';ctx.fillText(site,left,lineY+116)}
   return await new Promise(resolve=>canvas.toBlob(resolve,'image/png',.96));
 };
 window.shareDailyImage=async function(){
   const d=snapshot();syncModal(d);if(typeof toast==='function')toast('Preparando a mesma imagem da tela…');
   const blob=await window.makeDailyImage(d);if(!blob){if(typeof toast==='function')toast('Não foi possível gerar a imagem');return}
   const safeRef=d.ref.replace(/[^a-zA-Z0-9À-ÿ_-]+/g,'-');
   const file=new File([blob],'BEREIA-'+safeRef+'.png',{type:'image/png'});
   const url=typeof bereiaSiteUrl==='function'?bereiaSiteUrl():'',text='BEREIA • '+d.ref+(url?'\n'+url:'');
   try{
     if(navigator.canShare&&navigator.canShare({files:[file]})&&navigator.share){await navigator.share({title:'BEREIA • '+d.ref,text,files:[file]});return}
   }catch(e){if(e?.name==='AbortError')return}
   if(typeof downloadDailyBlob==='function')downloadDailyBlob(blob);
   if(url)navigator.clipboard?.writeText(url);
   if(typeof toast==='function')toast(url?'Imagem correta salva e link copiado':'Imagem correta salva');
 };
 window.saveDailyImage=async function(){
   const d=snapshot();syncModal(d);if(typeof toast==='function')toast('Gerando a mesma imagem da tela…');
   const blob=await window.makeDailyImage(d);if(blob&&typeof downloadDailyBlob==='function'){downloadDailyBlob(blob);if(typeof toast==='function')toast('Imagem pronta')}
 };
 function wire(){
   const badge=document.getElementById('bereiaBuildBadge');if(badge)badge.textContent='BEREIA • V45';
 }
 
 window.addEventListener('load',wire);setTimeout(wire,300);
})();
