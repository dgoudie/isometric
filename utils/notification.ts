export const unsubscribe = async () => {
  return navigator.serviceWorker.ready
    .then((reg) => reg.pushManager.getSubscription())
    .then((sub) => {
      if (sub) sub.unsubscribe();
    });
};

export const setupNotifications = async () => {
  // Check if desktop notifications are supported
  if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
    console.warn("Notifications aren't supported.");
    return;
  }

  await Notification.requestPermission();
  if (Notification.permission === 'denied') {
    console.warn('The user has blocked notifications.');
    return;
  }

  // Check if push API is supported
  if (!('PushManager' in window)) {
    console.warn("Push messaging isn't supported.");
    return;
  }
  const serviceWorkerRegistration = await navigator.serviceWorker.ready;
  let subscription =
    await serviceWorkerRegistration.pushManager.getSubscription();
  // If this is the user's first visit we need to set up
  // a subscription to push notifications
  if (!!subscription) {
    await unsubscribe();
  }
  const applicationServerKey = await fetch('/api/push/vapid_public_key').then(
    (res) => res.arrayBuffer()
  );
  subscription = await serviceWorkerRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: new Uint8Array(applicationServerKey),
  });

  const subscriptionBase64 = btoa(JSON.stringify(subscription));
  await fetch(`/api/push/subscribe`, {
    method: 'POST',
    body: subscriptionBase64,
    headers: { 'content-type': 'text/plain' },
  });
};

export const queueNotification = (timeout_in_milliseconds: number) => {
  return fetch(
    `/api/push/notification?timeout_in_milliseconds=${timeout_in_milliseconds}`,
    { method: 'POST' }
  );
};

export const cancelNotification = () => {
  return fetch('/api/push/notification', { method: 'DELETE' });
};
