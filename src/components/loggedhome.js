import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import facebook from './images/facebook.png';
import instagram from './images/instagram.png';
import ckziu from './images/ckziu.png';
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
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [returnDate, setReturnDate] = useState(null);
  const [reservedBooks, setReservedBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);


  const handleCheckboxChange = () => {
    setShowAvailableOnly(!showAvailableOnly);
  };

  const showBookDetails = (book) => {
    setSelectedBooks((prevSelectedBooks) => [...prevSelectedBooks, book]);
    const today = new Date();
    const returnDate = new Date(today);
    returnDate.setDate(today.getDate() + 14);
    setReturnDate(returnDate);
  };

  const closeBookDetails = () => {
    setSelectedBooks([]);
  };

  const updateBookAvailability = async (bookId) => {
    try {
      const bookRef = firestore.collection('books').doc(String(bookId));
      await bookRef.update({
        availability: false,
      });
  
      console.log('Książka została zarezerwowana!');
    } catch (error) {
      console.error('Błąd podczas aktualizacji dostępności książki:', error);
    }
  };
  
  const handleReservation = (bookId) => {
    updateBookAvailability(bookId)
      .then(() => {
        // Po potwierdzeniu rezerwacji z serwera Firebase, zaktualizuj lokalny stan
        const updatedBooks = allBooks.map((book) =>
          book.id === bookId ? { ...book, availability: false } : book
        );
        setAllBooks(updatedBooks);
        setReservedBooks((prevReservedBooks) => [...prevReservedBooks, bookId]);
      })
      .catch((error) => {
        console.error('Błąd podczas obsługi rezerwacji:', error);
      });
  };

  useEffect(() => {
    if (selectedBooks.length > 0) {
      const today = new Date();
      const returnDate = new Date(today);
      returnDate.setDate(today.getDate() + 14);
      setReturnDate(returnDate);
    }
  }, [selectedBooks]);

  const cancelReservation = async (bookId) => {
    try {
      const bookRef = firestore.collection('books').doc(String(bookId));
      await bookRef.update({
        availability: true,
      });
  
      setReservedBooks((prevReservedBooks) =>
        prevReservedBooks.filter((reservedBookId) => reservedBookId !== bookId)
      );
      setSelectedBooks((prevSelectedBooks) =>
        prevSelectedBooks.filter((selectedBook) => selectedBook.id !== bookId)
      );
      console.log('Rezerwacja została anulowana. Książka jest ponownie dostępna.');
    } catch (error) {
      console.error('Błąd podczas anulowania rezerwacji:', error);
    }
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
        const booksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
      allBooks.filter(
        (book) =>
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, allBooks]);

  useEffect(() => {
    setFilteredBooks(
      allBooks.filter(
        (book) =>
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
        <div
          id='menu'
          style={{
            display: 'flex',
            fontSize: 25,
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: 20,
            marginRight: 20,
            fontWeight: 'bold',
          }}
        >
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
              <input type="checkbox" checked={showAvailableOnly} onChange={handleCheckboxChange} />
              <label style={{ marginLeft: '5px', fontSize: '14px' }}>Pokaż tylko dostępne książki</label>
            </div>
          </div>
        </div>
        {selectedBooks.length > 0 && (
          <div className="book-details-modal">
            <table
              style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}
            >
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th style={{ ...tableHeaderStyle, textAlign: 'center', verticalAlign: 'middle' }}>ID</th>
                  <th style={{ ...tableHeaderStyle, textAlign: 'center', verticalAlign: 'middle' }}>Autor</th>
                  <th style={{ ...tableHeaderStyle, textAlign: 'center', verticalAlign: 'middle' }}>Tytuł książki</th>
                  <th style={{ ...tableHeaderStyle, textAlign: 'center', verticalAlign: 'middle' }}>Kategoria</th>
                  <th style={{ ...tableHeaderStyle, textAlign: 'center', verticalAlign: 'middle' }}>Data oddania</th>
                  <th style={{ ...tableHeaderStyle, textAlign: 'center', verticalAlign: 'middle' }}>Odrezerwuj</th>
                </tr>
              </thead>
              <tbody>
                {selectedBooks.map((selectedBook) => (
                  <tr key={selectedBook.id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>{selectedBook.id}</td>
                    <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>{selectedBook.author}</td>
                    <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>{selectedBook.title}</td>
                    <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>{selectedBook.category}</td>
                    <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>
                      {returnDate && returnDate.toISOString().split('T')[0]}
                    </td>
                    <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>
                    <button
                      onClick={() => {
                        // Zmiana dostępności książki na true po kliknięciu przycisku "Odrezerwuj"
                        const bookId = selectedBook.id;
                        const bookIndex = allBooks.findIndex((book) => book.id === bookId);
                        
                        // Aktualizacja lokalnego stanu
                        const updatedBooks = [...allBooks];
                        updatedBooks[bookIndex].availability = true;
                        setAllBooks(updatedBooks);

                        // Anulowanie rezerwacji
                        cancelReservation(bookId);
                        closeBookDetails();
                      }}
                    >
                      Odrezerwuj
                    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <h2 id='tit' style={{ textAlign: 'center' }}>Książki w bibliotece:</h2>
        <table
          style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}
        >
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
            {filteredBooks.map((book) => (
              <tr key={book.ID} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>{book.ID}</td>
                <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>{book.author}</td>
                <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>{book.title}</td>
                <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>{book.category}</td>
                <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>
                  {book.availability && !reservedBooks.includes(book.id) ? '✅' : '❌'}
                </td>
                <td style={{ ...tableCellStyle, textAlign: 'center', verticalAlign: 'middle' }}>
                  {book.availability && !reservedBooks.includes(book.id) && (
                    <button
                    onClick={() => {
                      handleReservation(book.id);
                      showBookDetails(book);
                    }}
                  >
                    Zarezerwuj!
                  </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
