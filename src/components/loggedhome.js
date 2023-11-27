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
  apiKey: "AIzaSyBDt-Q1iOKptq2Nia6pePJWfIV5NWuM7RI",
  authDomain: "booksckziu.firebaseapp.com",
  projectId: "booksckziu",
  storageBucket: "booksckziu.appspot.com",
  messagingSenderId: "1013482357146",
  appId: "1:1013482357146:web:e24296d8281115f36f7a23",
  measurementId: "G-LW2RSNZ647"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore(); // Inicjalizujemy Firestore

function LoggedHome() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
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

  const rentBook = async (bookId) => {
    try {
      // Sprawdź dostępność książki przed próbą wypożyczenia
      const bookRef = firestore.collection('books').doc(bookId);
      const bookSnapshot = await bookRef.get();

      if (bookSnapshot.exists) {
        const bookData = bookSnapshot.data();
        if (bookData.availability) {
          // Oznacz książkę jako niedostępną po wypożyczeniu
          await bookRef.update({ availability: false });
          console.log("Książka została wypożyczona!");
        } else {
          console.log("Książka jest już wypożyczona.");
        }
      } else {
        console.log("Książka nie istnieje.");
      }
    } catch (error) {
      console.error('Błąd podczas wypożyczania książki:', error);
    }
  };

  const addBook = async () => {
    try {
      const newBook = {
        ID: 6,
        author: "Nicholas Sparks",
        title: "Pamiętnik",
        category: "Romans",
        availability: false,  // Ustaw dostępność na true lub false
      };

      // Dodaj nową książkę do bazy danych
      const docRef = await firestore.collection('books').add(newBook);

      // Pobierz ID nowo utworzonego dokumentu (jeśli potrzebujesz)
      console.log("Nowa książka została dodana z ID:", docRef.id);
    } catch (error) {
      console.error('Błąd podczas dodawania książki do bazy danych:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firestore.collection('books').get();
        const booksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBooks(booksData);
        console.log('Dane z bazy danych:', booksData);
      } catch (error) {
        console.error('Błąd podczas pobierania danych z bazy danych:', error);
      }
    };
  
    fetchData();
  }, []); 

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
        <h2>Książki w bibliotece:</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={tableHeaderStyle}>ID</th>
              <th style={tableHeaderStyle}>Autor</th>
              <th style={tableHeaderStyle}>Tytuł książki</th>
              <th style={tableHeaderStyle}>Dostępność</th>
              <th style={tableHeaderStyle}>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.ID} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={tableCellStyle}>{book.ID}</td>
                <td style={tableCellStyle}>{book.author}</td>
                <td style={tableCellStyle}>{book.title}</td>
                <td style={tableCellStyle}>{book.availability ? '✅' : '❌'}</td>
                <td style={tableCellStyle}>
                  {book.availability && (
                    <button onClick={() => rentBook(book.ID)}>Zarezerwuj!</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addBook}>Dodaj nową książkę</button>
      </div>
    </div>
  );
}

const tableHeaderStyle = {
  padding: '10px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '10px',
  textAlign: 'left',
};

export default LoggedHome;
