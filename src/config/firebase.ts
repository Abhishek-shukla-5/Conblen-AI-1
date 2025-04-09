import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Detailed logging of environment variables
console.log('Checking Firebase Configuration...');
const configCheck = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

console.log('Current Firebase Configuration:', {
  ...configCheck,
  apiKey: configCheck.apiKey ? 'Present (hidden for security)' : 'Missing',
});

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Validate configuration
const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field as keyof typeof firebaseConfig]);

if (missingFields.length > 0) {
  console.error('❌ Firebase Configuration Error: Missing required fields:', missingFields);
  throw new Error(`Firebase configuration is incomplete. Missing: ${missingFields.join(', ')}`);
}

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase initialized successfully');
  console.log('Project ID:', firebaseConfig.projectId);
} catch (error) {
  console.error('❌ Error initializing Firebase:', error);
  throw error;
}

// Test authentication
const auth = getAuth(app);
console.log('✅ Firebase Auth initialized');

export { auth };
export default app; 