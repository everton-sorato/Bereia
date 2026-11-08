"""Build the shell manifest from actual HTML URLs; keep versioned URLs intact."""
from pathlib import Path
import re,json,hashlib
root=Path(__file__).resolve().parents[1]
html=(root/'index.html').read_text()
urls=re.findall(r'<script[^>]+src="(\./[^\"]+)"',html)+re.findall(r'<link[^>]+href="(\./[^\"]+\.css(?:\?[^\"]*)?)"',html)
core=list(dict.fromkeys(['./','./index.html','./manifest.webmanifest','./bereia-icon.svg','./privacidade.html','./suporte.html','./assets/icon-192.png','./assets/icon-512.png']+urls+['./'+str(p.relative_to(root)) for p in sorted((root/'assets/images').glob('*.webp'))]))
contents=[]
for url in core:
 if url=='./':continue
 p=root/url.split('?')[0][2:]
 if not p.is_file():raise SystemExit('Missing shell asset: '+str(p))
 contents.append(p.read_bytes())
version=hashlib.sha256(b''.join(contents)).hexdigest()[:12]
worker="const CACHE='bereia-shell-v137-"+version+"';\nconst CORE="+json.dumps(core)+";\n"+'''const shellURL=new URL('./index.html',self.registration.scope).href;
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('bereia-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 const url=new URL(e.request.url);
 if(e.request.method!=='GET'||url.origin!==location.origin)return;
 if(e.request.mode==='navigate'){
  e.respondWith((async()=>{
   const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),4500);
   try{const response=await fetch(e.request,{signal:controller.signal});if(response.ok)return response;throw Error('Page unavailable')}
   catch{
    const cache=await caches.open(CACHE);
    const exact=await cache.match(e.request,{ignoreSearch:true});if(exact)return exact;
    const scope=new URL(self.registration.scope),isApp=url.pathname===scope.pathname||url.pathname===scope.pathname+'index.html';
    if(isApp){const shell=await cache.match(shellURL);if(shell)return shell}
    return new Response('Página indisponível sem conexão. Abra o BEREIA pela tela inicial.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
   }finally{clearTimeout(timer)}
  })());return;
 }
 e.respondWith(caches.open(CACHE).then(cache=>cache.match(e.request)).then(hit=>hit||fetch(e.request)));
});
'''
(root/'sw.js').write_text(worker)
print('Shell:',len(core),'URLs; version:',version)
