
(function(){
 const THEMES=[
  ['fé',['fé','confia','confiança','esperam','fundamento']],['oração',['orai','orar','oração','pedidos']],['sabedoria',['sabedoria','entendimento','coração','pensamentos']],['esperança',['esperança','esperam','renovarão','socorro']],['salvação',['salvação','salvos','cristo morreu','filho unigênito']],['amor',['amor','amarás','ama','deus é amor']],['paz',['paz','inquietos','ansiedade']],['coragem',['não temas','bom ânimo','fortaleza','temerei']],['vida com Deus',['palavra','caminho','reino de deus','segue','videira']],['graça',['graça','misericórdias','misericordia']],['perseverança',['fortalece','armadura','tentação','cansados']],['nova vida',['nova criatura','renovação','fruto do espírito']]
 ];
 function theme(d){const s=((d?.text||'')+' '+(d?.ref||'')).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();for(const [n,ks] of THEMES)if(ks.some(k=>s.includes(k.normalize('NFD').replace(/[\u0300-\u036f]/g,''))))return n;return 'vida com Deus'}
 function applyTheme(){
  const d=typeof bereiaDailyToday==='function'?bereiaDailyToday():window.dailyCurrent;if(!d)return;d.theme=theme(d);
  const content=document.querySelector('#bereiaDailyCover .bdcContent'),label=document.querySelector('#bereiaDailyCover .bdcLabel');if(content&&!document.getElementById('bdcTheme')){const x=document.createElement('div');x.id='bdcTheme';label?.insertAdjacentElement('afterend',x)}
  const x=document.getElementById('bdcTheme');if(x)x.textContent='Tema · '+d.theme;
 }
 function studyTheme(){
  const modal=document.getElementById('bereiaOriginalModal'),verse=document.getElementById('bomVerse');if(!modal||!verse)return;
  let x=document.getElementById('v39StudyTheme');if(!x){x=document.createElement('div');x.id='v39StudyTheme';verse.insertAdjacentElement('afterend',x)}
  const d=typeof bereiaDailyToday==='function'?bereiaDailyToday():null,s=typeof bereiaSelected!=='undefined'?bereiaSelected:null;
  const isDaily=d&&s&&String(s.ref||'')===String(d.ref||'');x.innerHTML='<b>Tema de estudo:</b> '+(isDaily?theme(d):'Estudo da passagem selecionada');
 }
 const oldApply=window.bereiaApplyDaily;
 window.bereiaApplyDaily=function(){const d=typeof oldApply==='function'?oldApply():null;applyTheme();return d};
 const oldOpen=window.openOriginalStudy;
 window.openOriginalStudy=function(){const r=typeof oldOpen==='function'?oldOpen.apply(this,arguments):undefined;setTimeout(studyTheme,80);return r};
 window.addEventListener('load',()=>{setTimeout(()=>{applyTheme();const b=document.getElementById('bereiaBuildBadge');if(b)b.textContent='BEREIA • V39'},120)});
})();
