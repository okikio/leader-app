// V2
var cacheName = 'app-leader';
var filesToCache = ["/","/fonts/fonts.min.css","/images/grand-canyon.jpg","/images/icon/icon-16.png","/images/icon/icon-512.png","/images/icon/icon-57.png","/images/icon/icon.ico","/images/icon/icon.svg","/images/minimal-flower-petal.jpg","/images/neon.jpg","/images/sand.jpg","/images/spiral-pattern.jpg","/images/stone.jpg","/images/sunlight-shadow.jpg","/images/tokyo-infinity.jpg","/images/waterfall.jpg","/js/cache.min.js","/js/cachelist.min.js","/js/jquery.min.js","/js/main.min.js","/js/worker.min.js","/css/error.min.css","/css/main.min.css"];
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
/*
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});*/
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
