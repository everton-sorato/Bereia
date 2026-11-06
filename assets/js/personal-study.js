(() => {
  const studiesKey = 'bereia:personalStudies:v1';
  const read = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  };
  const ref = v => v.book + ' ' + v.chapter + (v.verse ? ':' + v.verse : '');
  const element = (tag, text) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    return node;
  };
  function button(label, action) {
    const node = element('button', label);
    node.type = 'button';
    node.className = 'btn';
    node.onclick = action;
    return node;
  }
  function link(label, href) {
    const node = element('a', label);
    node.href = href;
    node.target = '_blank';
    node.rel = 'noopener noreferrer';
    return node;
  }
  const slug = name => name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replaceAll(' ','-');
  function resources(v) {
    const hits = (window.BEREIA_PASSAGE_SOURCES || []).filter(row => row[0] === v.book && v.chapter >= row[1] && v.chapter <= row[2]);
    const finds = [...new Map(hits.map(row => [row[3],row])).values()];
    const events = (window.BEREIA_PASSAGE_EVENTS || []).filter(e => e.book === v.book && v.chapter >= e.from && v.chapter <= e.to);
    const stories = Array.from(document.querySelectorAll('[data-b62-passage-path]')).filter(node => {
      const [book,ch,range] = node.dataset.b62PassagePath.split('/');
      const [first,last] = range.split('-').map(Number);
      return slug(v.book) === book && v.chapter === Number(ch) && v.verse >= first && v.verse <= (last || first);
    });
    return {finds, events, stories};
  }
  const dialog = element('dialog');
  dialog.id = 'bereiaStudyDialog';
  dialog.setAttribute('aria-labelledby','personalStudyTitle');
  document.body.append(dialog);
  let returnTo;
  dialog.addEventListener('close', () => returnTo?.focus({preventScroll:true}));
  function show(title, opener) {
    returnTo = opener;
    const heading = element('h2',title);
    heading.id = 'personalStudyTitle';
    dialog.replaceChildren(button('Fechar', () => dialog.close()), heading);
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
  }
  function context(v, data, opener) {
    show('Contexto de ' + ref(v), opener);
    dialog.append(element('blockquote',v.text));
    for (const event of data.events) {
      dialog.append(element('h3',event.title),element('p',event.history),element('p',event.place));
    }
    for (const row of data.finds) {
      const details = window.BEREIA_V57_ARCH.meta(row[3]);
      dialog.append(element('h3',row[3]),element('p',details.findspot),element('strong','O que o achado sustenta'),
        element('p',details.supports),element('strong','Limites da evidência'),element('p',details.limit));
      const url = row.find(value => typeof value === 'string' && /^https:\/\//.test(value));
      if (url) dialog.append(link('Consultar fonte ↗',url));
      if (details.findspot && !details.findspot.startsWith('Consulte')) {
        const place = row[3] === 'Estela de Tel Dan' ? 'Tel Dan, Israel' : details.findspot;
        dialog.append(link('Pesquisar local no mapa ↗','https://www.openstreetmap.org/search?query='+encodeURIComponent(place)));
      }
    }
    for (const story of data.stories) {
      dialog.append(element('h3',story.closest('details').querySelector('.b62StoryName').textContent),
        element('p',story.querySelector('.b62StorySummary p').textContent),element('p',story.dataset.b62PassageLabel));
    }
    dialog.append(button('Criar estudo com esta passagem', () => editStudy(v,data,opener)));
  }
  const list = element('section');
  list.className = 'releasePanel';
  document.querySelector('#me').append(list);
  function renderStudies() {
    list.replaceChildren(element('h2','Meus estudos'));
    const studies = read(studiesKey,[]);
    if (!studies.length) list.append(element('p','Escolha um versículo no leitor e toque em “Criar estudo”.'));
    for (const study of studies) {
      const row = element('article');
      row.append(element('h3',study.title),element('p',ref(study.passage)+' · '+versionLabel(study.passage.version)),
        element('blockquote',study.passage.text),element('p',study.note),element('strong',study.find),
        button('Abrir passagem',()=>openPassage(study.passage)),button('Editar estudo',e=>editStudy(study.passage,resources(study.passage),e.currentTarget,study)));
      list.append(row);
    }
  }
  function editStudy(v,data,opener,existing) {
    show(existing ? 'Editar estudo' : 'Criar estudo',opener);
    const form = element('form');
    const title = element('input'), note = element('textarea'), find = element('select');
    title.required = true; title.maxLength = 120; title.value = existing?.title || '';
    note.maxLength = 12000; note.value = existing?.note || '';
    find.add(new Option('Sem achado',''));
    for (const name of new Set([existing?.find,...data.finds.map(row=>row[3])].filter(Boolean))) find.add(new Option(name,name));
    find.value = existing?.find || '';
    form.append(element('p',ref(v)+' · '+versionLabel(v.version)));
    for (const [name,input] of [['Nome do estudo',title],['Anotação',note],['Achado relacionado',find]]) {
      const label = element('label',name); label.append(input); form.append(label);
    }
    const submit = element('button','Salvar estudo'); submit.className = 'btn primary';
    const status = element('p'); status.setAttribute('role','status');
    form.append(submit,status); dialog.append(form);
    form.onsubmit = event => {
      event.preventDefault();
      if (!title.value.trim()) {status.textContent='Dê um nome ao estudo.';title.focus();return;}
      const studies = read(studiesKey,[]);
      const item = {id:existing?.id || Array.from(crypto.getRandomValues(new Uint32Array(4))).join('-'),title:title.value.trim(),note:note.value.trim(),find:find.value,passage:v};
      const index = studies.findIndex(s=>s.id===item.id);
      if (index<0) studies.unshift(item); else studies[index]=item;
      try {localStorage.setItem(studiesKey,JSON.stringify(studies));}
      catch {status.textContent='Não foi possível salvar neste dispositivo.';return;}
      renderStudies();dialog.close();toast('Estudo salvo em Meu BEREIA');
    };
  }
  async function openPassage(v) {
    bibleVersion.value=v.version;
    versionChanged(v.osis,v.chapter,false);
    go('bible');
    const verses=await loadChapter(false);
    if (!verses.length || !v.verse || currentScreen()!=='bible') return;
    requestAnimationFrame(()=>{
      const node=document.querySelector('#bibleReader [data-verse="'+Number(v.verse)+'"]');
      if (node) {node.click();node.scrollIntoView({block:'center'});}
    });
  }
  const card=document.querySelector('#bereiaSimpleEntry .simpleBibleCard');
  function resume() {
    const saved=read('bereia:reading',null);
    if (!saved) return;
    const books=readerBooks(saved.version);
    const book=saved.osis ? books.find(b=>b[0]===saved.osis) : books[saved.book];
    if (!book) return;
    const last=read('bereia:lastVerse',{});
    const verse=last.version===saved.version && last.osis===book[0] && last.chapter===saved.chapter ? last.verse : null;
    const passage={version:saved.version,book:book[1],osis:book[0],chapter:saved.chapter,verse};
    card.querySelector('b').textContent='Continuar de onde parei';
    card.querySelector('.simpleBibleCopy span').textContent=ref(passage)+' · '+versionLabel(saved.version);
    card.onclick=()=>openPassage(passage);
  }
  function actions(selected) {
    document.getElementById('studyContextActions')?.remove();
    const v=Array.from(selected.values()).at(-1);
    if (!v) return;
    const data=resources(v), group=element('div');group.id='studyContextActions';
    if (data.events.length || data.finds.length || data.stories.length) {
      group.append(button('Conheça o contexto',e=>context(v,data,e.currentTarget)));
    }
    group.append(button('Criar estudo',e=>editStudy(v,data,e.currentTarget)));
    document.getElementById('bereiaVerseActions').prepend(group);
  }
  window.BereiaPersonalStudy={actions};
  document.addEventListener('bereia:chapterloaded',resume);
  document.addEventListener('bereia:screenchange',e=>{
    if(e.detail.id==='home') resume();
    if(e.detail.id==='me') renderStudies();
  });
  resume(); renderStudies();
})();
