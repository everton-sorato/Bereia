
(function(){
 const NOTES={
 'Provérbios 3:5':{meaning:'O provérbio contrasta confiança integral no Senhor com autossuficiência intelectual. Não condena o entendimento; adverte contra torná-lo a autoridade final independente de Deus.',apply:'Submeter decisões, planos e avaliações à sabedoria de Deus, em vez de depender apenas da própria percepção.'},
 'Salmos 23:1':{meaning:'A imagem do Senhor como pastor comunica cuidado, direção e provisão. A afirmação nasce da relação de confiança expressa ao longo de todo o salmo.',apply:'Ler a segurança do versículo à luz do salmo inteiro, que inclui tanto descanso quanto passagem pelo vale.'},
 'Salmos 119:105':{meaning:'A Palavra de Deus é apresentada como luz suficiente para orientar os passos e o caminho. A figura enfatiza direção prática e contínua.',apply:'Usar as Escrituras como referência para escolhas e conduta, considerando o ensino bíblico em seu contexto.'},
 'Mateus 11:28':{meaning:'Jesus chama a si os cansados e sobrecarregados e promete descanso. Os versículos seguintes relacionam esse descanso a aprender dele e tomar o seu jugo.',apply:'A promessa deve ser lida junto de Mateus 11:29-30: aproximar-se de Cristo inclui tornar-se seu discípulo.'},
 'João 3:16':{meaning:'O versículo resume o amor de Deus expresso na dádiva do Filho e relaciona fé nele com vida eterna. Seu sentido imediato pertence ao diálogo e à exposição de João 3.',apply:'Ler a promessa juntamente com João 3:14-21, observando fé, vida, luz e resposta humana.'},
 'João 8:12':{meaning:'Jesus se apresenta como a luz do mundo e associa segui-lo a não permanecer nas trevas, mas possuir a luz da vida.',apply:'O próprio versículo liga a declaração à ação de seguir Jesus; não é apenas uma metáfora de conforto.'},
 'Romanos 8:28':{meaning:'Paulo afirma que Deus age em todas as coisas para o bem dos que o amam e são chamados segundo seu propósito. O contexto define esse bem em direção à conformidade com Cristo.',apply:'Evitar interpretar “bem” apenas como facilidade ou prosperidade; ler Romanos 8:28 junto de 8:29-30.'},
 'Filipenses 4:6':{meaning:'Paulo contrapõe ansiedade a oração, súplica e ações de graças. O pensamento continua no versículo seguinte com a paz de Deus guardando coração e mente.',apply:'Transformar preocupações em oração consciente, sem separar o versículo da promessa e disciplina descritas no contexto.'},
 'Filipenses 4:13':{meaning:'A força recebida em Cristo aparece no contexto de Paulo ter aprendido a viver tanto em abundância quanto em necessidade.',apply:'O foco não é capacidade ilimitada para qualquer objetivo, mas suficiência em Cristo nas diferentes circunstâncias.'},
 'Hebreus 11:1':{meaning:'A abertura do capítulo descreve a fé como confiança naquilo que se espera e convicção acerca do que não se vê; o restante do capítulo exemplifica essa confiança em ação.',apply:'Interpretar fé não como pensamento positivo, mas à luz dos exemplos de confiança e perseverança apresentados em Hebreus 11.'}
 };
 function genre(book){if(book==='Salmos')return 'poesia e oração';if(book==='Provérbios')return 'literatura de sabedoria';if(['Mateus','Marcos','Lucas','João'].includes(book))return 'Evangelho';if(['Romanos','1 Coríntios','2 Coríntios','Gálatas','Efésios','Filipenses','Colossenses','Hebreus','Tiago','1 Pedro','2 Pedro','1 João','2 João','3 João'].includes(book))return 'carta / ensino apostólico';return 'narrativa ou literatura bíblica'}
 function render(){
  const s=typeof bereiaSelected!=='undefined'?bereiaSelected:null;if(!s)return;
  const target=document.getElementById('v36Meaning');if(!target)return;
  const n=NOTES[s.ref],g=genre(s.book);
  target.innerHTML='<div class="v41-meaning"><div class="v41-box"><strong>📖 Texto em foco — '+s.ref+'</strong>'+String(s.text||'')+'<span class="v41-type">texto bíblico exibido pelo leitor</span></div>'+
  '<div class="v41-box"><strong>💡 O que significa</strong>'+(n?n.meaning:'O BEREIA ainda não possui uma nota interpretativa específica revisada para este versículo. Use o Estudo guiado e o Contexto para examiná-lo sem atribuir uma explicação genérica como se fosse específica.')+'<span class="v41-type">'+(n?'explicação contextual':'explicação específica em expansão')+'</span></div>'+
  '<div class="v41-box"><strong>📚 Como ler este gênero</strong>Esta passagem pertence a '+g+'. A interpretação deve respeitar as características desse tipo de texto e o contexto do capítulo e do livro.<span class="v41-type">método de interpretação</span></div>'+
  '<div class="v41-box"><strong>🌱 Aplicação</strong>'+(n?n.apply:'Depois de identificar o sentido no contexto, pergunte qual princípio ou resposta o texto exige hoje. A aplicação não deve substituir nem contradizer o significado da passagem.')+'<span class="v41-type">aplicação pastoral</span></div></div>';
 }
 const old=window.openOriginalStudy;window.openOriginalStudy=function(){const r=typeof old==='function'?old.apply(this,arguments):undefined;setTimeout(render,180);return r};
 document.addEventListener('click',e=>{if(e.target.closest('#bereiaStudyNavV36 [data-v36="meaning"]'))setTimeout(render,0)});
 window.addEventListener('load',()=>{const b=document.getElementById('bereiaBuildBadge');if(b)b.textContent='BEREIA • V41'});
})();
