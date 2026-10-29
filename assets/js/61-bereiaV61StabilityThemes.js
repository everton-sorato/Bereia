/* BEREIA V73 — temas e retorno seguro ao início. */
(()=>{
'use strict';
const themes={original:'Tema atual',light:'Claro',tech:'Tecnológico'};
const saved=localStorage.getItem('bereia:theme');
const valid=x=>Object.prototype.hasOwnProperty.call(themes,x);
function apply(name,persist=true){
 const key=valid(name)?name:'original';
 document.documentElement.dataset.bereiaTheme=key;
 document.documentElement.style.colorScheme=key==='light'?'light':'dark';
 if(persist)localStorage.setItem('bereia:theme',key);
 document.querySelectorAll('#appTheme').forEach(s=>{if(s.value!==key)s.value=key});
 return key;
}
window.BereiaThemes={get:()=>valid(localStorage.getItem('bereia:theme'))?localStorage.getItem('bereia:theme'):'original',set:apply,labels:{...themes}};
apply(valid(saved)?saved:'original',false);

const css=`
:root[data-bereia-theme="light"]{--bg:#f4f3ef;--panel:#fff;--panel2:#eceae4;--line:#d8d5cc;--text:#242620;--muted:#666960;--gold:#8b681e;--gold2:#a98a49;--green:#39734e;--danger:#a54343;color-scheme:light}
:root[data-bereia-theme="light"] body{background:#f4f3ef;color:#242620}
:root[data-bereia-theme="light"] .sidebar,:root[data-bereia-theme="light"] .bottom{background:#fff;color:#242620;border-color:#d8d5cc}
:root[data-bereia-theme="light"] .hero,:root[data-bereia-theme="light"] .reader,:root[data-bereia-theme="light"] .studybox,:root[data-bereia-theme="light"] .card,:root[data-bereia-theme="light"] .module,:root[data-bereia-theme="light"] .mapInfo,:root[data-bereia-theme="light"] .translation,:root[data-bereia-theme="light"] .studyStep,:root[data-bereia-theme="light"] .dailyCard,:root[data-bereia-theme="light"] .quickStudy,:root[data-bereia-theme="light"] .globalSearchBox,:root[data-bereia-theme="light"] .portalHero,:root[data-bereia-theme="light"] .releasePanel,:root[data-bereia-theme="light"] .versionCard,:root[data-bereia-theme="light"] .resultCard,:root[data-bereia-theme="light"] .realMapCard,:root[data-bereia-theme="light"] .studyVerseCard{background:#fff!important;color:#242620;border-color:#d8d5cc}
:root[data-bereia-theme="light"] .v,:root[data-bereia-theme="light"] .btn,:root[data-bereia-theme="light"] .select,:root[data-bereia-theme="light"] .search,:root[data-bereia-theme="light"] .input,:root[data-bereia-theme="light"] .textarea,:root[data-bereia-theme="light"] .chip,:root[data-bereia-theme="light"] .tab{background:#fff!important;color:#242620;border-color:#d8d5cc}
:root[data-bereia-theme="light"] .v.selected,:root[data-bereia-theme="light"] .chip.active,:root[data-bereia-theme="light"] .btn.primary{background:#e9dfc6!important;color:#3c2c0c!important;border-color:#b49a61}
:root[data-bereia-theme="light"] .studybox p,:root[data-bereia-theme="light"] .translation p,:root[data-bereia-theme="light"] .module p,:root[data-bereia-theme="light"] .resultCard p,:root[data-bereia-theme="light"] .realMapCard p{color:#4c5049!important}
:root[data-bereia-theme="light"] .hero:after{color:#8b681e0c}
:root[data-bereia-theme="tech"]{--bg:#07111b;--panel:#0d1b28;--panel2:#122738;--line:#224256;--text:#e5f5fb;--muted:#96afbd;--gold:#55d5ed;--gold2:#318ba3;--green:#59d6a5;--danger:#ff8b88;color-scheme:dark}
:root[data-bereia-theme="tech"] body{background:radial-gradient(ellipse at 75% -15%,#14344a 0,transparent 42%),#07111b;color:#e5f5fb}
:root[data-bereia-theme="tech"] .sidebar,:root[data-bereia-theme="tech"] .bottom{background:#091522ed;border-color:#224256}
:root[data-bereia-theme="tech"] .hero,:root[data-bereia-theme="tech"] .reader,:root[data-bereia-theme="tech"] .studybox,:root[data-bereia-theme="tech"] .card,:root[data-bereia-theme="tech"] .module,:root[data-bereia-theme="tech"] .mapInfo,:root[data-bereia-theme="tech"] .translation,:root[data-bereia-theme="tech"] .studyStep,:root[data-bereia-theme="tech"] .dailyCard,:root[data-bereia-theme="tech"] .quickStudy,:root[data-bereia-theme="tech"] .globalSearchBox,:root[data-bereia-theme="tech"] .portalHero,:root[data-bereia-theme="tech"] .releasePanel,:root[data-bereia-theme="tech"] .versionCard,:root[data-bereia-theme="tech"] .resultCard,:root[data-bereia-theme="tech"] .realMapCard,:root[data-bereia-theme="tech"] .studyVerseCard{background:#0b1a27!important;color:#e5f5fb;border-color:#224256}
:root[data-bereia-theme="tech"] .v,:root[data-bereia-theme="tech"] .btn,:root[data-bereia-theme="tech"] .select,:root[data-bereia-theme="tech"] .search,:root[data-bereia-theme="tech"] .input,:root[data-bereia-theme="tech"] .textarea,:root[data-bereia-theme="tech"] .chip,:root[data-bereia-theme="tech"] .tab{background:#102434!important;color:#e5f5fb;border-color:#28516a}
:root[data-bereia-theme="tech"] .v.selected,:root[data-bereia-theme="tech"] .chip.active,:root[data-bereia-theme="tech"] .btn.primary{background:#55d5ed!important;color:#04131b!important;border-color:#55d5ed}
#appTheme{display:block;width:100%;max-width:420px;margin-top:10px;padding:12px;border-radius:12px;border:1px solid var(--line);background:var(--panel2);color:var(--text);font:inherit}
`;
if(!document.getElementById('bereiaThemeStyles')){const style=document.createElement('style');style.id='bereiaThemeStyles';style.textContent=css;document.head.append(style)}

window.simpleHome=function(){
 try{if(Array.isArray(window.navHistory))window.navHistory.length=0}catch{}
 document.body.classList.remove('simpleBibleOpen');
 document.getElementById('bereiaDeepBar')?.classList.remove('show');
 const homeUrl=location.pathname+location.search+'#home';
 try{history.replaceState(history.state,'',homeUrl)}catch{}
 if(typeof window.go==='function')window.go('home',false);
 window.scrollTo({top:0,behavior:'smooth'});
};
window.addEventListener('popstate',()=>{
 const id=location.hash.slice(1)||'home',screen=document.getElementById(id);
 if(!screen?.classList.contains('screen'))return;
 if(id==='home'){try{if(Array.isArray(window.navHistory))window.navHistory.length=0}catch{};document.body.classList.remove('simpleBibleOpen')}
 if(typeof window.currentScreen==='function'&&window.currentScreen()!==id&&typeof window.go==='function')window.go(id,false);
});
})();
