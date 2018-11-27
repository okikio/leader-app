// V2
var cacheName = 'app-science';
var filesToCache = `
/
/about
/health-policies-and-tech
/connections
/references
/images/benzene.png
/images/cells.png
/images/chemo.jpg
/images/city.jpg
/images/city2.jpg
/images/city3.jpg
/images/city4.jpg
/images/city5.jpg
/images/edison.jpg
/images/logo/science-128.png
/images/logo/science-256.png
/images/logo/science-30.png
/images/logo/science-32.png
/images/logo/science-48.png
/images/logo/science-512.png
/images/logo/science-60.png
/images/logo/science-72.png
/images/logo/science-80.png
/images/logo/science-96.png
/images/logo/science.ico
/images/logo/science.png
/images/logo/science.svg
/images/logo/radioactive.png
/images/logo/solar-panel1.jpg
/images/logo/stars1.jpg
/images/logo/stars2.jpg
/images/logo/stars3.jpg
/images/logo/windmill1.jpg
/images/logo/windmill2.jpg
/images/logo/windmill3.jpg
/images/logo/windmill4.jpg
/images/logo/windmill5.jpg
/images/logo/xray.jpg
/js/jquery.min.js
/js/main.min.js
/css/error.min.css
/css/main.min.css
/fonts/MaterialIconMod.eot
/fonts/MaterialIconMod.otf
/fonts/MaterialIconMod.svg
/fonts/MaterialIconMod.ttf
/fonts/MaterialIconMod.woff
/fonts/MaterialIconMod.woff2
/fonts/PermanentMarker-Regular.eot
/fonts/PermanentMarker-Regular.otf
/fonts/PermanentMarker-Regular.svg
/fonts/PermanentMarker-Regular.ttf
/fonts/PermanentMarker-Regular.woff
/fonts/PermanentMarker-Regular.woff2
/fonts/Roboto-Bold.eot
/fonts/Roboto-Bold.otf
/fonts/Roboto-Bold.svg
/fonts/Roboto-Bold.ttf
/fonts/Roboto-Bold.woff
/fonts/Roboto-Bold.woff2
/fonts/Roboto-Medium.eot
/fonts/Roboto-Medium.otf
/fonts/Roboto-Medium.svg
/fonts/Roboto-Medium.ttf
/fonts/Roboto-Medium.woff
/fonts/Roboto-Medium.woff2
/fonts/Roboto-Regular.eot
/fonts/Roboto-Regular.otf
/fonts/Roboto-Regular.svg
/fonts/Roboto-Regular.ttf
/fonts/Roboto-Regular.woff
/fonts/Roboto-Regular.woff2
/fonts/SourceSansPro-Regular.eot
/fonts/SourceSansPro-Regular.otf
/fonts/SourceSansPro-Regular.svg
/fonts/SourceSansPro-Regular.ttf
/fonts/SourceSansPro-Regular.woff
/fonts/SourceSansPro-Regular.woff2
/fonts/fonts.min.css`;
filesToCache = filesToCache.split("\n");
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
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) { return response; }

            // IMPORTANT: Clone the request. A request is a stream and
            // can only be consumed once. Since we are consuming this
            // once by cache and once by the browser for fetch, we need
            // to clone the response.
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function(response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // IMPORTANT: Clone the response. A response is a stream
                    // and because we want the browser to consume the response
                    // as well as the cache consuming the response, we need
                    // to clone it so we have two streams.
                    var responseToCache = response.clone();

                    caches.open(cacheName)
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }
            );
        })
    );
});
