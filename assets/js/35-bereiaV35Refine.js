
(function(){
 function licenseCenter(){
  if(document.getElementById('bereiaLicenseCenter'))return;
  const anchor=document.getElementById('bereiaLibrarySwitch')||document.getElementById('bereiaSimpleEntry');if(!anchor)return;
  const s=document.createElement('section');s.id='bereiaLicenseCenter';
  s.innerHTML='<details><summary>🛡️ Fontes e licenças do BEREIA</summary><div class="blc-grid"><div class="blc-card"><b class="blc-ok">✓ Uso aberto / domínio público</b><span>Somente edições e bases cuja licença foi identificada. Créditos e condições devem ser preservados.</span></div><div class="blc-card"><b class="blc-warn">◐ Uso condicionado</b><span>Creative Commons, mapas, imagens e bases que exigem atribuição ou conferência por item.</span></div><div class="blc-card"><b class="blc-stop">⛔ Não incorporar sem autorização</b><span>Traduções modernas comerciais e qualquer material cujo direito de redistribuição não esteja confirmado.</span></div></div><p style="font-size:11px;color:#999;line-height:1.55">Regra do projeto: link público não significa licença para copiar o conteúdo. O BEREIA identifica a fonte e só incorpora material integral quando os direitos forem compatíveis.</p></details>';
  anchor.insertAdjacentElement('afterend',s);
 }
 function refineStudy(){
  const modal=document.getElementById('bereiaOriginalModal'),verse=document.getElementById('bomVerse');if(!modal||!verse||document.getElementById('bereiaStudyIntro'))return;
  const intro=document.createElement('div');intro.id='bereiaStudyIntro';intro.className='bereiaStudyIntro';intro.innerHTML='<b>Como estudar este versículo</b><br>Comece pelo texto. Depois avance para o idioma original, contexto e evidências históricas. O BEREIA separa informação documentada de hipótese.';
  verse.insertAdjacentElement('afterend',intro);
 }
 const oldOpen=window.openOriginalStudy;
 if(typeof oldOpen==='function')window.openOriginalStudy=function(){const r=oldOpen.apply(this,arguments);setTimeout(refineStudy,20);return r};
 window.addEventListener('load',()=>{licenseCenter();refineStudy();const b=document.getElementById('bereiaBuildBadge');if(b)b.textContent='BEREIA • V35'});
})();
