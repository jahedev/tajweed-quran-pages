self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-pwa-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/assets/styles.css',
        '/assets/script.js',
        '/assets/images/icon-64x64.png',
        '/assets/images/icon-128x128.png',
        '/assets/images/icon-192x192.png',
        '/assets/images/icon-256x256.png',
        '/assets/images/icon-512x512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
