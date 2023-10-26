import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import facebook from './facebook.png';
import instagram from './instagram.png';
import ckziu from './ckziu.png';
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

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

function Home() {
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
            <a href="/login" id='loga'>Zaloguj się!</a>
        </div>
      </div>
      <div id='content'></div>
    </div>
  );
}

export default Home;
