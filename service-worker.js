// service-worker.js

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mirage-shield-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/icon-192x192.png',
        '/icon-512x512.png',
        '/style.css',
        '/script.js'
        // Add other files to cache here
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
