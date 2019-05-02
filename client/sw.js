// V2
var cacheName = 'app-leader';
var filesToCache = [
    ".",
    "/traits",
    "fonts/fonts.min.css",
    "images/grand-canyon.jpg",
    "images/icon/icon-16.png",
    "images/icon/icon-512.png",
    "images/icon/icon-57.png",
    "images/icon/icon.ico",
    "images/icon/icon.svg",
    "images/minimal-flower-petal.jpg",
    "images/neon.jpg",
    "images/sand.jpg",
    "images/spiral-pattern.jpg",
    "images/stone.jpg",
    "images/sunlight-shadow.jpg",
    "images/tokyo-infinity.jpg",
    "images/waterfall.jpg",
    "js/jquery.min.js",
    "js/main.min.js",
    "js/sw.min.js",
    "css/main.min.css",
    "fonts/MaterialIconMod.eot",
    "fonts/MaterialIconMod.svg",
    "fonts/MaterialIconMod.ttf",
    "fonts/MaterialIconMod.woff",
    "fonts/MaterialIconMod.woff2",
    "fonts/OpenSans-Bold.eot",
    "fonts/OpenSans-Bold.svg",
    "fonts/OpenSans-Bold.ttf",
    "fonts/OpenSans-Bold.woff",
    "fonts/OpenSans-Bold.woff2",
    "fonts/OpenSans-BoldItalic.eot",
    "fonts/OpenSans-BoldItalic.svg",
    "fonts/OpenSans-BoldItalic.ttf",
    "fonts/OpenSans-BoldItalic.woff",
    "fonts/OpenSans-BoldItalic.woff2",
    "fonts/OpenSans-ExtraBold.eot",
    "fonts/OpenSans-ExtraBold.svg",
    "fonts/OpenSans-ExtraBold.ttf",
    "fonts/OpenSans-ExtraBold.woff",
    "fonts/OpenSans-ExtraBold.woff2",
    "fonts/OpenSans-ExtraBoldItalic.eot",
    "fonts/OpenSans-ExtraBoldItalic.svg",
    "fonts/OpenSans-ExtraBoldItalic.ttf",
    "fonts/OpenSans-ExtraBoldItalic.woff",
    "fonts/OpenSans-ExtraBoldItalic.woff2",
    "fonts/OpenSans-Italic.eot",
    "fonts/OpenSans-Italic.svg",
    "fonts/OpenSans-Italic.ttf",
    "fonts/OpenSans-Italic.woff",
    "fonts/OpenSans-Italic.woff2",
    "fonts/OpenSans-Light.eot",
    "fonts/OpenSans-Light.svg",
    "fonts/OpenSans-Light.ttf",
    "fonts/OpenSans-Light.woff",
    "fonts/OpenSans-Light.woff2",
    "fonts/OpenSans-LightItalic.eot",
    "fonts/OpenSans-LightItalic.svg",
    "fonts/OpenSans-LightItalic.ttf",
    "fonts/OpenSans-LightItalic.woff",
    "fonts/OpenSans-LightItalic.woff2",
    "fonts/OpenSans-Regular.eot",
    "fonts/OpenSans-Regular.svg",
    "fonts/OpenSans-Regular.ttf",
    "fonts/OpenSans-Regular.woff",
    "fonts/OpenSans-Regular.woff2",
    "fonts/OpenSans-SemiBold.eot",
    "fonts/OpenSans-SemiBold.svg",
    "fonts/OpenSans-SemiBold.ttf",
    "fonts/OpenSans-SemiBold.woff",
    "fonts/OpenSans-SemiBold.woff2",
    "fonts/OpenSans-SemiBoldItalic.eot",
    "fonts/OpenSans-SemiBoldItalic.svg",
    "fonts/OpenSans-SemiBoldItalic.ttf",
    "fonts/OpenSans-SemiBoldItalic.woff",
    "fonts/OpenSans-SemiBoldItalic.woff2",
    "fonts/Roboto-Bold.woff2",
    "fonts/Roboto-Medium.woff2",
    "fonts/Roboto-Regular.woff2",
    "fonts/SourceSansPro-Regular.woff2"
];
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName)
        .then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            return response || fetchAndCache(event.request);
        })
    );
});

function fetchAndCache(url) {
    return fetch(url)
        .then(function(response) {
            // Check if we received a valid response
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return caches.open(cacheName)
                .then(function(cache) {
                    cache.put(url, response.clone());
                    return response;
                });
        })
        .catch(function(error) {
            console.log('Request failed:', error);
            // You could return a custom offline 404 page here
        });
}
