import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import facebook from './facebook.png';
import instagram from './instagram.png';
import ckziu from './ckziu.png';
import book from './book.png';
import './login.css';

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

function Login() {
  const [error, setError] = useState(null);

  useEffect(() => {
    const loginInput = document.getElementById("loginInput");
    const passInput = document.getElementById("passInput");
    const loginButton = document.getElementById("loginButton");

    loginButton.addEventListener("click", () => {
      const login = loginInput.value;
      const password = passInput.value;

      // Zaloguj użytkownika za pomocą Firebase Authentication
      firebase.auth().signInWithEmailAndPassword(login, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Zalogowano jako:", user.email);
        })
        .catch((error) => {
          // Ustaw błąd w stanie komponentu, aby go wyświetlić
          setError(error.message);
        });
    });
  }, []);

  return (
    <div id='loginHeader'>
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
          <a href="/home">← Powrót</a>
        </div>
      </div>
      <div id='content' className='flex-container'>
        <div id='fourthicon-container'>
          <div className='book-image-container'>
            <img src={book} alt='book' id='fourthicon' />
            <input id='loginInput'></input>
            <input id='passInput' type='password'></input>
            <button id='loginButton'>Zaloguj!</button>
            
            <div className="error-message">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
