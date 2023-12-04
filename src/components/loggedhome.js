import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import facebook from './facebook.png';
import instagram from './instagram.png';
import ckziu from './ckziu.png';
import './loggedhome.css';

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

const firestore = firebase.firestore();

function LoggedHome() {
  const [user, setUser] = useState(null);
  // const [userBooks, setUserBooks] = useState([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const showBookDetails = (book) => {
    setSelectedBook(book);
    // Calculate the return date (14 days from now)
    const today = new Date();
    const returnDate = new Date(today);
    returnDate.setDate(today.getDate() + 14);
    setReturnDate(returnDate);
  };

  // Function to close the book details modal or section
  const closeBookDetails = () => {
    setSelectedBook(null);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firestore.collection('books').get();
        const booksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllBooks(booksData);
        setFilteredBooks(booksData);
        console.log('Dane z bazy danych:', booksData);
      } catch (error) {
        console.error('Błąd podczas pobierania danych z bazy danych:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredBooks(
      allBooks.filter(book => 
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, allBooks]);

  useEffect(() => {
    setFilteredBooks(
      allBooks.filter(book => 
        (book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!showAvailableOnly || book.availability)
      )
    );
  }, [searchTerm, allBooks, showAvailableOnly]);
  

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // const rentBook = async (bookId) => {
  //   try {
  //     console.log('Próba rezerwacji książki o ID:', bookId);
  //     const bookRef = firestore.collection('books').doc(String(bookId));
  //     const bookSnapshot = await bookRef.get();
  
  //     if (bookSnapshot.exists) {
  //       const bookData = bookSnapshot.data();
  //       console.log('ID książki:', bookData.ID);
  //       console.log('Tytuł książki:', bookData.title);
  //       console.log('Autor książki:', bookData.author);
  //       console.log('Kategoria książki:', bookData.category);
  //       console.log('Dostępność książki:', bookData.availability);
  //     } else {
  //       console.log("Książka nie istnieje.");
  //     }
  //   } catch (error) {
  //     console.error('Błąd podczas rezerwacji książki:', error);
  //   }
  // };
  
  
  
  
  

  const handleCheckboxChange = () => {
    setShowAvailableOnly(!showAvailableOnly);
  };
  

  // const addBook = async () => {
  //   try {
  //     const newBook = {
  //       ID: 8,
  //       author: "Sofokles",
  //       title: "Król Edyp",
  //       category: "Lektura",
  //       availability: false,
  //     };

  //     const docRef = await firestore.collection('books').add(newBook);
  //     console.log("Nowa książka została dodana z ID:", docRef.id);
  //   } catch (error) {
  //     console.error('Błąd podczas dodawania książki do bazy danych:', error);
  //   }
  // };

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
        <div id='menu' style={{ display: 'flex', fontSize: 25, alignItems: 'center', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, fontWeight: 'bold' }}>
        <a href='/loggedhome'>Książki w bibliotece</a>
        <a href='/loggedhome'>Moje książki</a>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <input
              type='text'
              placeholder='Wyszukaj książki...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div style={{ marginTop: '5px' }}>
              <input
                type="checkbox"
                checked={showAvailableOnly}
                onChange={handleCheckboxChange}
              />
              <label style={{ marginLeft: '5px', fontSize: '14px' }}>Pokaż tylko dostępne książki</label>
            </div>
          </div>
        </div>
        {selectedBook && (
          <div className="book-details-modal">
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th style={{ ...tableHeaderStyle, textAlign: 'center', verticalAlign: 'middle' }}>ID</th>
                  <th style={{ ...tableHeaderStyle, textAlign: 'center', verticalAlign: 'middle' }}>Autor</th>
                  <th style={{ ...tableHeaderStyle, textAlign: 'center', verticalAlign: 'middle' }}>Tytuł książki</th>
                  <th style={{ ...tableHeaderStyle, textAlign: 'center', verticalAlign: 'middle' }}>Kategoria</th>
                  <th style={{ ...tableHeaderStyle, textAlign: 'center', verticalAlign: 'middle' }}>Data oddania</th>
                </tr>
              </thead>
              <tbody>
                <tr key={selectedBook.ID} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>{selectedBook.ID}</td>
                  <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>{selectedBook.author}</td>
                  <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>{selectedBook.title}</td>
                  <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>{selectedBook.category}</td>
                  <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>{returnDate && returnDate.toISOString().split('T')[0]}</td>
                </tr>
              </tbody>
            </table>
            {/* Add any other book details you want to display ss*/}
            <button onClick={closeBookDetails}>Zamknij</button>
          </div>
        )}
        <h2 id='tit' style={{ textAlign: 'center' }}>Książki w bibliotece:</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ ...tableHeaderStyle, textAlign: 'center', verticalAlign: 'middle' }}>ID</th>
              <th style={{ ...tableHeaderStyle, textAlign: 'center', verticalAlign: 'middle' }}>Autor</th>
              <th style={{ ...tableHeaderStyle, textAlign: 'center', verticalAlign: 'middle' }}>Tytuł książki</th>
              <th style={{ ...tableHeaderStyle, textAlign: 'center', verticalAlign: 'middle' }}>Kategoria</th>
              <th style={{ ...tableHeaderStyle, textAlign: 'center', verticalAlign: 'middle' }}>Dostępność</th>
              <th style={{ ...tableHeaderStyle, textAlign: 'center', verticalAlign: 'middle' }}>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map(book => (
              <tr key={book.ID} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>{book.ID}</td>
                <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>{book.author}</td>
                <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>{book.title}</td>
                <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>{book.category}</td>
                <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>
                  {book.availability ? '✅' : '❌'}
                </td>
                <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>
                  {book.availability && (
                    <button onClick={() => showBookDetails(book)}>Zarezerwuj!</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* <button onClick={addBook}>Dodaj nową książkę</button> */}
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
