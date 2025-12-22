// Custom service worker with push notification support
importScripts('sw.js');

// Добавляем fetch обработчик для PWA
self.addEventListener('fetch', function(event) {
  // Простой кэширующий fetch обработчик
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Возвращаем кэшированный ответ, если он есть
        if (response) {
          return response;
        }
        // Иначе выполняем сетевой запрос
        return fetch(event.request);
      })
  );
});

self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || '/android-chrome-192x192.png',
      badge: '/android-chrome-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
      },
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener('notificationclick', function (event) {
  console.log('Notification click received.');
  event.notification.close();
  event.waitUntil(clients.openWindow('https://your-fitportal-url.com'));
});