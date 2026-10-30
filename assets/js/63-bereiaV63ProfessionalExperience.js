(()=>{'use strict';
const appParam=new URLSearchParams(location.search).get('layout')==='app';
const standalone=window.matchMedia?.('(display-mode: standalone)').matches||navigator.standalone===true;
const appMode=appParam||standalone;
document.documentElement.classList.toggle('bereia-app-experience',appMode);
document.documentElement.classList.toggle('bereia-site-experience',!appMode);

const css=[
':root{scroll-padding-top:78px}',
'.bereia-site-experience body{background:radial-gradient(ellipse at 76% 0%,rgba(215,181,109,.055),transparent 34%),var(--bg,#0b0d10)}',
'.bereia-site-experience body #bereiaDailyCover,.bereia-site-experience body #bereiaSimpleEntry,.bereia-site-experience body #bereiaPrayerCard,.bereia-site-experience body #bereiaLibrarySwitch,.bereia-site-experience body #bereiaLicenseCenter,.bereia-site-experience body #bereiaStudyTools,.bereia-site-experience body #bereiaV62Home{width:min(1320px,calc(100% - 44px));margin-left:auto;margin-right:auto}',
'.bereia-site-experience body #bereiaDailyCover{min-height:min(58vh,560px);margin-top:22px;border:1px solid rgba(224,196,130,.22);border-radius:26px;box-shadow:0 24px 65px rgba(0,0,0,.24);overflow:hidden}',
'.bereia-site-experience body #bereiaSimpleEntry{margin-top:14px;margin-bottom:22px}',
'.bereia-site-experience body #bereiaSimpleEntry .simpleBibleCard{border-radius:20px;padding:22px 26px;transition:transform .18s,border-color .18s,background .18s}',
'.bereia-site-experience body #bereiaSimpleEntry .simpleBibleCard:hover{transform:translateY(-2px);border-color:rgba(224,196,130,.55)}',
'.bereia-site-experience body #bereiaPrayerCard{margin-top:12px;margin-bottom:24px}',
'.bereia-site-experience body #bereiaLibrarySwitch,.bereia-site-experience body #bereiaLicenseCenter,.bereia-site-experience body #bereiaStudyTools,.bereia-site-experience body #bereiaV62Home{margin-top:22px;margin-bottom:22px}',
'.bereia-site-experience body #bereiaLibrarySwitch,.bereia-site-experience body #bereiaLicenseCenter,.bereia-site-experience body #bereiaStudyTools{border-radius:22px}',
'.bereia-site-experience body #bereiaStudyTools .bst-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}',
'.bereia-site-experience body .b62Section{border-radius:24px;margin:18px 0;padding:24px}',
'.bereia-site-experience body .b62Topics{gap:10px}',
'.bereia-site-experience body .b62Topic>summary{min-height:48px}',
'.bereia-site-experience body .b62StoryRail{padding:6px 2px 16px}',
'.bereia-site-experience body .b62StoryCard{border-radius:18px}',
'.bereia-site-experience body .sidebar{backdrop-filter:blur(16px);background:rgba(13,16,20,.94)}',
'.bereia-site-experience body .nav [data-go]{min-height:46px;border-radius:13px;transition:background .18s,color .18s,transform .18s}',
'.bereia-site-experience body .nav [data-go]:hover{transform:translateX(2px)}',
'.bereia-site-experience body .screen{width:min(1120px,calc(100% - 36px));margin:24px auto;padding:clamp(22px,4vw,42px);border:1px solid rgba(255,255,255,.08);border-radius:24px;background:linear-gradient(145deg,rgba(20,24,29,.96),rgba(14,17,21,.96));box-shadow:0 24px 70px rgba(0,0,0,.18)}',
'.bereia-site-experience body .screen h1{font-size:clamp(30px,4vw,44px);letter-spacing:-.035em}',
'.bereia-site-experience body #bibleReader{max-width:900px;margin:26px auto 0;display:grid;grid-template-columns:1fr;gap:0}',
'.bereia-site-experience body #bibleReader button{width:100%;text-align:left;border:0;border-bottom:1px solid rgba(255,255,255,.08);border-radius:0;background:transparent;padding:15px 10px;font-size:var(--reader-size,18px);line-height:1.78;transition:background .15s}',
'.bereia-site-experience body #bibleReader button:hover{background:rgba(215,181,109,.055)}',
'.bereia-site-experience body #bibleReader button:first-of-type{border-top:1px solid rgba(255,255,255,.08)}',
'.bereia-site-experience body #settings{max-width:960px}',
'.bereia-site-experience body .releasePanel{border-radius:20px;background:linear-gradient(145deg,#15191e,#101317);border-color:rgba(255,255,255,.09)}',
'#bereiaBuildBadge{display:none!important}',
'.bereiaPrayerTopButton{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:40px;padding:8px 13px;border:1px solid rgba(215,181,109,.55);border-radius:999px;background:rgba(215,181,109,.12);color:#f1d88f;font:800 12px/1 system-ui;white-space:nowrap;cursor:pointer;transition:background .16s,border-color .16s,transform .16s}','.bereiaPrayerTopButton:hover{background:rgba(215,181,109,.2);border-color:#d7b56d;transform:translateY(-1px)}','.bereiaPrayerTopButton .prayerTopGlyph{font-size:15px;line-height:1}','.bereiaAppHeader .bereiaPrayerTopButton{margin-left:auto;flex:none}','.bereiaPrayerTopButton{position:fixed;z-index:12002;top:calc(12px + env(safe-area-inset-top));right:14px;box-shadow:0 6px 22px rgba(0,0,0,.28)}','.bereiaAppHeader .bereiaPrayerTopButton{position:static;top:auto;right:auto;box-shadow:none}','.bereiaPrayerToast{top:calc(76px + env(safe-area-inset-top))}','.bereiaPrayerCard{display:none!important}','.bereiaPrayerTopButton:focus-visible{outline:3px solid #e6c575;outline-offset:3px}','#bereiaDailyDeepBtn{display:none!important}',
'.bereiaPrayerCard{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:14px;padding:20px 22px;border:1px solid rgba(215,181,109,.28);border-radius:20px;background:linear-gradient(120deg,rgba(37,35,27,.92),rgba(18,22,21,.97));color:var(--text,#f5f1e8);box-shadow:0 16px 40px rgba(0,0,0,.16)}',
'.bereiaPrayerCard small{display:block;color:#e4c879;font-size:10px;font-weight:800;letter-spacing:.13em;text-transform:uppercase}',
'.bereiaPrayerCard h2{margin:5px 0 4px;font-size:clamp(18px,2.3vw,24px);letter-spacing:-.02em}',
'.bereiaPrayerCard p{margin:0;color:var(--muted,#aaa);line-height:1.55}',
'.bereiaPrayerCard .prayerScheduleStatus{margin-top:7px;color:#d6c28f;font-size:12px}',
'.bereiaPrayerCard button,.bereiaPrayerPanel button,.bereiaAppMoreDialog button{min-height:44px;border:1px solid rgba(215,181,109,.42);border-radius:12px;background:#d7b56d;color:#17140d;padding:10px 15px;font-weight:800;cursor:pointer}',
'.prayerPanelDays{display:flex;flex-wrap:wrap;gap:7px;margin:8px 0 14px}',
'.prayerPanelDays label{display:flex;align-items:center;gap:6px;min-height:38px;padding:6px 10px;border:1px solid #363c40;border-radius:999px;background:#111519;color:#ddd}',
'.prayerPanelDays input{accent-color:#d7b56d}',
'.prayerPanelRow{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}',
'.prayerPanelRow label{display:grid;gap:6px;color:var(--muted,#aaa);font-size:13px}',
'.prayerPanelRow input,.prayerPanelRow select{min-height:44px;width:100%;padding:10px 12px;border:1px solid #41474c;border-radius:11px;background:#101418;color:var(--text,#f5f1e8);font:inherit}',
'.prayerPanelButtons{display:flex;flex-wrap:wrap;gap:9px;margin-top:14px}',
'.prayerPanelButtons .secondary{background:#1c2226;color:#f0e9d8;border-color:#42484a}',
'.prayerPanelHelp{margin:12px 0 0;color:var(--muted,#aaa);font-size:12px;line-height:1.55}',
'.bereiaPrayerToast{position:fixed;z-index:20050;right:18px;top:calc(18px + env(safe-area-inset-top));width:min(410px,calc(100vw - 36px));padding:18px;border:1px solid rgba(215,181,109,.48);border-radius:18px;background:#15191d;color:#f5f1e8;box-shadow:0 18px 60px rgba(0,0,0,.45)}',
'.bereiaPrayerToast[hidden]{display:none}',
'.bereiaPrayerToast strong{display:block;margin-bottom:6px;color:#e5c777}',
'.bereiaPrayerToast p{margin:0;color:#d7d5ce;line-height:1.55}',
'.bereiaPrayerToast button{float:right;margin:0 0 4px 8px;border:0;background:transparent;color:#f5f1e8;font-size:20px;cursor:pointer}',
'.bereiaAppHeader,.bereiaAppBottomNav,.bereiaAppMoreDialog{display:none}',
'.bereia-app-experience body{background:#0b0e11}',
'.bereia-app-experience body .sidebar{display:none!important}',
'.bereia-app-experience body .main{width:100%;max-width:none;margin:0;padding:82px 16px calc(104px + env(safe-area-inset-bottom));}',
'.bereia-app-experience body #bereiaDailyCover{width:calc(100% - 28px);min-height:320px;max-height:470px;margin:74px auto 15px;border-radius:24px}',
'.bereia-app-experience body #bereiaSimpleEntry,.bereia-app-experience body #bereiaPrayerCard,.bereia-app-experience body #bereiaLibrarySwitch,.bereia-app-experience body #bereiaLicenseCenter,.bereia-app-experience body #bereiaStudyTools,.bereia-app-experience body #bereiaV62Home{width:calc(100% - 28px);margin-left:auto;margin-right:auto}',
'.bereia-app-experience body #bereiaSimpleEntry{margin-top:12px;margin-bottom:14px}',
'.bereia-app-experience body #bereiaSimpleEntry .simpleBibleCard{border-radius:18px;padding:16px}',
'.bereia-app-experience body #bereiaPrayerCard{grid-template-columns:1fr;margin-top:14px;margin-bottom:18px;padding:17px;border-radius:18px}',
'.bereia-app-experience body #bereiaPrayerCard button{width:100%}',
'.bereia-app-experience body #bereiaLibrarySwitch{padding:14px;border-radius:18px}',
'.bereia-app-experience body #bereiaStudyTools{padding:16px;border-radius:18px}',
'.bereia-app-experience body #bereiaStudyTools .bst-grid{grid-template-columns:1fr;gap:8px}',
'.bereia-app-experience body #bereiaV62Home .b62Section{margin:14px 0;padding:16px;border-radius:18px}',
'.bereia-app-experience body .screen{width:100%;margin:0;padding:14px 4px 24px;border:0;border-radius:0;background:transparent;box-shadow:none}',
'.bereia-app-experience body .screen h1{font-size:30px}',
'.bereia-app-experience body #bibleReader{width:100%;margin:18px auto 0;gap:8px}',
'.bereia-app-experience body #bibleReader button{border:1px solid rgba(255,255,255,.08);border-radius:14px;background:#11161a;padding:15px 14px}',
'.bereia-app-experience body #bibleReader button:first-of-type{border-top:1px solid rgba(255,255,255,.08)}',
'.bereia-app-experience body #simpleBackHome{display:none!important}',
'.bereiaAppHeader{position:fixed;z-index:12000;top:0;left:0;right:0;min-height:62px;padding:calc(8px + env(safe-area-inset-top)) 18px 8px;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(12,15,18,.94);backdrop-filter:blur(16px);color:#f3eee4}',
'.bereiaAppHeader strong{font-size:17px;letter-spacing:.12em}',
'.bereiaAppHeader span{color:#aaa;font-size:12px}',
'.bereiaAppBottomNav{position:fixed;z-index:12001;left:50%;bottom:0;transform:translateX(-50%);width:min(100%,720px);min-height:66px;padding:6px 8px calc(7px + env(safe-area-inset-bottom));display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:3px;border-top:1px solid rgba(255,255,255,.1);background:rgba(13,16,20,.97);backdrop-filter:blur(18px)}',
'.bereiaAppBottomNav button{display:grid;place-items:center;align-content:center;gap:3px;min-width:0;min-height:50px;padding:4px 2px;border:0;border-radius:13px;background:transparent;color:#9ea4a8;font:700 10px/1.15 system-ui;cursor:pointer}',
'.bereiaAppBottomNav button .navGlyph{font-size:19px;line-height:1}',
'.bereiaAppBottomNav button[aria-current=page]{background:rgba(215,181,109,.14);color:#f0d384}',
'.bereiaAppMoreDialog{position:fixed;inset:auto 0 0;margin:0 auto;max-width:720px;width:100%;max-height:min(78vh,720px);overflow:auto;padding:18px 18px calc(24px + env(safe-area-inset-bottom));border:1px solid rgba(255,255,255,.13);border-bottom:0;border-radius:24px 24px 0 0;background:#11161a;color:#f5f1e8;box-shadow:0 -18px 60px rgba(0,0,0,.45)}',
'.bereiaAppMoreDialog[open]{display:block}',
'.bereiaAppMoreDialog::backdrop{background:rgba(0,0,0,.56);backdrop-filter:blur(3px)}',
'.bereiaAppMoreDialog h2{margin:6px 0 4px;font-size:22px}',
'.bereiaAppMoreDialog p{margin:0 0 15px;color:#aeb4b6;font-size:13px}',
'.bereiaAppMoreGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}',
'.bereiaAppMoreGrid button{background:#1a2024;color:#eee;border-color:#323a3e;text-align:left}',
'.bereiaAppMoreDialog .moreClose{float:right;min-width:44px;background:transparent;color:#eee;border-color:#42484a}',
'.bereia-app-experience body .bereiaPrayerPanel{scroll-margin-top:82px}',
'@media(max-width:760px){.bereia-site-experience body #bereiaDailyCover,.bereia-site-experience body #bereiaSimpleEntry,.bereia-site-experience body #bereiaPrayerCard,.bereia-site-experience body #bereiaLibrarySwitch,.bereia-site-experience body #bereiaLicenseCenter,.bereia-site-experience body #bereiaStudyTools,.bereia-site-experience body #bereiaV62Home{width:calc(100% - 20px)}.bereia-site-experience body .screen{width:calc(100% - 20px);padding:20px 15px}.bereia-site-experience body #bereiaStudyTools .bst-grid{grid-template-columns:1fr}.bereiaPrayerCard{grid-template-columns:1fr}.bereiaPrayerCard button{width:100%}.prayerPanelRow{grid-template-columns:1fr}}',
'.bereia-site-experience body #bereiaDailyCover{position:relative;left:calc((100% + 250px - 100vw)/2)!important;width:calc(100vw - 250px)!important;max-width:none!important;margin-left:0!important;margin-right:0!important;border-radius:0!important}',
'@media(max-width:900px){.bereia-site-experience body #bereiaDailyCover{left:0!important;width:100vw!important}}',
'.bereia-app-experience body #bereiaDailyCover{width:100vw!important;max-width:none!important;margin-left:0!important;margin-right:0!important;border-radius:0!important}',
'.bereiaPrayerTopButton{background:rgba(17,20,24,.9);border-color:rgba(215,181,109,.24);color:#cfc6ad;box-shadow:0 4px 14px rgba(0,0,0,.18);font-size:11px}',
'.bereiaPrayerTopButton:hover{background:rgba(20,23,27,.96);border-color:rgba(215,181,109,.46);color:#e3d39e;transform:none}',
'.bereia-site-experience body #bereiaLicenseCenter{width:min(980px,calc(100% - 44px));margin:34px auto 18px}',
'.bereia-site-experience body #bereiaDailyCover,.bereia-app-experience body #bereiaDailyCover{display:flex;align-items:center;justify-content:center;text-align:center}',
'.bereia-site-experience body #bereiaDailyCover .dailyInner,.bereia-app-experience body #bereiaDailyCover .dailyInner{width:min(100%,900px);max-width:900px;margin:0 auto;padding:clamp(22px,4vw,42px);text-align:center}',
'.bereia-site-experience body #bereiaDailyCover .dailyInner .verse,.bereia-app-experience body #bereiaDailyCover .dailyInner .verse{max-width:900px;margin:12px auto}',
'.bereia-site-experience body #bereiaDailyCover .dailyInner .actions,.bereia-app-experience body #bereiaDailyCover .dailyInner .actions{justify-content:center}',
'.bereia-site-experience body #bereiaDailyCover,.bereia-app-experience body #bereiaDailyCover{display:flex;align-items:center;justify-content:center;text-align:center}',
'.bereia-site-experience body #bereiaDailyCover .bdcContent,.bereia-app-experience body #bereiaDailyCover .bdcContent{width:min(100%,900px);max-width:900px;margin:0 auto;padding:clamp(22px,4vw,42px);text-align:center}',
'.bereia-site-experience body #bereiaDailyCover .bdcText,.bereia-app-experience body #bereiaDailyCover .bdcText{max-width:760px;margin:0 auto;text-align:center}',
'.bereia-site-experience body #bereiaDailyCover .bdcActions,.bereia-app-experience body #bereiaDailyCover .bdcActions{display:flex;justify-content:center}',
'@media(prefers-reduced-motion:reduce){.bereia-site-experience body *, .bereia-app-experience body *{scroll-behavior:auto!important;animation:none!important;transition:none!important}}'
].join('\n');
const style=document.createElement('style');style.id='bereiaV63ProfessionalExperienceStyles';style.textContent=css;document.head.appendChild(style);

function cfg(){try{return Object.assign({enabled:false,time:'19:00',days:[0,1,2,3,4,5,6],practice:'prayer',notifications:false},JSON.parse(localStorage.getItem('bereia:prayerReminder:v1')||'{}'))}catch{return {enabled:false,time:'19:00',days:[0,1,2,3,4,5,6],practice:'prayer',notifications:false}}}
const prompts={
 prayer:{title:'Um momento de oração',text:'Faça uma pausa, aquiete o coração e converse com Deus com sinceridade.',ref:'Filipenses 4:6–7'},
 reading:{title:'Um momento com a Palavra',text:'Leia com calma uma passagem e anote uma ideia que chamou sua atenção.',ref:'Salmo 119:105'},
 gratitude:{title:'Um momento de gratidão',text:'Lembre-se de algo concreto pelo qual você pode agradecer hoje.',ref:'1 Tessalonicenses 5:18'},
 pause:{title:'Uma pausa para respirar',text:'Respire com calma e entregue a Deus as preocupações deste momento.',ref:'1 Pedro 5:7'}
};
const dayNames=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
function saveCfg(next){localStorage.setItem('bereia:prayerReminder:v1',JSON.stringify(next));paintPrayerStatus();paintHomeCard()}
function localTimeZone(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone||'fuso local'}catch{return 'fuso local'}}
function localDateKey(date){return [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-')}
function showPrayerSaved(enabled,time,days){const detail=enabled?'Lembrete salvo para '+time+' · '+(days.length===7?'todos os dias':days.map(d=>dayNames[d]).join(', '))+' · hora local ('+localTimeZone()+').':'Lembrete desativado neste navegador.';showPrayerToast({title:enabled?'Lembrete salvo':'Lembrete desativado',text:detail,ref:enabled?'As preferências ficam neste dispositivo.':'Você pode configurar novamente quando quiser.'})}
function timeLabel(c){return (c.days||[]).length===7?'todos os dias':(c.days||[]).map(d=>dayNames[d]).join(', ')}
function paintHomeCard(){
 const button=document.getElementById('bereiaPrayerTopButton');if(!button)return;
 const c=cfg(),label=button.querySelector('.prayerTopLabel'),status=button.querySelector('.prayerTopStatus');
 if(label)label.textContent=c.enabled?'Lembrete ativo':'Lembrete';
 if(status)status.textContent=c.enabled?'· '+(c.time||'19:00'):'';
 button.setAttribute('aria-label',c.enabled?'Lembrete salvo às '+(c.time||'19:00')+' no horário local. Ajustar lembrete.':'Configurar lembrete');
 button.title=c.enabled?'Ativo às '+(c.time||'19:00')+' · hora local ('+localTimeZone()+')':'Configurar seu lembrete de oração';
}
function makeHomeCard(){
 document.getElementById('bereiaPrayerCard')?.remove();
 if(document.getElementById('bereiaPrayerTopButton'))return;
 const button=document.createElement('button');button.type='button';button.id='bereiaPrayerTopButton';button.className='bereiaPrayerTopButton';button.innerHTML='<span class="prayerTopGlyph" aria-hidden="true">◷</span><span class="prayerTopLabel">Lembrete</span><span class="prayerTopStatus"></span>';
 const header=appMode?document.querySelector('.bereiaAppHeader'):null;
 if(header)header.append(button);else document.body.append(button);
 button.addEventListener('click',openPrayerSettings);paintHomeCard();
}
function ensureSettingsPanel(){
 const settings=document.getElementById('settings');if(!settings||document.getElementById('bereiaPrayerPanel'))return;
 const panel=document.createElement('section');panel.id='bereiaPrayerPanel';panel.className='releasePanel bereiaPrayerPanel';
 panel.innerHTML='<h2>Lembretes e mensagens</h2><p>Escolha um horário para receber uma mensagem curta de oração, leitura ou gratidão.</p><label><input id="prayerReminderEnabled" type="checkbox"> Ativar lembrete neste dispositivo</label><div class="prayerPanelRow"><label for="prayerReminderTime">Horário<input id="prayerReminderTime" type="time" value="19:00"></label><label for="prayerReminderPractice">Tipo de mensagem<select id="prayerReminderPractice"><option value="prayer">Oração</option><option value="reading">Leitura bíblica</option><option value="gratitude">Gratidão</option><option value="pause">Pausa e reflexão</option></select></label></div><p><strong>Quais dias?</strong></p><div class="prayerPanelDays">'+dayNames.map((name,i)=>'<label><input type="checkbox" data-prayer-day="'+i+'"> '+name+'</label>').join('')+'</div><div class="prayerPanelButtons"><button type="button" id="prayerReminderSave">Salvar lembrete</button><button type="button" class="secondary" id="prayerNotificationEnable">Permitir notificações neste aparelho</button></div><p id="prayerReminderStatus" role="status" aria-live="polite"></p><p class="prayerPanelHelp">Cada navegador/aparelho guarda suas próprias preferências, e o horário segue o fuso local deste dispositivo ('+localTimeZone()+'). O lembrete local aparece enquanto o BEREIA está aberto ou quando você voltar ao app. Avisos com o app totalmente fechado exigem notificações push e um serviço de envio.</p>';
 const first=settings.querySelector('.releasePanel');if(first)first.insertAdjacentElement('afterend',panel);else settings.append(panel);
 const c=cfg();
 panel.querySelector('#prayerReminderEnabled').checked=!!c.enabled;
 panel.querySelector('#prayerReminderTime').value=c.time||'19:00';
 panel.querySelector('#prayerReminderPractice').value=c.practice||'prayer';
 panel.querySelectorAll('[data-prayer-day]').forEach(input=>input.checked=(c.days||[]).includes(Number(input.dataset.prayerDay)));
 panel.querySelector('#prayerReminderSave').addEventListener('click',()=>{
  const days=[...panel.querySelectorAll('[data-prayer-day]:checked')].map(x=>Number(x.dataset.prayerDay));
  const enabled=panel.querySelector('#prayerReminderEnabled').checked;
  const status=panel.querySelector('#prayerReminderStatus');
  if(enabled&&!days.length){status.textContent='Escolha ao menos um dia para ativar o lembrete.';return}
  const next={enabled,time:panel.querySelector('#prayerReminderTime').value||'19:00',practice:panel.querySelector('#prayerReminderPractice').value,days,notifications:cfg().notifications};
  saveCfg(next);status.textContent=enabled?'Lembrete salvo às '+next.time+' · '+(days.length===7?'todos os dias':days.map(d=>dayNames[d]).join(', '))+' · hora local ('+localTimeZone()+').':'Lembrete desativado neste navegador.';showPrayerSaved(enabled,next.time,days);
 });
 panel.querySelector('#prayerNotificationEnable').addEventListener('click',async()=>{
  const status=panel.querySelector('#prayerReminderStatus');
  if(!('Notification' in window)){status.textContent='Este navegador não oferece notificações neste dispositivo. O lembrete no app continua disponível.';return}
  try{
   const permission=Notification.permission==='default'?await Notification.requestPermission():Notification.permission;
   const next=cfg();next.notifications=permission==='granted';saveCfg(next);
   status.textContent=permission==='granted'?'Notificações permitidas neste aparelho. Elas serão usadas quando o BEREIA estiver aberto.':'Permissão não concedida. O lembrete dentro do app continua disponível.';
  }catch{status.textContent='Não foi possível ativar as notificações neste navegador.'}
 });
}
function openPrayerSettings(){
 const me=document.querySelector('#desktopNav [data-go="me"]');if(me)me.click();
 setTimeout(()=>{
  const link=[...document.querySelectorAll('#me button')].find(b=>/Ajustes, offline e backup/i.test(b.textContent));
  if(link)link.click();
  setTimeout(()=>document.getElementById('bereiaPrayerPanel')?.scrollIntoView({behavior:'smooth',block:'start'}),100);
 },80);
}
function showPrayerToast(prompt){
 let toast=document.getElementById('bereiaPrayerToast');
 if(!toast){toast=document.createElement('aside');toast.id='bereiaPrayerToast';toast.className='bereiaPrayerToast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');document.body.appendChild(toast)}
 toast.innerHTML='<button type="button" aria-label="Fechar lembrete">×</button><strong>'+prompt.title+'</strong><p>'+prompt.text+' <b>'+prompt.ref+'</b></p>';
 toast.hidden=false;toast.querySelector('button').addEventListener('click',()=>{toast.hidden=true});
 window.clearTimeout(showPrayerToast.timer);showPrayerToast.timer=window.setTimeout(()=>{toast.hidden=true},18000);
}
function checkPrayerReminder(){
 const c=cfg();if(!c.enabled)return;
 const now=new Date(),today=localDateKey(now);if(!(c.days||[]).includes(now.getDay()))return;
 const [hour,minute]=(c.time||'19:00').split(':').map(Number),due=new Date(now);due.setHours(hour||0,minute||0,0,0);
 const age=now-due;if(age<0||age>8*60*60*1000)return;
 const key='bereia:prayerReminder:lastShown:'+localTimeZone()+':'+today;if(localStorage.getItem(key)===c.time)return;
 localStorage.setItem(key,c.time);const prompt=prompts[c.practice]||prompts.prayer;showPrayerToast(prompt);
 if(c.notifications&&'Notification'in window&&Notification.permission==='granted'){try{new Notification(prompt.title,{body:prompt.text+' '+prompt.ref,tag:'bereia-prayer-'+today})}catch{}}
}
function initMoreMenu(){
 if(!appMode||document.getElementById('bereiaAppBottomNav'))return;
 const header=document.createElement('header');header.className='bereiaAppHeader';header.innerHTML='<strong>BEREIA</strong><span>Leitura e estudo bíblico</span>';document.body.append(header);
 const bottom=document.createElement('nav');bottom.id='bereiaAppBottomNav';bottom.className='bereiaAppBottomNav';bottom.setAttribute('aria-label','Navegação principal do aplicativo');
 const primary=[['home','⌂','Início'],['bible','▤','Bíblia'],['study','⌕','Estudar'],['discover','✦','Descobrir']];
 function sync(){
  const route=document.querySelector('#desktopNav [data-go].active')?.dataset.go||document.querySelector('.screen.active')?.id||'home';
  const more=document.getElementById('bereiaAppMoreButton');
  bottom.querySelectorAll('[data-app-route]').forEach(b=>{const active=b.dataset.appRoute===route;b.setAttribute('aria-current',active?'page':'false')});
  if(more)more.setAttribute('aria-current',primary.some(x=>x[0]===route)?'false':'page');
 }
 primary.forEach(([route,glyph,label])=>{
  const b=document.createElement('button');b.type='button';b.dataset.appRoute=route;b.innerHTML='<span class="navGlyph">'+glyph+'</span><span>'+label+'</span>';
  b.addEventListener('click',()=>{document.querySelector('#desktopNav [data-go="'+route+'"]')?.click();setTimeout(sync,0)});
  bottom.append(b);
 });
 const more=document.createElement('button');more.type='button';more.id='bereiaAppMoreButton';more.innerHTML='<span class="navGlyph">•••</span><span>Mais</span>';bottom.append(more);document.body.append(bottom);
 const dlg=document.createElement('dialog');dlg.className='bereiaAppMoreDialog';dlg.id='bereiaAppMoreDialog';dlg.innerHTML='<button type="button" class="moreClose" aria-label="Fechar menu">×</button><h2>Mais do BEREIA</h2><p>Acesse as ferramentas de estudo e suas preferências.</p><div class="bereiaAppMoreGrid"></div>';document.body.append(dlg);
 const grid=dlg.querySelector('.bereiaAppMoreGrid');
 document.querySelectorAll('#desktopNav [data-go]').forEach(original=>{
  if(primary.some(x=>x[0]===original.dataset.go))return;
  const b=document.createElement('button');b.type='button';b.textContent=original.textContent.trim();b.addEventListener('click',()=>{dlg.close();original.click();setTimeout(sync,0)});grid.append(b);
 });
 [['Arqueologia','archaeology'],['Apócrifos','apocrypha']].forEach(([name,layer])=>{const b=document.createElement('button');b.type='button';b.textContent=name;b.addEventListener('click',()=>{dlg.close();document.querySelector('#bereiaStudyTools button[onclick*="'+layer+'"]')?.click();setTimeout(sync,0)});grid.append(b)});
 const settings=document.createElement('button');settings.type='button';settings.textContent='Ajustes, lembretes e dados';settings.addEventListener('click',()=>{dlg.close();openPrayerSettings()});grid.append(settings);
 more.addEventListener('click',()=>dlg.showModal());dlg.querySelector('.moreClose').addEventListener('click',()=>dlg.close());dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
 document.querySelectorAll('#desktopNav [data-go]').forEach(b=>b.addEventListener('click',()=>setTimeout(sync,0)));
 const nav=document.getElementById('desktopNav');if(nav)new MutationObserver(sync).observe(nav,{subtree:true,attributes:true,attributeFilter:['class']});
 window.addEventListener('popstate',()=>setTimeout(sync,0));window.addEventListener('hashchange',()=>setTimeout(sync,0));sync();
}
function moveSourcesToBottom(){
 const sources=document.getElementById('bereiaLicenseCenter');
 if(sources)document.body.appendChild(sources);
}
function scheduleSourcesToBottom(){
 if(document.readyState==='complete')moveSourcesToBottom();
 else window.addEventListener('load',moveSourcesToBottom,{once:true});
}
function init(){
 if(appMode)document.body.classList.add('app-mode');else document.body.classList.add('website-mode');
 const badge=document.getElementById('bereiaBuildBadge');if(badge)badge.hidden=true;
 const labelDeep=()=>{const deep=document.getElementById('bereiaDeepBtn')||document.getElementById('bereiaDailyDeepBtn');if(deep&&deep.textContent!=='Estudo aprofundado'){deep.textContent='Estudo aprofundado';deep.setAttribute('aria-label','Abrir estudo aprofundado sobre a passagem do dia')}};labelDeep();new MutationObserver(labelDeep).observe(document.body,{subtree:true,childList:true});
 document.querySelectorAll('#bereiaStudyTools .btn').forEach(b=>{if(/Ajustes, offline e backup/i.test(b.textContent))b.remove()});
 initMoreMenu();makeHomeCard();ensureSettingsPanel();moveSourcesToBottom();scheduleSourcesToBottom();paintHomeCard();checkPrayerReminder();
 window.setInterval(checkPrayerReminder,30000);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)checkPrayerReminder()});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(); 
