import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import facebook from './facebook.png';
import instagram from './instagram.png';
import ckziu from './ckziu.png';
import './home.css';

const firebaseConfig = {
  apiKey: "AIzaSyD9cGsHCJl5ciSZlMxLdW-oVq5w9hfc1MM",
  authDomain: "userslibraryckziu.firebaseapp.com",
  projectId: "userslibraryckziu",
  storageBucket: "userslibraryckziu.appspot.com",
  messagingSenderId: "528770481702",
  appId: "1:528770481702:web:1242274cbcfb9cdf9bb0e7",
  measurementId: "G-C543MMB5Z0"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function LoggedHome() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const getBooksFromFirebase = async () => {
    const db = firebase.firestore();
    const booksCollection = db.collection('books');

    try {
      const querySnapshot = await booksCollection.get();
      const booksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksData);
    } catch (error) {
      console.error('Błąd pobierania danych z bazy danych:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        getBooksFromFirebase();
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
      console.error("Błąd wylogowania:", error);
    }
  };

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
      <div id='content'></div>
    </div>
  );
}

export default LoggedHome
