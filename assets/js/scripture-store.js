/* Shared chapter storage for the reader, downloads, stories and search. */
(function(root){
 'use strict';
 const clean=x=>typeof x==='string'?x.trim():Array.isArray(x)?x.map(clean).filter(Boolean).join(' '):x&&typeof x==='object'?clean(x.text??x.content??x.value??''):'';
 function normalize(payload){
  const d=payload?.data??payload;
  let rows=Array.isArray(d)?d:d?.verses??d?.chapter?.verses??d?.chapter?.content?.filter(x=>x.type==='verse')??[];
  if(!Array.isArray(rows))rows=Object.entries(rows).map(([n,v])=>({number:+n,text:clean(v)}));
  return rows.map((v,i)=>({number:Number(v?.number??v?.verse??i+1),text:clean(v)}));
 }
 const valid=rows=>Array.isArray(rows)&&rows.length>0&&rows.every((v,i)=>Number.isInteger(v.number)&&v.number>0&&typeof v.text==='string'&&v.text.trim().length>0&&(i===0||v.number>rows[i-1].number));
 const key=(v,b,c)=>`${v}:${b}:${c}`;
 function browserStorage(){
  let promise;
  const open=()=>promise||=(new Promise((resolve,reject)=>{
   const request=indexedDB.open('bereia-offline',1);
   request.onupgradeneeded=()=>request.result.createObjectStore('chapters');
   request.onsuccess=()=>{request.result.onversionchange=()=>{request.result.close();promise=null};resolve(request.result)};
   request.onerror=()=>reject(request.error);
   request.onblocked=()=>reject(Error('Feche outra aba do Bereia para atualizar o armazenamento.'));
  }).catch(e=>{promise=null;throw e}));
  async function call(mode,action){const db=await open();return new Promise((resolve,reject)=>{
   const tx=db.transaction('chapters',mode),request=action(tx.objectStore('chapters'));
   tx.oncomplete=()=>resolve(request?.result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||Error('Gravação interrompida.'));
  })}
  return {call,get:k=>call('readonly',s=>s.get(k)),put:(k,v)=>call('readwrite',s=>s.put(v,k)),
   putBook:(v,b,chapters)=>call('readwrite',s=>{chapters.forEach((rows,i)=>s.put(rows,key(v,b,i+1)))}),
   entries:async()=>{const db=await open();return new Promise((resolve,reject)=>{
    const tx=db.transaction('chapters','readonly'),s=tx.objectStore('chapters'),keys=s.getAllKeys(),values=s.getAll();
    tx.oncomplete=()=>resolve(keys.result.map((k,i)=>({key:String(k),verses:values.result[i]})));tx.onerror=()=>reject(tx.error);
   })}};
 }
 function create(options={}){
  const storage=options.storage||browserStorage(),pending=new Map();
  const online=options.online||(()=>root.navigator?.onLine!==false);
  let legacy=options.legacy;try{legacy ||= root.localStorage}catch{}
  let network=options.network;
  async function saved(v,b,c){
   const k=key(v,b,c);let rows;
   try{rows=await storage.get(k)}catch{}
   if(valid(rows))return rows;
   try{rows=JSON.parse(legacy?.getItem('bereia:bible:v4:'+k)||'null');if(valid(rows)){await storage.put(k,rows);return rows}}catch{if(valid(rows))return rows}
   return null;
  }
  async function load(v,b,c){
   const k=key(v,b,c);
   if(pending.has(k))return pending.get(k);
   const task=(async()=>{
    const rows=await saved(v,b,c);if(rows)return {verses:rows,saved:true,source:'device'};
    if(!online())throw Error('Este capítulo ainda não foi baixado. Conecte-se para abri-lo e guardá-lo neste dispositivo.');
    const verses=await network(v,b,c);if(!valid(verses))throw Error('A fonte retornou um capítulo vazio ou inválido.');
    let persisted=true;try{await storage.put(k,verses)}catch{persisted=false}
    return {verses,saved:persisted,source:'network'};
   })();pending.set(k,task);try{return await task}finally{pending.delete(k)}
  }
  async function json(url,signal,timeout=15000){
   const controller=new AbortController(),abort=()=>controller.abort();
   if(signal?.aborted)throw new DOMException('Download interrompido','AbortError');
   signal?.addEventListener('abort',abort,{once:true});const timer=setTimeout(abort,timeout);
   try{const response=await (options.fetch||root.fetch)(url,{signal:controller.signal,cache:'no-store',headers:{Accept:'application/json'}});if(!response.ok)throw Error('Fonte indisponível ('+response.status+').');return await response.json()}
   finally{clearTimeout(timer);signal?.removeEventListener('abort',abort)}
  }
  async function downloadBook(version,book,{signal,onProgress=()=>{}}={}){
   const [osis,name,total]=book,chapters=[];
   for(let ch=1;ch<=total;ch++)chapters.push(await saved(version,osis,ch));
   if(chapters.every(valid)){onProgress(total,total);return total}
   if(!online())throw Error('Conecte-se para baixar '+name+'.');
   if(signal?.aborted)throw new DOMException('Download interrompido','AbortError');
   // Whole books are atomic: incomplete responses never replace a saved book.
   const special=version==='bpm'&&['Esth','Dan','Tob','Jdt','Wis','Sir','Bar','1Mac','2Mac'].includes(osis);
   if(!special){
    const lang=version==='kjv'?'en':'pt';
    try{
     const payload=await json(`https://raw.githubusercontent.com/midvash/bible-data/main/versions/${lang}/${encodeURIComponent(version)}/books/${encodeURIComponent(osis)}.json`,signal,25000);
     const rows=payload.chapters?.map(normalize);
     if(!rows||rows.length!==total||!rows.every(valid))throw Error('Livro incompleto: '+name);
     if(signal?.aborted)throw new DOMException('Download interrompido','AbortError');
     await storage.putBook(version,osis,rows);onProgress(total,total);return total;
    }catch(e){if(signal?.aborted||e.name==='QuotaExceededError')throw e}
   }
   for(let ch=1;ch<=total;ch++){
    if(signal?.aborted)throw new DOMException('Download interrompido','AbortError');
    if(!valid(chapters[ch-1]))chapters[ch-1]=await network(version,osis,ch,{signal});
    if(!valid(chapters[ch-1]))throw Error('Capítulo incompleto: '+name+' '+ch);
    // Preserve each validated chapter for resuming an interrupted download.
    await storage.put(key(version,osis,ch),chapters[ch-1]);onProgress(ch,total);
   }
   return total;
  }
  return {normalize,valid,key,json,load,saved,downloadBook,entries:storage.entries,dbCall:storage.call,setNetwork:fn=>{network=fn}};
 }
 root.BereiaScriptureFactory=create;
 root.BereiaScripture=create();
})(globalThis);
