
(function(){
 const BUILD='V49';
 const settings={ratio:'45',align:'left',pos:'bottom',font:'Georgia',size:54,color:'#ffffff',showRef:true,showBrand:true,template:'devotional'};
 const ratios={916:[1080,1920],11:[1080,1080],45:[1080,1350],169:[1920,1080]};
 const fonts={Georgia:'Georgia, serif',Arial:'Arial, sans-serif',Times:'"Times New Roman", serif',Trebuchet:'"Trebuchet MS", sans-serif',System:'system-ui, sans-serif'};
 function sel(){return window.BEREIA_VERSE_ACTIONS?.selected?Array.from(window.BEREIA_VERSE_ACTIONS.selected.values()).sort((a,b)=>a.bookIndex-b.bookIndex||a.chapter-b.chapter||a.verse-b.verse):[]}
 function ref(v){return v.book+' '+v.chapter+':'+v.verse}
 function preview(){return document.getElementById('b48ImagePreview')}
 function applyPreview(){
   const p=preview();if(!p)return;
   p.classList.remove('b49-ratio-916','b49-ratio-11','b49-ratio-45','b49-ratio-169');p.classList.add('b49-ratio-'+settings.ratio);
   p.dataset.v49Align=settings.align;p.dataset.v49Pos=settings.pos;
   p.style.setProperty('--b49-font',fonts[settings.font]||fonts.Georgia);
   const visualSize=Math.max(18,Math.min(42,settings.size*.55));p.style.setProperty('--b49-size',visualSize+'px');
   p.style.setProperty('--b49-color',settings.color);
   p.style.setProperty('--b49-ref',settings.showRef?'block':'none');
   p.style.setProperty('--b49-brand',settings.showBrand?'block':'none');
   p.dataset.template=settings.template;
   document.querySelectorAll('#b49StudioControls [data-ratio]').forEach(b=>b.classList.toggle('active',b.dataset.ratio===settings.ratio));
   document.querySelectorAll('#b49StudioControls [data-align]').forEach(b=>b.classList.toggle('active',b.dataset.align===settings.align));
   document.querySelectorAll('#b49StudioControls [data-pos]').forEach(b=>b.classList.toggle('active',b.dataset.pos===settings.pos));
 }
 function ensureControls(){
   const controls=document.querySelector('#b48ImageModal .b48Controls');if(!controls||document.getElementById('b49StudioControls'))return;
   const box=document.createElement('div');box.id='b49StudioControls';
   box.innerHTML=
   '<div class="b48Card"><div class="b48Label">Formato da arte</div><div class="b49Choices"><button data-ratio="916">9:16 Status</button><button data-ratio="11">1:1 Quadrado</button><button data-ratio="45" class="active">4:5 Feed</button><button data-ratio="169">16:9 Tela</button></div></div>'+
   '<div class="b48Card"><div class="b48Label">Posição e alinhamento</div><div class="b49Row"><div class="b49Control"><label>Posição</label><div class="b49Choices"><button data-pos="top">Topo</button><button data-pos="center">Centro</button><button data-pos="bottom" class="active">Base</button></div></div><div class="b49Control"><label>Alinhamento</label><div class="b49Choices"><button data-align="left" class="active">Esq.</button><button data-align="center">Centro</button><button data-align="right">Dir.</button></div></div></div></div>'+
   '<div class="b48Card"><div class="b48Label">Tipografia</div><div class="b49Row"><div class="b49Control"><label>Fonte</label><select id="b49Font" class="b49Select" style="width:100%"><option>Georgia</option><option>Arial</option><option>Times</option><option>Trebuchet</option><option>System</option></select></div><div class="b49Control"><label>Tamanho <span id="b49SizeValue">54</span></label><input id="b49Size" class="b49Range" type="range" min="34" max="78" value="54"></div></div><div class="b49Row" style="margin-top:8px"><div class="b49Control"><label>Cor do texto</label><input id="b49Color" class="b49Color" type="color" value="#ffffff"></div><div class="b49Control"><div class="b49Switch"><span>Mostrar referência</span><input id="b49ShowRef" type="checkbox" checked></div><div class="b49Switch" style="margin-top:10px"><span>Marca BEREIA</span><input id="b49ShowBrand" type="checkbox" checked></div></div></div></div>';
   const modelCard=controls.querySelector('.b48Card');if(modelCard)modelCard.insertAdjacentElement('afterend',box);else controls.prepend(box);
   box.addEventListener('click',e=>{
     const r=e.target.closest('[data-ratio]');if(r){settings.ratio=r.dataset.ratio;applyPreview()}
     const a=e.target.closest('[data-align]');if(a){settings.align=a.dataset.align;applyPreview()}
     const p=e.target.closest('[data-pos]');if(p){settings.pos=p.dataset.pos;applyPreview()}
   });
   document.getElementById('b49Font').onchange=e=>{settings.font=e.target.value;applyPreview()};
   document.getElementById('b49Size').oninput=e=>{settings.size=Number(e.target.value);document.getElementById('b49SizeValue').textContent=settings.size;applyPreview()};
   document.getElementById('b49Color').oninput=e=>{settings.color=e.target.value;applyPreview()};
   document.getElementById('b49ShowRef').onchange=e=>{settings.showRef=e.target.checked;applyPreview()};
   document.getElementById('b49ShowBrand').onchange=e=>{settings.showBrand=e.target.checked;applyPreview()};
 }
 function ensureTemplates(){
   const t=document.getElementById('b48Templates');if(!t)return;
   const add=(name,label)=>{if(t.querySelector('[data-template="'+name+'"]'))return;const b=document.createElement('button');b.dataset.template=name;b.textContent=label;t.appendChild(b)};
   add('promise','Promessa');add('evangelism','Evangelismo');add('worship','Culto');add('daily','Versículo do dia');
   if(!t.dataset.v49){t.dataset.v49='1';t.addEventListener('click',e=>{const b=e.target.closest('[data-template]');if(!b)return;settings.template=b.dataset.template;setTimeout(()=>{applyTemplatePreset(settings.template);applyPreview()},0)})}
 }
 function applyTemplatePreset(name){
   if(name==='status'){settings.ratio='916';settings.align='center';settings.pos='center';settings.size=58}
   else if(name==='sermon'){settings.ratio='169';settings.align='left';settings.pos='center';settings.size=62}
   else if(name==='minimal'){settings.ratio='11';settings.align='center';settings.pos='center';settings.size=50}
   else if(name==='promise'){settings.ratio='45';settings.align='center';settings.pos='bottom';settings.size=56;settings.color='#fff7d6'}
   else if(name==='evangelism'){settings.ratio='916';settings.align='center';settings.pos='center';settings.size=58;settings.color='#ffffff'}
   else if(name==='worship'){settings.ratio='169';settings.align='center';settings.pos='center';settings.size=60;settings.color='#ffffff'}
   else if(name==='daily'){settings.ratio='45';settings.align='left';settings.pos='bottom';settings.size=54;settings.color='#ffffff'}
   else{settings.ratio='45';settings.align='left';settings.pos='bottom';settings.size=54;settings.color='#ffffff'}
   const sz=document.getElementById('b49Size');if(sz)sz.value=settings.size;const sv=document.getElementById('b49SizeValue');if(sv)sv.textContent=settings.size;const co=document.getElementById('b49Color');if(co)co.value=settings.color;
 }
 function getBackground(){
   const p=preview();if(!p)return {type:'gradient',value:null};
   const img=(p.style.backgroundImage||getComputedStyle(p).backgroundImage||'').trim();
   const m=img.match(/url\((['"]?)(.*?)\1\)/i);if(m)return {type:'image',value:m[2]};
   const bg=p.style.background||getComputedStyle(p).background||'';return {type:'gradient',value:bg};
 }
 function parseColors(bg){
   const arr=(bg.match(/#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)/g)||[]);return [arr[0]||'#1b3524',arr[1]||'#080b09'];
 }
 function wrapLines(ctx,text,maxWidth){
   const paras=String(text).split(/\n+/),out=[];
   for(const para of paras){let line='';for(const word of para.split(/\s+/)){const test=line?line+' '+word:word;if(ctx.measureText(test).width>maxWidth&&line){out.push(line);line=word}else line=test}if(line)out.push(line);out.push('')}
   if(out[out.length-1]==='')out.pop();return out;
 }
 function fitFont(ctx,blocks,maxWidth,maxHeight,start,min){
   let size=start;
   while(size>min){
     ctx.font='700 '+size+'px '+(fonts[settings.font]||fonts.Georgia);
     const lh=Math.round(size*1.22);let total=0;
     for(const b of blocks){total+=wrapLines(ctx,'“'+b.text+'”',maxWidth).length*lh+(settings.showRef?Math.round(size*.95):Math.round(size*.45))}
     if(total<=maxHeight)return {size,lh,total};size-=2;
   }
   ctx.font='700 '+min+'px '+(fonts[settings.font]||fonts.Georgia);const lh=Math.round(min*1.22);let total=0;for(const b of blocks)total+=wrapLines(ctx,'“'+b.text+'”',maxWidth).length*lh+(settings.showRef?Math.round(min*.95):Math.round(min*.45));return {size:min,lh,total}
 }
 async function renderV49(){
   const verses=sel();if(!verses.length)return null;
   const [W,H]=ratios[settings.ratio]||ratios[45],cv=document.createElement('canvas');cv.width=W;cv.height=H;const ctx=cv.getContext('2d'),bg=getBackground();
   ctx.fillStyle='#111611';ctx.fillRect(0,0,W,H);
   if(bg.type==='image'){
     try{const im=new Image();im.crossOrigin='anonymous';await new Promise((ok,no)=>{im.onload=ok;im.onerror=no;im.src=bg.value});const sc=Math.max(W/im.width,H/im.height),dw=im.width*sc,dh=im.height*sc;ctx.drawImage(im,(W-dw)/2,(H-dh)/2,dw,dh)}catch(e){}
   }else{
     const [a,b]=parseColors(bg.value||'');const g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,a);g.addColorStop(1,b);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
   }
   let shade=ctx.createLinearGradient(0,0,0,H);
   if(settings.template==='sermon'||settings.template==='worship'){shade=ctx.createLinearGradient(0,0,W,0);shade.addColorStop(0,'rgba(0,0,0,.78)');shade.addColorStop(1,'rgba(0,0,0,.28)')}
   else{shade.addColorStop(0,'rgba(0,0,0,.08)');shade.addColorStop(1,settings.template==='minimal'?'rgba(0,0,0,.45)':'rgba(0,0,0,.82)')}
   ctx.fillStyle=shade;ctx.fillRect(0,0,W,H);

   const margin=Math.round(W*.075),maxW=W-margin*2,contentMax=H-Math.round(H*.18);
   const blocks=verses.slice(0,5),fit=fitFont(ctx,blocks,maxW,contentMax,settings.size,30);
   const textAlign=settings.align==='center'?'center':settings.align==='right'?'right':'left',x=settings.align==='center'?W/2:settings.align==='right'?W-margin:margin;
   ctx.textAlign=textAlign;ctx.textBaseline='alphabetic';
   let y=settings.pos==='top'?Math.round(H*.16):settings.pos==='center'?Math.round((H-fit.total)/2):H-Math.round(H*.13)-fit.total;
   if(settings.showBrand){ctx.fillStyle='#e8c76f';ctx.font='800 '+Math.max(20,Math.round(W*.025))+'px Arial';ctx.fillText('BEREIA',x,Math.max(Math.round(H*.07),y-Math.round(H*.045)))}
   for(const v of blocks){
     ctx.fillStyle=settings.color;ctx.font='700 '+fit.size+'px '+(fonts[settings.font]||fonts.Georgia);
     const lines=wrapLines(ctx,'“'+v.text+'”',maxW);
     for(const line of lines){if(line){ctx.fillText(line,x,y)}y+=fit.lh}
     if(settings.showRef){ctx.fillStyle='#efd58c';ctx.font='700 '+Math.max(22,Math.round(fit.size*.55))+'px Arial';ctx.fillText(ref(v),x,y+Math.round(fit.size*.2));y+=Math.round(fit.size*.9)}
     else y+=Math.round(fit.size*.4);
   }
   const lic=(document.getElementById('b48ImageLicense')?.textContent||'').trim();
   if(lic&&!/Fundos internos|Busca na Wikimedia/i.test(lic)){ctx.textAlign='left';ctx.fillStyle='rgba(255,255,255,.62)';ctx.font=Math.max(13,Math.round(W*.012))+'px Arial';ctx.fillText(lic.slice(0,125),margin,H-Math.round(H*.025))}
   return await new Promise(r=>cv.toBlob(r,'image/png',.96));
 }
 async function exportV49(share){
   if(typeof toast==='function')toast('Gerando arte no formato escolhido…');
   const blob=await renderV49();if(!blob)return;
   const file=new File([blob],'BEREIA-'+settings.ratio+'.png',{type:'image/png'});
   if(share){try{if(navigator.canShare&&navigator.canShare({files:[file]})&&navigator.share){await navigator.share({title:'BEREIA • Versículos',text:sel().map(ref).join(', '),files:[file]});return}}catch(e){if(e?.name==='AbortError')return}}
   const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=file.name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1600);if(typeof toast==='function')toast('Imagem pronta');
 }
 function wireExports(){
   const share=document.getElementById('b48ShareImage'),save=document.getElementById('b48SaveImage');
   if(share&&!share.dataset.v49){share.dataset.v49='1';share.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();exportV49(true)},true)}
   if(save&&!save.dataset.v49){save.dataset.v49='1';save.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();exportV49(false)},true)}
 }
 function boot(){
   ensureControls();ensureTemplates();wireExports();applyPreview();
   const modal=document.getElementById('b48ImageModal');if(modal&&!modal.dataset.v49obs){modal.dataset.v49obs='1';new MutationObserver(()=>{if(modal.classList.contains('open'))setTimeout(()=>{ensureControls();ensureTemplates();wireExports();applyPreview()},30)}).observe(modal,{attributes:true,attributeFilter:['class']})}
   const b=document.getElementById('bereiaBuildBadge');if(b)b.textContent='BEREIA • '+BUILD;
 }
 window.BEREIA_STUDIO_V49={settings,render:renderV49};
 
 window.addEventListener('load',()=>{setTimeout(boot,350);setTimeout(boot,1200)});setTimeout(boot,700);
})();
