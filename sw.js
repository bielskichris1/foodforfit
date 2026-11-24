/* Service Worker – Food for Fit
 * Strategie: Stale-while-revalidate für alle Dateien der App (gleiche Herkunft).
 * Die App startet sofort aus dem Cache, im Hintergrund wird die neueste Version geholt.
 * Anfragen an andere Server (Gemini API) werden nicht angefasst.
 */
var CACHE = 'food-for-fit-v1';
var ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'icon.svg',
  'icon-192.png',
  'icon-512.png',
  'apple-touch-icon.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })
      );
    })
  );
});

self.addEventListener('message', function (event) {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;

  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Alle Seitenaufrufe (auch mit ?tab=add) teilen sich einen Cache-Eintrag
  var key = req.mode === 'navigate' ? new Request('index.html') : req;

  event.respondWith(
    caches.open(CACHE).then(function (cache) {
      return cache.match(key).then(function (cached) {
        var network = fetch(req, { cache: 'no-cache' })
          .then(function (res) {
            if (res && res.ok) {
              cache.put(key, res.clone());
            }
            return res;
          })
          .catch(function () {
            return cached;
          });
        event.waitUntil(network.catch(function () {}));
        return cached || network;
      });
    })
  );
});
