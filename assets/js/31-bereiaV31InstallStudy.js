
(function(){
 let deferredPrompt=null;
 window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e});
 window.addEventListener('appinstalled',()=>{const b=document.getElementById('bereiaInstallButton');if(b)b.style.display='none'});
 document.getElementById('bereiaInstallButton')?.addEventListener('click',async()=>{
  const help=document.getElementById('bereiaInstallHelp');
  if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;return}
  const ios=/iPhone|iPad|iPod/i.test(navigator.userAgent);
  help.textContent=ios?'No iPhone: abra no Safari, toque em Compartilhar e depois em Adicionar à Tela de Início.':'No Android: abra no Chrome, toque no menu ⋮ e escolha Instalar aplicativo ou Adicionar à tela inicial.';
  help.classList.toggle('show');
 });
 
 function prepareStudy(){
  const modal=document.getElementById('bereiaOriginalModal');
  if(!modal||document.getElementById('bereiaStudyNav'))return;
  const target=document.getElementById('bomLang');if(!target)return;
  const nav=document.createElement('nav');nav.id='bereiaStudyNav';nav.setAttribute('aria-label','Seções do estudo');
  const names=['Resumo','Original','Contexto','História'];
  names.forEach((name,i)=>{const btn=document.createElement('button');btn.type='button';btn.textContent=name;btn.addEventListener('click',()=>selectStudy(i));nav.appendChild(btn)});
  target.parentNode.insertBefore(nav,target);
  function selectStudy(n){
   const words=document.getElementById('bomWords'),context=document.getElementById('bereiaVerseContext'),status=document.getElementById('bomStatus'),source=document.getElementById('bomSource');
   const summary=document.getElementById('bomVerse');
   [summary,words,context].forEach(el=>el?.classList.add('bereiaStudySection'));
   [summary,words,context][Math.min(n,2)]?.classList.add('active');
   if(status)status.style.display=n===1?'':'none';
   if(source)source.style.display=n===1?'':'none';
   if(target)target.style.display=n===1?'':'none';
   if(n===3){context?.classList.add('active');summary?.classList.remove('active')}
   nav.querySelectorAll('button').forEach((b,i)=>{b.classList.toggle('active',i===n);b.setAttribute('aria-pressed',i===n?'true':'false')});
  }
  const observer=new MutationObserver(()=>{if(modal.classList.contains('open')&&!nav.querySelector('.active'))selectStudy(0);if(!modal.classList.contains('open'))nav.querySelectorAll('button').forEach(b=>b.classList.remove('active'))});
  observer.observe(modal,{attributes:true,attributeFilter:['class']});
 }
 window.addEventListener('load',()=>{prepareStudy();const b=document.getElementById('bereiaBuildBadge');if(b)b.textContent='BEREIA • V31'});
})();
