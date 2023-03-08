let userAgent;

addEventListener('message', (event) => {
  userAgent = event.data;
});

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
  navigator.setAppBadge && navigator.setAppBadge(1);
  self.registration.showNotification('Time is up!', {
    actions: [
      {
        action: 'Back to Workout',
        title: 'Back to Workout',
      },
    ],
    icon: '/images/isometric.png',
    vibrate: [200, 100, 200],
  });
});

addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (!userAgent) {
    return;
  }

  const isChromium = /chrome/i.test(userAgent);
  const isOpera = /OPR/.test(userAgent);
  const isEdge = /Edg/.test(userAgent);
  const isFirefox = /Firefox/.test(userAgent);
  const isSafari = /OS X/.test(userAgent) && /Safari/.test(userAgent);
  const hasiPhoneInUserAgentString = /iPhone OS/.test(userAgent);
  const isMacOSSafari = isSafari && !hasiPhoneInUserAgentString;
  const isIOSSafari = isSafari && !!hasiPhoneInUserAgentString;

  if (isIOSSafari) {
    //clicking notification will focus the PWA already, so return
    return;
  }

  if (isChromium || isFirefox) {
    //clicking does nothing by default, so focus the first window with path ending in /workout
    event.waitUntil(
      clients
        .matchAll({
          type: 'window',
        })
        .then((clientList) => {
          for (const client of clientList) {
            if (client.url.endsWith('/workout') && 'focus' in client)
              return client.focus();
          }
          if (clients.openWindow) return clients.openWindow('/');
        })
    );
  }
});
