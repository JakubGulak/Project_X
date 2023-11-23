import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import facebook from './facebook.png';
import instagram from './instagram.png';
import ckziu from './ckziu.png';
import './loggedhome.css';

const firebaseConfig = {
  apiKey: "AIzaSyCmEpLni3odJKcN9CrTqKaKxIu_tu4LBR8",
  authDomain: "libraryckziu.firebaseapp.com",
  projectId: "libraryckziu",
  storageBucket: "libraryckziu.appspot.com",
  messagingSenderId: "109161048917",
  appId: "1:109161048917:web:7be4751f529e97175a1ddc",
  measurementId: "G-EZLM6V2WPN"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function LoggedHome() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);


  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

 // ... poprzedni kod

return (
  <div id='app'>
    <div id="header">
      <div id="header-content">
        <div id='icons'>
          <a href="https://www.ckziu.jaworzno.pl/" target="_blank" rel="noopener noreferrer">
            <img src={ckziu} alt="Ckziu" id='firsticon' />
          </a>
          <a href="https://www.facebook.com/elektrownia.ckziu/?locale=pl_PL" target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="Facebook" id='secondicon' />
          </a>
          <a href="https://www.instagram.com/elektrownia_jaworzno/" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" id='thirdicon' />
          </a>
        </div>
        <h1 id='title'>Biblioteka Szkolna CKZiU w Jaworznie</h1>
        {user ? (
          <div>
            <p id='hello'>Witaj, {user.email}!</p>
            <div>
              <button onClick={handleLogout} id='handlelogout'><p id='logout'>Wyloguj się</p></button>
            </div>
          </div>
        ) : (
          <a href="/login">Zaloguj się!</a>
        )}
      </div>
    </div>
    <div id='content'>
      <h2>Dostępne książki:</h2>
    </div>
  </div>
);
}

export default LoggedHome;
