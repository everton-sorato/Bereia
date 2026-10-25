const CACHE='bereia-shell-v58';
const CORE=['/Bereia/','/Bereia/index.html','/Bereia/manifest.webmanifest','/Bereia/bereia-icon.svg'];

self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(CACHE)
      .then(cache=>cache.addAll(CORE))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==location.origin)return;

  if(event.request.mode==='navigate'){
    event.respondWith(
      fetch(event.request,{cache:'no-store'})
        .then(response=>{
          if(response.ok){
            const copy=response.clone();
            caches.open(CACHE).then(cache=>cache.put('/Bereia/index.html',copy));
          }
          return response;
        })
        .catch(()=>caches.match('/Bereia/index.html'))
    );
    return;
  }

  if(url.pathname.endsWith('/index.html')){
    event.respondWith(fetch(event.request,{cache:'no-store'}).catch(()=>caches.match(event.request)));
    return;
  }

  event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request)));
});