addEventListener('install', () => {
  self.skipWaiting();
});

//from https://stackoverflow.com/a/45206466/8340463
async function checkClientIsVisible() {
  const windowClients = await clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  });

  for (var i = 0; i < windowClients.length; i++) {
    if (windowClients[i].visibilityState === 'visible') {
      return true;
    }
  }
  return false;
}

addEventListener('push', async function (event) {
  console.log('Push message received.');

  const isWindowVisible = await checkClientIsVisible();
  if (isWindowVisible) {
    return;
  }

  event.waitUntil(
    self.registration.showNotification('Time is up!', {
      actions: [
        {
          action: 'Back to Workout',
          title: 'Back to Workout',
        },
      ],
      icon: '/images/isometric.png',
      vibrate: [200, 100, 200],
      data: {
        url: '/workout',
      },
    })
  );
});

addEventListener('notificationclick', function (event) {
  console.log('Notification clicked.');
  event.notification.close();

  let clickResponsePromise = Promise.resolve();
  if (event.notification.data && event.notification.data.url) {
    clickResponsePromise = clients.openWindow(event.notification.data.url);
  }

  event.waitUntil(clickResponsePromise);
});
