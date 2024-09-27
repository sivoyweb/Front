
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDnzL23UH5VME4BSZhG1DB5uiD7wsinu2o",
  authDomain: "sivoy-264f7.firebaseapp.com",
  projectId: "sivoy-264f7",
  storageBucket: "sivoy-264f7.appspot.com",
  messagingSenderId: "497471545294",
  appId: "1:497471545294:web:215c2371658bdb9443d59f",
  measurementId: "G-ZYWMCTKXHB"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth };
