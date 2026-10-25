
(function(){
 const standalone=window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
 const mobile=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||window.innerWidth<760;
 if(mobile)document.body.classList.add('bereia-mobile');
 if(standalone)document.body.classList.add('bereia-installed');
 const btn=document.getElementById('bereiaInstallButton');
 if(btn&&mobile&&!standalone)btn.innerHTML='📲 <span>Instalar BEREIA <small>no celular</small></span>';
 function resetStudy(){
  const nav=document.getElementById('bereiaStudyNav');if(!nav)return;
  nav.querySelectorAll('button').forEach((b,i)=>{b.classList.toggle('active',i===0);b.setAttribute('aria-pressed',i===0?'true':'false')});
  const summary=document.getElementById('bomVerse'),words=document.getElementById('bomWords'),context=document.getElementById('bereiaVerseContext'),notice=document.getElementById('bomNotice'),status=document.getElementById('bomStatus'),source=document.getElementById('bomSource'),lang=document.getElementById('bomLang');
  [summary,words,context,notice].forEach(x=>x?.classList.add('bereiaStudySection'));
  summary?.classList.add('active');words?.classList.remove('active');context?.classList.remove('active');notice?.classList.remove('active');
  if(status)status.style.display='none';if(source)source.style.display='none';if(lang)lang.style.display='none';
 }
 const modal=document.getElementById('bereiaOriginalModal');
 if(modal)new MutationObserver(()=>{if(modal.classList.contains('open'))setTimeout(resetStudy,50)}).observe(modal,{attributes:true,attributeFilter:['class']});
 window.addEventListener('load',()=>{const b=document.getElementById('bereiaBuildBadge');if(b)b.textContent='BEREIA • V32'});
})();
