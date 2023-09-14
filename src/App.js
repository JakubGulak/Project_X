import React from 'react';
import './App.css'; 
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCmEpLni3odJKcN9CrTqKaKxIu_tu4LBR8",
  authDomain: "libraryckziu.firebaseapp.com",
  projectId: "libraryckziu",
  storageBucket: "libraryckziu.appspot.com",
  messagingSenderId: "109161048917",
  appId: "1:109161048917:web:7be4751f529e97175a1ddc",
  measurementId: "G-EZLM6V2WPN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <div className="App">
      <h1>Biblioteka Szkolna CKZiU Jaworzno</h1>
    </div>
  );
}

export default App;


