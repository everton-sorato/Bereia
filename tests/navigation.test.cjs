const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

test('return from geography preserves reader position without creating another history entry',()=>{
 const screens=['bible','geography'].map(id=>({id,classList:{contains:()=>true,add(){},remove(){}}}));
 let open=true,active='bible',position=720;
 const listeners={},pushes=[];
 const context={
  window:{scrollY:720,addEventListener:(name,fn)=>listeners[name]=fn},
  document:{
   body:{classList:{contains:()=>open,toggle:(_,value)=>open=value}},
   querySelector:()=>({id:active}),
   querySelectorAll:()=>screens,
   getElementById:id=>screens.find(s=>s.id===id),
   dispatchEvent:event=>active=event.detail.id
  },
  location:{hash:'#bible'},
  history:{state:null,pushState(_,__,hash){pushes.push(hash);context.location.hash=hash},back(){context.location.hash='#bible';listeners.popstate()}},
  scrollTo:options=>position=options.top,
  CustomEvent:class{constructor(name,options){this.detail=options.detail}},
  setActive(){},renderStudyVerse(){},renderOriginals(){},currentVerses:[1]
 };
 const source=fs.readFileSync('assets/js/00-core.js','utf8');
 vm.createContext(context);
 vm.runInContext(source.slice(source.indexOf('let navHistory'),source.indexOf('function setActive')),context);
 vm.runInContext("go('geography')",context);
 assert.equal(position,0);
 context.window.scrollY=120;
 vm.runInContext('goBack()',context);
 assert.equal(position,720);
 assert.equal(active,'bible');
 assert.deepEqual(pushes,['#geography']);
});
