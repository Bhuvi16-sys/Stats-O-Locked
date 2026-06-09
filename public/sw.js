/* Stats-O-Locked Service Worker
   Strategy:
   - /assets/*  → cache-first  (Vite gives them content-hash names, safe to cache forever)
   - images      → cache-first  (webp/png/jpg/svg — same rationale)
   - fonts        → cache-first
   - HTML (nav)  → network-first, fallback to cache (ensures fresh chunk references)
*/

const CACHE = 'sol-v1';

/* Remove any old cache versions on activate */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  /* Only intercept same-origin requests */
  if (url.origin !== self.location.origin) return;

  const path = url.pathname;

  /* ── Cache-first: hashed assets (JS chunks, CSS) ── */
  if (path.startsWith('/assets/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  /* ── Cache-first: static files (images, fonts, icons) ── */
  if (/\.(webp|png|jpe?g|svg|ico|gif|woff2?|ttf|otf|eot)$/i.test(path)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  /* ── Network-first: HTML navigation (always fresh) ── */
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }
});

/* Serve from cache; fetch + store on miss */
async function cacheFirst(request) {
  const cache  = await caches.open(CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

/* Try network first; fall back to cache on failure */
async function networkFirst(request) {
  const cache = await caches.open(CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    return cache.match(request);
  }
}
