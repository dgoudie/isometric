import * as PusherPushNotifications from '@pusher/push-notifications-web';

import { getSession } from 'next-auth/react';

export let pusherBeamsClient: PusherPushNotifications.Client | null = null;

export const setupNotifications = async () => {
  let notificationPermission: NotificationPermission;
  if ('Notification' in window) {
    notificationPermission = await Notification.requestPermission();
  } else {
    notificationPermission = 'denied';
  }
  if (notificationPermission !== 'granted') {
    return;
  }
  if (!pusherBeamsClient) {
    const session = await getSession();
    const pusherBeamsTokenProvider = new PusherPushNotifications.TokenProvider({
      url: '/api/pusher/beams-auth',
    });
    pusherBeamsClient = new PusherPushNotifications.Client({
      instanceId: 'e5416d63-26ad-4b52-b046-cc6e4d348bbf',
    });
    await pusherBeamsClient.start();
    await pusherBeamsClient.setUserId(
      session!.userId,
      pusherBeamsTokenProvider
    );
  }
};

export const stop = () => {
  pusherBeamsClient?.stop();
  pusherBeamsClient = null;
};

export const showNotification = (text: string) => {
  // if ('Notification' in window && Notification.permission === 'granted') {
  //   new Notification(text, {
  //     icon: 'images/isometric.png',
  //   });
  // }
};
