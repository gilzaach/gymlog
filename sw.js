const C='gl1',F=['./','index.html','css/styles.css','js/i18n.js','js/exercises.js','js/app.js','manifest.webmanifest'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F))));
self.addEventListener('fetch',e=>e.respondWith(fetch(e.request).then(r=>{const x=r.clone();caches.open(C).then(c=>c.put(e.request,x));return r}).catch(()=>caches.match(e.request))));
