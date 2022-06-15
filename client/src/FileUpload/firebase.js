// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAjpuk2XBbeAAoFOfAGVSgfkTEI7AepP08',
  authDomain: 'doctorine-8001e.firebaseapp.com',
  projectId: 'doctorine-8001e',
  storageBucket: 'doctorine-8001e.appspot.com',
  messagingSenderId: '213941197412',
  appId: '1:213941197412:web:992b0905d66300fccbdd71',
  measurementId: 'G-C1770KP4R6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line
const analytics = getAnalytics(app);

export const storage = getStorage(app);
