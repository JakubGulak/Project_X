// Main.js
import React, { useState, useEffect } from 'react';
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

function Main() {
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
          const title = data.Title;
          const author = data.Author;

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
    <div>
      <h1>Strona główna</h1>
      <p>Tytuł książki: {bookData.title}</p>
      <p>Autor książki: {bookData.author}</p>
    </div>
  );
}

export default Main;
