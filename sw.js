/**
 * sw.js
 * A deliberately small service worker: it caches the app shell (HTML, CSS,
 * JS) on install so the site's navigation still works offline, and uses a
 * network-first strategy for everything else (lecture notes, JSON data) so
 * content updates on GitHub are picked up as soon as there's a connection,
 * while still falling back to the cache when offline.
 *
 * This is intentionally simple. If you don't want offline support at all,
 * delete this file and remove the registerServiceWorker() call in js/app.js
 * — the rest of the site does not depend on it.
 */

const CACHE_NAME = 'mthnotes-shell-v1';
const SHELL_FILES = [
  'index.html',
  'courses.html',
  'course.html',
  'lecture.html',
  'questions.html',
  'resources.html',
  'favorites.html',
  'search.html',
  'about.html',
  'css/style.css',
  'css/responsive.css',
  'css/themes.css',
  'js/app.js',
  'js/router.js',
  'js/search.js',
  'js/storage.js',
  'js/ui.js',
  'js/markdown.js',
  'data/courses.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(SHELL_FILES))
      .catch(() => { /* fine if a file is missing on first deploy */ })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(req)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then(cached => cached || caches.match('index.html')))
  );
});
