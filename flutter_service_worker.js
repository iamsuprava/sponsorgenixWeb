'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "97102ac1ec5ebe0b489b734446992b2e",
"assets/assets/images/A1.png": "6a3257a4af1cbd7c4c45e76900d85ab8",
"assets/assets/images/A2.png": "29559e08dad9fd910a13184606292180",
"assets/assets/images/A3.png": "68564c5439815430b67d8b9619c7c93a",
"assets/assets/images/ABOUTSX.png": "6475ed6a85614306c3cfeac4cff96d54",
"assets/assets/images/bg_img_2.png": "cca69b3aebed8ce9a6dc6962bfc79e6f",
"assets/assets/images/bkg_01.png": "666a4b18e02a416b8d8075cbb25805d1",
"assets/assets/images/Cube3.png": "ce81b3c849fc4cd13b7bb09b14d34b10",
"assets/assets/images/Cube4.png": "21731de2b467db2d4e0efedd47c0434d",
"assets/assets/images/Floating_Cube_01.riv": "263985dfd34c50c5583071d0e827bb1c",
"assets/assets/images/Floating_cube_02.riv": "127556698adc93a1d71331e1fd78ec35",
"assets/assets/images/hand.png": "d7c6f40ec1244a86fb4610cd515fee55",
"assets/assets/images/home_contact.png": "5a4bbd7e6a44cb74b2495b89bda8dc4d",
"assets/assets/images/Instagram_3d.png": "7b9d60cf89ddc8f0f441d493d7a7a824",
"assets/assets/images/Instagram_3d0.png": "eb5e02b034b6d0f742283f2db4e27419",
"assets/assets/images/LinkedIn_3d.png": "cb923b28fe8a38f3b0a07d5aa531a229",
"assets/assets/images/LinkedIn_3d0.png": "81d9b70f8fc9123f926c13db42c9abb7",
"assets/assets/images/Logo.png": "22abc79770f1718fe86b2b7b87bb7f84",
"assets/assets/images/Logo0.png": "0728e7063aaf94b6099f7aaf1afc1b8b",
"assets/assets/images/Sponsorgenix%2520logo.png": "c38a0d533c812c803c10f89b9d0865f6",
"assets/assets/images/Twitter_3d.png": "cb71668ce9cd21deace26d14b9fce460",
"assets/assets/images/Twitter_3d0.png": "a912ee9f0f71d291c7380fa664577435",
"assets/assets/images/Untitled.webm": "4b4c04a6020b9a7cc66878d735ea47e2",
"assets/FontManifest.json": "dccd6505237778841c2d442025b3d162",
"assets/fonts/Gilroy-Light.ttf": "4b236c6cb4c59d66b80dde6f9c614ebd",
"assets/fonts/Gilroy-SemiBold.ttf": "a5cf732b15078843b237bd58f3ed44cd",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/NOTICES": "5b1ed4fec6e34e6006acf90d040d64db",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "5ada3c4c2aaf5beada1fd8e25ad6ad09",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "6ffb39c8cb9e8d35ebbc2e35d2c34da5",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "4fc935dad351697db8e181de23cfec50",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "028181b2c5d64984667983fc8396c1cf",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "b98cd29971da1c123a0cff349d19facf",
"/": "b98cd29971da1c123a0cff349d19facf",
"main.dart.js": "d6e319b4d8c332e1f04d26b34034425a",
"manifest.json": "256d550a375526c9e037a321576d3f40",
"version.json": "46e48386a0485f16218ece478678d504"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
