import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

if (!getApps().length) {
  try {
    initializeApp({
      credential: cert({
        projectId: 'edutech-9df89',
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Replace single slash-n with actual newlines
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
