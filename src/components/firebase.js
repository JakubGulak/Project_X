// firebase.js

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCmEpLni3odJKcN9CrTqKaKxIu_tu4LBR8",
  authDomain: "libraryckziu.firebaseapp.com",
  projectId: "libraryckziu",
  storageBucket: "libraryckziu.appspot.com",
  messagingSenderId: "109161048917",
  appId: "1:109161048917:web:7be4751f529e97175a1ddc",
  measurementId: "G-EZLM6V2WPN"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
