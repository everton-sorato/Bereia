from pathlib import Path
import json,hashlib
root=Path(__file__).resolve().parents[1]
files=['./','./index.html','./manifest.webmanifest','./bereia-icon.svg','./privacidade.html','./suporte.html']+['./'+str(p.relative_to(root)) for p in sorted((root/'assets').rglob('*')) if p.is_file()]
digest=hashlib.sha256(b''.join((root/f[2:]).read_bytes() for f in files if f!='./')).hexdigest()[:12]
(root/'sw.js').write_text("const CACHE='bereia-shell-v59-"+digest+"';\nconst CORE="+json.dumps(files)+";\n"+'''self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('bereia-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 if(e.request.mode==='navigate'){
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}).catch(async()=>await caches.match(e.request)||await caches.match(new URL('./index.html',self.registration.scope).href)));return;
 }
 e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request)));
});
''')
