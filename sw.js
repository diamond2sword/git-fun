
const CACHE_NAME = 'cod3g-v6';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
];

// External domains to cache dynamically (Fonts, Scripts, Images)
const EXTERNAL_DOMAINS = [
  'cdn.tailwindcss.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'aistudiocdn.com',
  'api.dicebear.com',
  'images.unsplash.com',
  'cdn-icons-png.flaticon.com',
  'placehold.co'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. EXTERNAL ASSETS (Cache First)
  if (EXTERNAL_DOMAINS.some(domain => url.hostname.includes(domain))) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        
        return fetch(event.request, { mode: 'cors', credentials: 'omit' })
          .then((response) => {
            // Cache opaque responses (status 0) or valid 200s
            if (!response || (response.status !== 200 && response.type !== 'opaque')) {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            return response;
          })
          .catch((err) => {
             console.log('Fetch failed for external asset', err);
          });
      })
    );
    return;
  }

  // 2. APP NAVIGATION (Network First -> Fallback to index.html)
  // This is crucial for SPA PWA support.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match('./index.html');
        })
    );
    return;
  }

  // 3. DEFAULT STRATEGY (Cache First for everything else)
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});