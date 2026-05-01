// ============================================================
// Service Worker — offline support + auto-update
// ============================================================
//
// Strategy:
//   - cache-first for app shell (HTML, CSS, JS, fonts, libs)
//   - network-first for lessons.js (so weekly updates pull fresh
//     when online but still work offline from last cache)
//
// To force a global update of cached assets, bump CACHE_VERSION.
// ============================================================

const CACHE_VERSION = 'magyar-v1.0.0';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './srs.js',
  './manifest.json',
  './icon.svg',
  // CDN deps (cached on first network hit)
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      // Fetch each individually; ignore failures so install always succeeds
      return Promise.all(
        APP_SHELL.map((url) =>
          cache.add(url).catch((err) => console.warn('SW: skip', url, err))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Network-first for lessons.js (weekly updates)
  if (url.pathname.endsWith('/lessons.js') || url.pathname.endsWith('lessons.js')) {
    event.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // Cache-first for everything else
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        // Cache same-origin or known CDN responses
        if (res && res.status === 200 && (res.type === 'basic' || res.type === 'cors')) {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => {
        // Offline fallback for navigation requests
        if (req.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});
