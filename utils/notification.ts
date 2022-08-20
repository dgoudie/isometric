export const requestNotificationPermission =
  (): Promise<NotificationPermission> => {
    if ('Notification' in window) {
      return Notification.requestPermission();
    }
    return Promise.resolve('denied');
  };

export const showNotification = (text: string) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(text, {
      icon: 'images/isometric.png',
    });
  }
};
