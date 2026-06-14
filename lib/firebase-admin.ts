import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

if (!getApps().length) {
  try {
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!clientEmail || !privateKey) {
      console.error("Firebase Admin Error: Missing FIREBASE_CLIENT_EMAIL or FIREBASE_PRIVATE_KEY environment variables!");
    }

    if (privateKey) {
      // Remove surrounding quotes if Vercel added them, and fix escaped newlines
      privateKey = privateKey.replace(/^"|"$/g, '').replace(/\\n/g, '\n');
    }

    initializeApp({
      credential: cert({
        projectId: 'edutech-9df89',
        clientEmail: clientEmail,
        privateKey: privateKey,
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
