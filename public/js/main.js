
const VAPID_PUBLIC_KEY = "BG6LCkD5xsL4IuD81gEqm9NLkTftXB8y1LX5P2qbtnBaMC9150BFJqKFboKq--t7SEP8TC0p6YTy-9nuIpsG6ps";

const urlBase64ToUint8Array = base64String => {
  let padding = '='.repeat((4 - base64String.length % 4) % 4);
  let base64 = (base64String + padding)
  .replace(/\-/g, '+')
  .replace(/_/g, '/');

  let rawData = window.atob(base64);
  let outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const registerForPush = registration => {
  return new Promise((resolve, reject) => {
    let subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    };
    console.log('Registration: ', registration, 'subscribeOptions:', subscribeOptions);
    if (registration)
      return resolve(registration.pushManager.subscribe(subscribeOptions));
    else
      return reject();
  }).then(pushSubscription => {
    let json = pushSubscription.toJSON();
    console.log('Push subscription successful with pushToken:', json.endpoint, 'browserPublicKey:', json.keys.p256dh, 'browserPrivateKey:', json.keys.auth);
  }).catch(err => {
    console.error('Push subscription error: ', err);
  });
}

const sendNotification = (name, image) => {
  if (!'Notifcation' in window) {
    console.error('Notification not in window')
  } else if (Notification.permission === 'granted'){
    let options = {
      body: name
    }

    if ('image' in Notification.prototype) {
      options.image = image;
    } else {
      options.icon = image;
    }

    new Notification("I choose you!", options);
  } else {
    console.error('Notification permission denied')
  }
}