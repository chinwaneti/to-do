
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBaIeecMdSQ1g4ySxvv3ed6tuS8RBRzFRs",
  authDomain: "task-app-27ac7.firebaseapp.com",
  projectId: "task-app-27ac7",
  storageBucket: "task-app-27ac7.appspot.com",
  messagingSenderId: "1035831094897",
  appId: "1:1035831094897:web:7ccc658669946473d7f5d0",
  measurementId: "G-TMP7HYQ659"
};

let app = null;
let analytics = null;
let auth = null;
let db = null;

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth(app);
  db = getFirestore(app);
}

export { app, analytics, auth, db };