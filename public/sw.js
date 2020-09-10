const cacheName = 'v1';

const cacheAssets = [
    '/index.html',
    '/main.css',
    '/main.js'

];



//call install event
self.addEventListener('install', event => {
    console.log('Service Worker: Installed');

    event.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log('Service Name: Caching Files');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
});

//call activate event
self.addEventListener('activate', event => {
    console.log('Service Worker: Activated');

    //remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheName => {
            return Promise.all(
                 cacheName.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

//fetch event
self.addEventListener('fetch', event => {
    console.log('Service Worker: Fetching');
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});