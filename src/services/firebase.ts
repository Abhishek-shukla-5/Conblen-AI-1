// This is a placeholder Firebase configuration. In a real application,
// you would replace these with your own Firebase project credentials.
// Firebase project details would remain the same, just updating comments

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "launchmate-46028.firebaseapp.com",
  projectId: "launchmate-46028",
  storageBucket: "launchmate-46028.firebasestorage.app",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase for ConblenAI application
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db, analytics }; 