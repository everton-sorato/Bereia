
(function(){
 const BUILD='V63';
 const META={
  'estela de tel dan':{type:'Inscrição',period:'século IX a.C.',findspot:'Tel Dan, norte de Israel',current:'Israel Museum, Jerusalém; emprestada ao Jewish Museum de Nova York em 2024–2025',relation:'histórica / dinástica',supports:'A inscrição é um testemunho extrabíblico do século IX a.C. que menciona a “Casa de Davi”, relevante para a discussão histórica de uma dinastia davídica.',limit:'Não comprova cada episódio atribuído a Davi, nem resolve sozinha todas as questões sobre a extensão e natureza de seu reino.',image:'Tel Dan Stele'},
  'tunel e inscricao de siloe':{type:'Inscrição / obra hidráulica',period:'fim do século VIII a.C.',findspot:'Túnel de Siloé, Jerusalém',current:'Museus Arqueológicos de Istambul',relation:'contextual / epigráfica',supports:'A inscrição documenta a escavação de um túnel hidráulico na Jerusalém antiga e ajuda a contextualizar obras de abastecimento de água do período.',limit:'A inscrição não cita diretamente todos os acontecimentos narrados no texto bíblico nem prova cada detalhe atribuído a Ezequias.',image:'Siloam inscription'},
  'grande rolo de isaias':{type:'Manuscrito bíblico',period:'c. 125 a.C.',findspot:'Caverna 1 de Qumran, deserto da Judeia',current:'Shrine of the Book, Israel Museum, Jerusalém',relation:'textual',supports:'É um dos mais antigos e completos manuscritos de um livro bíblico e permite estudar a transmissão antiga do texto de Isaías.',limit:'É evidência para a história textual de Isaías; não funciona como prova arqueológica dos acontecimentos narrados no livro.',image:'Great Isaiah Scroll'},
  'manuscritos do cantico do mar':{type:'Fragmentos de manuscritos de Êxodo',period:'c. fim do século I a.C.; séculos VII–VIII d.C.; há também fragmento medieval',findspot:'Origens distintas. Um fragmento foi descoberto em Qumran; a origem dos demais não deve ser inferida como Qumran.',current:'Coleções diferentes; alguns fragmentos foram reunidos em exposição temporária no Israel Museum em 2010',relation:'textual',supports:'A comparação de fragmentos de Êxodo 15 de épocas diferentes ajuda a estudar a transmissão do Cântico do Mar. O conjunto inclui, mas não se limita a, Manuscritos do Mar Morto.',limit:'Esses manuscritos documentam a transmissão textual; não comprovam arqueologicamente o evento narrado no Êxodo.',image:'Song of the Sea Exodus manuscript fragment'},
  'apocrifo de genesis':{type:'Manuscrito judaico antigo',period:'fim do século I a.C.',findspot:'Uma caverna perto de Qumran; o museu o inclui entre os sete manuscritos encontrados em 1947',current:'Shrine of the Book, Israel Museum, Jerusalém',relation:'história da recepção',supports:'Mostra como narrativas de Gênesis eram relidas e expandidas no judaísmo antigo.',limit:'É uma releitura antiga de Gênesis, não uma testemunha independente dos acontecimentos narrados em Gênesis.',image:'Genesis Apocryphon'},
  'cerco de laquis (701 a.c.)':{type:'Relevo assírio',period:'c. 700–692 a.C.',findspot:'Palácio Sudoeste de Senaqueribe, sala XXXVI, Nínive',current:'British Museum, Londres',relation:'histórica forte',supports:'Os relevos assírios retratam a conquista de Laquis durante a campanha de Senaqueribe e documentam a guerra assíria em Judá.',limit:'Os relevos documentam Laquis e a campanha; não representam o cerco de Jerusalém nem comprovam automaticamente todos os detalhes bíblicos.',image:'Lachish reliefs Sennacherib'},
  'campanha de senaqueribe':{type:'Relevo assírio',period:'c. 700–692 a.C.',findspot:'Palácio Sudoeste de Senaqueribe, Nínive',current:'British Museum, Londres',relation:'histórica forte',supports:'O conjunto de relevos de Laquis oferece evidência visual contemporânea da campanha assíria na região de Judá.',limit:'O conjunto é centrado em Laquis; não deve ser apresentado como imagem direta do cerco de Jerusalém.',image:'Lachish reliefs Sennacherib'},
  'babilonia de nabucodonosor ii':{type:'Cidade / arquitetura imperial',period:'século VI a.C.',findspot:'Babilônia, atual Iraque',current:'Sítio de Babilônia e coleções em Berlim',relation:'contextual histórica',supports:'Arquitetura, inscrições e urbanismo neobabilônicos documentam o ambiente imperial no qual narrativas do exílio são situadas.',limit:'A existência da cidade e de seus monumentos não comprova individualmente cada episódio do livro de Daniel.',image:'Ishtar Gate Babylon'},
  'babilonia historica':{type:'Cidade / arqueologia urbana',period:'século VI a.C.',findspot:'Babilônia, atual Iraque',current:'Sítio de Babilônia e coleções internacionais',relation:'contextual histórica',supports:'A arqueologia documenta a Babilônia neobabilônica e seu ambiente imperial.',limit:'O contexto material não comprova individualmente cada profecia ou episódio bíblico relacionado à cidade.',image:'Babylon archaeological site'},
  'corinto romana':{type:'Cidade / sítio arqueológico',period:'período romano',findspot:'Corinto, Grécia',current:'Sítio arqueológico e Museu Arqueológico da Antiga Corinto',relation:'contextual urbana',supports:'Ágora, templos, fontes e edifícios romanos ajudam a reconstruir o ambiente urbano da Corinto visitada por Paulo.',limit:'O sítio confirma a cidade e seu contexto, não cada encontro ou situação comunitária descrita no Novo Testamento.',image:'Ancient Corinth archaeological site'},
  'corinto antiga':{type:'Cidade / sítio arqueológico',period:'período helenístico e romano',findspot:'Corinto, Grécia',current:'Sítio arqueológico da Antiga Corinto',relation:'contextual urbana',supports:'Os vestígios preservam aspectos da vida pública, religiosa e econômica da cidade greco-romana.',limit:'A arqueologia urbana não valida automaticamente questões internas da igreja descritas nas cartas paulinas.',image:'Ancient Corinth'},
  'jerico — sitio de tell es-sultan':{type:'Sítio arqueológico',period:'Neolítico à Idade do Bronze',findspot:'Tell es-Sultan, noroeste da Jericó atual',current:'Sítio arqueológico in situ',relation:'local / cronologia debatida',supports:'Tell es-Sultan preserva uma longa sequência de ocupação, fortificações e fases urbanas que documentam a antiguidade e importância de Jericó.',limit:'A correlação entre camadas de destruição, datas e Josué 6 é debatida. O sítio não deve ser apresentado como prova simples e direta da narrativa.',image:'Tell es-Sultan Jericho'},
  'ninive e o imperio neoassirio':{type:'Cidade / palácios / inscrições',period:'séculos IX–VII a.C.',findspot:'Nínive, norte do atual Iraque',current:'Sítio de Nínive e museus com coleções assírias',relation:'contextual imperial',supports:'Palácios, relevos e inscrições documentam o poder e a cultura do Império Neoassírio.',limit:'O contexto histórico da Assíria não comprova automaticamente cada episódio bíblico ligado a seus reis.',image:'Nineveh Assyrian relief'},
  'ninive historica':{type:'Cidade / sítio arqueológico',period:'período neoassírio',findspot:'Nínive, atual Mosul, Iraque',current:'Sítio arqueológico e coleções internacionais',relation:'contextual histórica',supports:'A cidade e sua cultura imperial são extensamente documentadas arqueologicamente.',limit:'A arqueologia da cidade não prova por si só a mensagem profética ou a cronologia teológica de Naum.',image:'Nineveh archaeological site'},
  'cesareia maritima':{type:'Cidade / porto romano',period:'período romano',findspot:'Costa mediterrânea da Judeia',current:'Parque arqueológico de Cesareia',relation:'contextual administrativa',supports:'Estruturas portuárias, administrativas e urbanas documentam Cesareia como importante centro romano.',limit:'O sítio contextualiza Atos; não comprova por si só cada encontro narrado.',image:'Caesarea Maritima archaeological site'},
  'cesareia e administracao romana':{type:'Cidade / administração romana',period:'século I d.C.',findspot:'Cesareia Marítima',current:'Parque arqueológico de Cesareia',relation:'contextual administrativa',supports:'O caráter administrativo romano de Cesareia ajuda a entender julgamentos e prisões narrados em Atos.',limit:'O ambiente institucional é verificável; os episódios individuais permanecem dependentes das fontes textuais.',image:'Caesarea Maritima'},
  'filipos':{type:'Cidade / sítio arqueológico',period:'helenístico, romano e cristão primitivo',findspot:'Filipos, nordeste da Grécia',current:'Sítio arqueológico de Filipos',relation:'contextual urbana',supports:'A Via Egnatia, o fórum e edifícios romanos ajudam a localizar a missão de Paulo em uma colônia romana.',limit:'A cidade e seu contexto são arqueologicamente documentados; isso não comprova cada episódio de Atos 16.',image:'Philippi archaeological site'},
  'filipos romana':{type:'Cidade / colônia romana',period:'século I d.C.',findspot:'Filipos, nordeste da Grécia',current:'Sítio arqueológico de Filipos',relation:'contextual urbana',supports:'A configuração de Filipos como colônia romana ilumina o ambiente social da comunidade destinatária de Filipenses.',limit:'O contexto material não autentica automaticamente cada detalhe biográfico ou comunitário da carta.',image:'Philippi Greece archaeology'},
  'tessalonica':{type:'Cidade / arqueologia urbana',period:'período romano e cristão antigo',findspot:'Tessalônica, Grécia',current:'Monumentos preservados na cidade moderna',relation:'contextual urbana',supports:'Vestígios romanos e paleocristãos ajudam a reconstruir o ambiente macedônio da missão cristã antiga.',limit:'O contexto urbano não comprova cada ocorrência narrada em Atos ou nas cartas.',image:'Roman Thessaloniki archaeology'},
  'efeso':{type:'Cidade / porto romano',period:'helenístico e romano',findspot:'Éfeso, atual Turquia',current:'Sítio arqueológico de Éfeso',relation:'contextual urbana forte',supports:'Teatro, vias, edifícios públicos e estruturas cultuais documentam uma grande cidade da província romana da Ásia.',limit:'O sítio confirma o ambiente histórico de Éfeso, mas não comprova automaticamente cada cena de Atos 19.',image:'Ephesus archaeological site'},
  'efeso e asia romana':{type:'Cidade / província romana',period:'século I d.C.',findspot:'Éfeso, atual Turquia',current:'Sítio arqueológico de Éfeso',relation:'contextual urbana',supports:'A arqueologia de Éfeso oferece contexto para a vida urbana, religiosa e imperial da Ásia romana.',limit:'A associação da carta aos destinatários e questões de autoria permanecem temas textuais e históricos distintos.',image:'Ephesus Library Celsus archaeology'},
  'efeso e as igrejas da asia':{type:'Cidade / contexto das sete igrejas',period:'século I d.C.',findspot:'Éfeso, atual Turquia',current:'Sítio arqueológico de Éfeso',relation:'contextual urbana',supports:'O sítio preserva elementos do ambiente urbano, imperial e religioso relevante à comunidade de Éfeso.',limit:'A arqueologia contextualiza a cidade; não determina por si só a interpretação simbólica de Apocalipse.',image:'Ephesus Turkey archaeological site'},
  'betesda em jerusalem':{type:'Piscinas / sítio urbano',period:'Segundo Templo e períodos posteriores',findspot:'Jerusalém',current:'Área da Igreja de Santa Ana / Betesda',relation:'topográfica',supports:'Estruturas de piscinas antigas ajudam a localizar o cenário urbano associado a João 5.',limit:'A identificação do local ajuda na topografia; não comprova o milagre narrado.',image:'Pool of Bethesda Jerusalem'},
  'siloe em jerusalem':{type:'Piscina / sistema hidráulico',period:'Jerusalém antiga / Segundo Templo',findspot:'Cidade de Davi, Jerusalém',current:'Sítio arqueológico em Jerusalém',relation:'topográfica',supports:'Vestígios hidráulicos e da piscina ajudam a reconstruir a topografia de Siloé.',limit:'A existência da piscina contextualiza a narrativa; não comprova o milagre de João 9.',image:'Pool of Siloam archaeology'},
  'poncio pilatos':{type:'Inscrição',period:'século I d.C.',findspot:'Cesareia Marítima',current:'Israel Museum, Jerusalém',relation:'personagem / título administrativo',supports:'A inscrição de Cesareia atesta Pôncio Pilatos e seu título administrativo no contexto da Judeia romana.',limit:'A inscrição atesta o personagem histórico e o cargo; não comprova por si só os episódios específicos dos Evangelhos.',image:'Pilate Stone Caesarea'},
  'cafarnaum':{type:'Cidade / sítio arqueológico',period:'período romano e bizantino',findspot:'Cafarnaum, margem do mar da Galileia',current:'Sítio arqueológico de Cafarnaum',relation:'topográfica / urbana',supports:'As escavações documentam a aldeia e a sinagoga monumental visível, construída no século V d.C.; estruturas mais antigas foram encontradas sob ela.',limit:'A sinagoga visível não é a do século I. A identificação das estruturas inferiores com a sinagoga frequentada por Jesus é uma interpretação arqueológica, não uma prova direta.',image:'Capernaum archaeology'},
  'cafarnaum e galileia':{type:'Cidade / região',period:'século I d.C. e períodos posteriores',findspot:'Cafarnaum, Galileia',current:'Sítio arqueológico de Cafarnaum',relation:'contextual regional',supports:'A arqueologia de Cafarnaum ajuda a reconstruir o ambiente de uma aldeia da Galileia romana.',limit:'O contexto local não comprova automaticamente cada episódio de cura ou ensino narrado.',image:'Capernaum synagogue archaeology'},
  'cana da galileia':{type:'Local tradicional / sítio',period:'período romano',findspot:'Galileia',current:'Kafr Kanna e outras propostas',relation:'localização debatida',supports:'Existem tradições e propostas arqueológicas para a identificação de Caná no contexto da Galileia antiga.',limit:'A localização exata de Caná é debatida; o BEREIA não apresenta uma proposta como certeza absoluta.',image:'Cana Galilee archaeology'},
  'jerusalem do segundo templo':{type:'Cidade / reconstrução histórica',period:'516 a.C.–70 d.C.',findspot:'Jerusalém',current:'Jerusalém / Israel Museum (modelo histórico)',relation:'contextual urbana',supports:'Arqueologia e reconstruções acadêmicas ajudam a visualizar a cidade, o Templo e sua paisagem no período de Jesus.',limit:'Modelos são reconstruções baseadas em evidências e hipóteses; não são fotografias exatas da cidade antiga.',image:'Second Temple Jerusalem model'},
  'jerusalem e as festas':{type:'Cidade / contexto cultual',period:'Segundo Templo',findspot:'Jerusalém',current:'Sítios arqueológicos e modelo do Segundo Templo',relation:'contextual urbana',supports:'Topografia, peregrinação e estruturas do período ajudam a contextualizar as festas judaicas narradas em João.',limit:'A arqueologia contextualiza espaço e práticas; não decide por si só a interpretação teológica do Evangelho.',image:'Jerusalem Second Temple model'}
 };
 const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
 const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
 function current(){return window.BEREIA_STUDY_SESSION?.getCurrent?.()||window.selectedVerse||(()=>{try{return JSON.parse(localStorage.getItem('bereia:lastVerse')||'null')}catch(e){return null}})()}
 function ref(v){return v?((v.book||'')+' '+v.chapter+':'+v.verse):''}
 function matches(v){return (window.BEREIA_PASSAGE_SOURCES||[]).filter(x=>x[0]===v?.book&&Number(v.chapter)>=Number(x[1])&&Number(v.chapter)<=Number(x[2]))}
 function eventFor(v){return (window.BEREIA_PASSAGE_EVENTS||[]).find(x=>x.book===v?.book&&Number(v.chapter)>=Number(x.from)&&Number(v.chapter)<=Number(x.to))}
 function urlOf(x){return x.slice().reverse().find(v=>/^https?:\/\//i.test(String(v||'')))||''}
 function sourceLabel(x){
   try{return new URL(urlOf(x)).hostname.replace(/^www\./,'')}catch(e){return 'Fonte não informada'}
 }
 function safeURL(value,hosts){try{const u=new URL(value);return u.protocol==='https:'&&(!hosts||hosts.includes(u.hostname))?u.href:''}catch(e){return ''}}
 function licensedImage(p){
   const ii=p.imageinfo?.[0],em=ii?.extmetadata||{},license=String(em.LicenseShortName?.value||'');
   const accepted=/^(?:CC BY(?:-SA)? (?:1\.0|2\.0|2\.5|3\.0|4\.0)|CC0(?: 1\.0)?|Public domain)$/i.test(license);
   const attribution=String(em.Artist?.value||'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
   const licenseURL=safeURL(em.LicenseUrl?.value);
   return !!(accepted&&safeURL(ii?.thumburl,['upload.wikimedia.org'])&&safeURL(ii?.descriptionurl,['commons.wikimedia.org'])&&(!/^CC BY/i.test(license)||(attribution&&licenseURL)));
 }
 function meta(title){
   const n=norm(title);return META[n]||{type:classify(title),period:'Período indicado pela fonte do achado/sítio',findspot:'Consulte a fonte institucional',current:'Consulte a fonte institucional',relation:'contextual',supports:'Este item oferece contexto material, histórico ou textual relacionado à passagem.',limit:'A relação arqueológica deve ser avaliada junto ao tipo de evidência e à fonte; contexto não equivale automaticamente a comprovação de cada detalhe narrado.',image:title};
 }
 function classify(t){const n=norm(t);if(/inscri|estela|pilatos/.test(n))return 'Inscrição';if(/rolo|manuscrito|apocrifo/.test(n))return 'Manuscrito';if(/relevo|cerco|campanha/.test(n))return 'Relevo / evidência imperial';if(/sitio|cidade|jerusalem|corinto|efeso|filipos|cafarnaum|cesareia|ninive|babilonia|betesda|siloe/.test(n))return 'Sítio arqueológico';return 'Evidência arqueológica'}
 function ensure(){
   const s=document.getElementById('archaeology');if(!s)return null;s.classList.add('b57Ready');
   let x=document.getElementById('b57ArchaeologyLab');if(!x){x=document.createElement('div');x.id='b57ArchaeologyLab';const a=s.querySelector('.b54Trail')||s.querySelector('h1');a?.insertAdjacentElement('afterend',x)}return x;
 }
 async function commonsImage(card,query){
   const box=card.querySelector('.b57Img'),credit=card.querySelector('.b57Credit'),button=card.querySelector('[data-b57-image]');if(!box||button?.disabled)return;
   if(button)button.disabled=true;
   const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),12000);
   box.innerHTML='<div class="placeholder" role="status">Buscando fotografias com licença identificada…</div>';
   try{
     const u='https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch='+encodeURIComponent(query+' filetype:bitmap')+'&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url%7Cextmetadata&iiurlwidth=700&format=json&origin=*';
     const r=await fetch(u,{signal:controller.signal,cache:'force-cache'});if(!r.ok)throw new Error('commons');const d=await r.json();
     const pages=Object.values(d?.query?.pages||{}).filter(licensedImage).sort((a,b)=>(a.index||0)-(b.index||0)).slice(0,3);
     if(!pages.length)throw new Error('sem imagem licenciada');
     box.innerHTML='';
     for(const p of pages){
       const ii=p.imageinfo[0],em=ii.extmetadata,figure=document.createElement('figure');
       const artist=String(em.Artist?.value||'Autoria não indicada na ficha do arquivo').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
       const img=document.createElement('img');img.src=safeURL(ii.thumburl,['upload.wikimedia.org']);img.alt=p.title.replace(/^File:/,'');img.loading='lazy';
       img.addEventListener('error',()=>{img.replaceWith(document.createTextNode('Fotografia indisponível. Consulte o arquivo original.'))});
       const caption=document.createElement('figcaption');caption.textContent=img.alt+' — '+artist+' • '+em.LicenseShortName.value+' • Foto relacionada; pode ser réplica, detalhe ou reconstrução. ';
       const link=document.createElement('a');link.href=safeURL(ii.descriptionurl,['commons.wikimedia.org']);link.target='_blank';link.rel='noopener noreferrer';link.textContent='Arquivo, autor e licença ↗';caption.append(link);
       figure.append(img,caption);box.append(figure);
     }
     if(credit)credit.textContent='As fotos são encontradas por associação de termos; não confirmam que a imagem retrate o achado original. Confira a ficha do arquivo para autoria e licença. Imagens exibidas sem edição.';
   }catch(e){
     box.innerHTML='<div class="placeholder" role="status">Não foi possível carregar fotos com licença identificada. Você pode tentar novamente; a ficha permanece disponível.</div>';
     if(credit)credit.textContent='Nenhuma fotografia exibida nesta tentativa.';
   }finally{clearTimeout(timer);if(button){button.disabled=false;button.textContent='Buscar fotos licenciadas novamente'}}
 }
 function artifactHTML(x,i){
   const title=x[3],desc=x[4]||'',m=meta(title),url=safeURL(urlOf(x)),source=sourceLabel(x);
   return '<article class="b57Artifact" data-b57-i="'+i+'" data-b57-query="'+esc(m.image||title)+'">'+
     '<div class="b57Img"><div class="placeholder">🏺<br>Imagem ainda não carregada</div></div>'+
     '<div class="b57Body"><h3>'+esc(title)+'</h3><span class="b57Relation">'+esc(m.relation)+'</span>'+
       '<div class="b57Meta"><div class="b57Info"><b>Tipo</b>'+esc(m.type)+'</div><div class="b57Info"><b>Período</b>'+esc(m.period)+'</div><div class="b57Info"><b>Descoberta / local</b>'+esc(m.findspot)+'</div><div class="b57Info"><b>Onde está hoje</b>'+esc(m.current)+'</div></div>'+
       '<div class="b57Info"><b>Relação com a passagem</b>'+esc(ref(current()))+' — vínculo '+esc(m.relation)+'. Referência cadastrada: '+esc(x[0])+' '+esc(x[1])+(x[1]!==x[2]?'–'+esc(x[2]):'')+'.</div>'+
       '<div class="b57Evidence"><b>✓ O que este achado comprova ou sustenta</b>'+esc(m.supports)+'</div>'+
       '<div class="b57Limit"><b>⚖ O que este achado não comprova</b>'+esc(m.limit)+'</div>'+
       (desc?'<div class="b57Info" style="margin-top:9px"><b>Nota cadastrada no BEREIA</b>'+esc(desc)+'</div>':'')+
       '<div class="b57Actions"><button class="b57Btn" data-b57-image>Buscar fotos licenciadas</button>'+(url?'<a class="b57Btn primary" target="_blank" rel="noopener noreferrer" href="'+esc(url)+'">Consultar fonte ↗</a>':'')+'<button class="b57Btn" data-b57-map>Ver geografia</button></div>'+
       '<div class="b57Info" style="margin-top:9px"><b>Fonte</b>'+esc(source)+'</div>'+
     '</div><div class="b57Credit">Imagem não carregada.</div></article>';
 }
 function render(){
   const root=ensure();if(!root)return;const v=current();
   if(!v){root.innerHTML='<div class="b57Empty"><strong>Selecione um versículo</strong>O BEREIA mostrará achados e sítios relacionados à passagem selecionada.</div>';return}
   const items=matches(v),ev=eventFor(v);
   root.innerHTML='<div class="b57Hero"><small>'+esc(ref(v))+'</small><h2>Arqueologia da passagem</h2><p>'+(ev?esc(ev.title)+' • '+esc(ev.history):'O BEREIA relaciona somente evidências cadastradas com fonte identificável.')+'</p></div>'+
     '<div class="b57Stats"><div class="b57Stat"><small>Evidências específicas</small><b>'+items.length+'</b></div><div class="b57Stat"><small>Método</small><b>Evidência ≠ prova total</b></div></div>'+
     (items.length?'<div class="b57Grid">'+items.map(artifactHTML).join('')+'</div>':'<div class="b57Empty"><strong>Sem achado específico cadastrado</strong>Não há, neste momento, uma evidência arqueológica específica cadastrada para '+esc(ref(v))+'. O BEREIA prefere mostrar uma lacuna a inventar uma relação.</div>')+
     (ev?'<div class="b57Method"><strong>Contexto e cautela da seção</strong><br>'+esc(ev.evidence)+'</div>':'')+
     '<div class="b57Method"><strong>Como o BEREIA trata arqueologia</strong><br>1) identifica o objeto ou sítio; 2) mostra a fonte; 3) explica a relação com a passagem; 4) separa contexto histórico de comprovação direta; 5) declara quando uma identificação ou cronologia é debatida.</div>';
   root.querySelectorAll('.b57Artifact').forEach(card=>{
     const q=card.dataset.b57Query;card.querySelector('[data-b57-image]')?.addEventListener('click',()=>commonsImage(card,q));
     card.querySelector('[data-b57-map]')?.addEventListener('click',()=>window.BEREIA_V56_GEO?.openGeography?.());
   });
 }
 function open(){if(typeof go==='function')go('archaeology');setTimeout(render,0)}
 function hook(){
   window.openPassageArchaeology=open;
   if(window.BEREIA_V52&&!window.BEREIA_V52.__v57arch){
     const old=window.BEREIA_V52.openContext;
     window.BEREIA_V52.openContext=function(k){if(k==='archaeology')return open();return old.apply(this,arguments)};
     window.BEREIA_V52.__v57arch=true;
   }
   const oldTopic=window.studyTopic;if(typeof oldTopic==='function'&&!oldTopic.__v57arch){
     const w=function(t){if(norm(t)==='arqueologia')return open();return oldTopic.apply(this,arguments)};w.__v57arch=true;window.studyTopic=w;
   }
   const b=document.getElementById('bereiaBuildBadge');if(b)b.textContent='BEREIA • '+BUILD;
 }
 document.addEventListener('bereia:studyverse',()=>{if(document.querySelector('.screen.active')?.id==='archaeology')render()});
 window.BEREIA_V57_ARCH={render,open,commonsImage,meta};
 window.BEREIA_V58_ARCH={render,open,commonsImage,meta,licensedImage};
 
 window.addEventListener('load',()=>{setTimeout(hook,260);setTimeout(hook,1100);setTimeout(()=>{if(document.querySelector('.screen.active')?.id==='archaeology')render()},1200)});setTimeout(hook,700);
})();
