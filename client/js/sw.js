// V2
var cacheName = 'app-leader';
var filesToCache = ["/","/fonts/fonts.min.css","/images/grand-canyon.jpg","/images/icon/icon-16.png","/images/icon/icon-512.png","/images/icon/icon-57.png","/images/icon/icon.ico","/images/icon/icon.svg","/images/minimal-flower-petal.jpg","/images/neon.jpg","/images/sand.jpg","/images/spiral-pattern.jpg","/images/stone.jpg","/images/sunlight-shadow.jpg","/images/tokyo-infinity.jpg","/images/waterfall.jpg","/js/cache.min.js","/js/cachelist.min.js","/js/jquery.min.js","/js/main.min.js","/js/worker.min.js","/css/error.min.css","/css/main.min.css","/fonts/MaterialIconMod.css","/fonts/MaterialIconMod.eot","/fonts/MaterialIconMod.min.css","/fonts/MaterialIconMod.svg","/fonts/MaterialIconMod.ttf","/fonts/MaterialIconMod.woff","/fonts/MaterialIconMod.woff2","/fonts/OpenSans-Bold.css","/fonts/OpenSans-Bold.eot","/fonts/OpenSans-Bold.min.css","/fonts/OpenSans-Bold.svg","/fonts/OpenSans-Bold.ttf","/fonts/OpenSans-Bold.woff","/fonts/OpenSans-Bold.woff2","/fonts/OpenSans-BoldItalic.css","/fonts/OpenSans-BoldItalic.eot","/fonts/OpenSans-BoldItalic.min.css","/fonts/OpenSans-BoldItalic.svg","/fonts/OpenSans-BoldItalic.ttf","/fonts/OpenSans-BoldItalic.woff","/fonts/OpenSans-BoldItalic.woff2","/fonts/OpenSans-ExtraBold.css","/fonts/OpenSans-ExtraBold.eot","/fonts/OpenSans-ExtraBold.min.css","/fonts/OpenSans-ExtraBold.svg","/fonts/OpenSans-ExtraBold.ttf","/fonts/OpenSans-ExtraBold.woff","/fonts/OpenSans-ExtraBold.woff2","/fonts/OpenSans-ExtraBoldItalic.css","/fonts/OpenSans-ExtraBoldItalic.eot","/fonts/OpenSans-ExtraBoldItalic.min.css","/fonts/OpenSans-ExtraBoldItalic.svg","/fonts/OpenSans-ExtraBoldItalic.ttf","/fonts/OpenSans-ExtraBoldItalic.woff","/fonts/OpenSans-ExtraBoldItalic.woff2","/fonts/OpenSans-Italic.css","/fonts/OpenSans-Italic.eot","/fonts/OpenSans-Italic.min.css","/fonts/OpenSans-Italic.svg","/fonts/OpenSans-Italic.ttf","/fonts/OpenSans-Italic.woff","/fonts/OpenSans-Italic.woff2","/fonts/OpenSans-Light.css","/fonts/OpenSans-Light.eot","/fonts/OpenSans-Light.min.css","/fonts/OpenSans-Light.svg","/fonts/OpenSans-Light.ttf","/fonts/OpenSans-Light.woff","/fonts/OpenSans-Light.woff2","/fonts/OpenSans-LightItalic.css","/fonts/OpenSans-LightItalic.eot","/fonts/OpenSans-LightItalic.min.css","/fonts/OpenSans-LightItalic.svg","/fonts/OpenSans-LightItalic.ttf","/fonts/OpenSans-LightItalic.woff","/fonts/OpenSans-LightItalic.woff2","/fonts/OpenSans-Regular.css","/fonts/OpenSans-Regular.eot","/fonts/OpenSans-Regular.min.css","/fonts/OpenSans-Regular.svg","/fonts/OpenSans-Regular.ttf","/fonts/OpenSans-Regular.woff","/fonts/OpenSans-Regular.woff2","/fonts/OpenSans-SemiBold.css","/fonts/OpenSans-SemiBold.eot","/fonts/OpenSans-SemiBold.min.css","/fonts/OpenSans-SemiBold.svg","/fonts/OpenSans-SemiBold.ttf","/fonts/OpenSans-SemiBold.woff","/fonts/OpenSans-SemiBold.woff2","/fonts/OpenSans-SemiBoldItalic.css","/fonts/OpenSans-SemiBoldItalic.eot","/fonts/OpenSans-SemiBoldItalic.min.css","/fonts/OpenSans-SemiBoldItalic.svg","/fonts/OpenSans-SemiBoldItalic.ttf","/fonts/OpenSans-SemiBoldItalic.woff","/fonts/OpenSans-SemiBoldItalic.woff2","/fonts/fonts.min.css"];
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        }).catch(console.error)
    );
});
self.addEventListener('activate', function(event) {
    var cacheWhitelist = ['app-science'];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(CacheName) {
                    if (cacheWhitelist.indexOf(CacheName) === -1) {
                        return caches.delete(CacheName);
                    }
                })
            );
        })
    );
});
self.addEventListener('fetch', function(evt) {
    console.log('The service worker is serving the asset.');
    
    // You can use respondWith() to answer ASAP…
    evt.respondWith(fromCache(evt.request));
    
    // …and waitUntil() to prevent the worker to be killed until the cache is updated.
    evt.waitUntil(
        update(evt.request)
        
        // Finally, send a message to the client to inform it about the resource is up to date.
        .then(refresh)
    );
});

// Open the cache where the assets were stored and search for the requested resource. Notice that in case of no matching, the promise still resolves but it does with undefined as value.
function fromCache(request) {
    return caches.open(CACHE).then(function(cache) {
        return cache.match(request);
    });
}

// Update consists in opening the cache, performing a network request and storing the new response data.
function update(request) {
    return caches.open(CACHE).then(function(cache) {
        return fetch(request).then(function(response) {
            return cache.put(request, response.clone()).then(function() {
                return response;
            });
        });
    });
}

// Sends a message to the clients.
function refresh(response) {
    return self.clients.matchAll().then(function(clients) {
        clients.forEach(function(client) {
            // Encode which resource has been updated. By including the ETag the client can check if the content has changed.
            var message = {
                type: 'refresh',
                url: response.url,
                // Notice not all servers return the ETag header. If this is not provided you should use other cache headers or rely on your own means to check if the content has changed.
                eTag: response.headers.get('ETag')
            };
            
            // Tell the client about the update.
            client.postMessage(JSON.stringify(message));
        });
    });
}
