const version = '1.0.0';
const cacheName = 'cache-v1';
const filesToCache = [
  '/',
  '/detail/',
  '/css/main.css',
  '/images/bulbasaur.jpg'
];

self.addEventListener('install', event => {
  console.log('[SW] Installing service worker and cache static assets');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('[SW] Opened cache');
        return cache.addAll(filesToCache);
      }).catch(err => {
        console.error('[SW] Cache error: ', err);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          // console.log('[SW] Returned cache: ', response.url);
          return response;
        }
        // console.log('[SW] Returned HTTP: ', event.request.url);
        return fetch(event.request);
      })
  )
});

self.addEventListener('push', event => {

});