import React, { useEffect, useState } from 'react';
import './App.css';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCmEpLni3odJKcN9CrTqKaKxIu_tu4LBR8",
  authDomain: "libraryckziu.firebaseapp.com",
  projectId: "libraryckziu",
  storageBucket: "libraryckziu.appspot.com",
  messagingSenderId: "109161048917",
  appId: "1:109161048917:web:7be4751f529e97175a1ddc",
  measurementId: "G-EZLM6V2WPN"
};

// Inicjalizacja Firebase (przesuń ten fragment poniżej konfiguracji firebaseConfig)
const app = initializeApp(firebaseConfig);

function App() {
  const [bookData, setBookData] = useState({ title: '', author: '' }); // Stan przechowujący dane o książce

  // Pobierz instancję Firestore (przesuń ten fragment poniżej inicjalizacji Firebase)
  const db = getFirestore(app);

  useEffect(() => {
    // Nazwa kolekcji i dokumentu, z którego chcesz pobrać dane
    const collectionName = 'books'; // Nazwa kolekcji
    const documentId = 'P0oCDlhRCIHxLJfv5mM9'; // ID dokumentu

    // Pobierz dokument z Firestore
    const docRef = doc(db, collectionName, documentId);

    getDoc(docRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          // Jeśli dokument istnieje, pobierz pole "tytul" i "autor" z dokumentu
          const data = docSnapshot.data();
          const title = data.tytul;
          const author = data.autor;
          
          // Ustaw dane w stanie komponentu
          setBookData({ title, author });
        } else {
          console.log('Dokument nie istnieje.');
        }
      })
      .catch((error) => {
        console.error('Błąd pobierania dokumentu:', error);
      });
  }, [db]);

  return (
    <div className="App">
      <h1>Biblioteka Szkolna CKZiU Jaworzno</h1>
      <div>
        <h2>Dane z Firestore:</h2>
        <p>Tytuł: {bookData.title}</p>
        <p>Autor: {bookData.author}</p>
      </div>
    </div>
  );
}

export default App;
