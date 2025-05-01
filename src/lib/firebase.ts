// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

// 토큰 발급 함수
export const requestPermissionAndGetToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'BEY2Hsv4eCXijQ4bL9J7Ax7bvJXjMZS_j8CiBlFIboIxD6bWEjB4weljTwMLLSrQuWxIXJvA0eTbo-mXa0NoeeE',
      });
      return token;
    } else {
      // console.warn('Notification permission denied');
    }
  } catch {
    // console.error('Error getting FCM token', error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onForegroundMessage = (callback: (payload: any) => void) => {
  onMessage(messaging, callback);
};
