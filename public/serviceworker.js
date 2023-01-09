const CACHE_NAME = "version-1"
const urlsToCache = ["index.html", "offline.html"]

const self = this

// Install SW
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // eslint-disable-next-line
            console.log("Opened Cache1")
            return cache.addAll(urlsToCache)
        })
    )
})

// Listen for requests
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(() => {
            return fetch(event.request).catch(() =>
                caches.match("offline.html")
            )
        })
    )
})

// Activate the SW
self.addEventListener("activate", (event) => {
    const cacheWhiteList = []
    cacheWhiteList.push(CACHE_NAME)

    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhiteList.includes(cacheName)) {
                        return caches.delete(cacheName)
                    }
                })
            )
        )
    )
})

// Push notifications
self.addEventListener("notificationclick", function (event) {
    // Do something as the result of the notification click
    const promiseChain = () => {
        if (!event.action) {
            // Was a normal notification click
            console.log("Notification Click.")
            return
        }
    
        switch (event.action) {
        case "coffee-action":
            console.log("User ❤️️'s coffee.")
            break
        case "doughnut-action":
            console.log("User ❤️️'s doughnuts.")
            break
        case "gramophone-action":
            console.log("User ❤️️'s music.")
            break
        case "atom-action":
            console.log("User ❤️️'s science.")
            break
        default:
            console.log(`Unknown action clicked: '${event.action}'`)
            break
        }
    }
    event.waitUntil(promiseChain)
})
