// Minimal service worker just to pass PWA install requirements.
// Not caching anything right now since the app is so small.
self.addEventListener('fetch', e => {
    return;
});
